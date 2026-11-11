const assert = require('node:assert/strict');
const { afterEach, before, test } = require('node:test');

let handler;
const originalApiKey = process.env.GEMINI_API_KEY;
const originalFetch = global.fetch;

function mockResponse() {
  const calls = { status: [], json: [], headers: [], end: 0 };
  const res = {
    status(code) {
      calls.status.push(code);
      return res;
    },
    json(body) {
      calls.json.push(body);
      return res;
    },
    setHeader(name, value) {
      calls.headers.push([name, value]);
      return res;
    },
    end() {
      calls.end += 1;
      return res;
    }
  };

  return { res, calls };
}

function last(items) {
  return items[items.length - 1];
}

before(async () => {
  ({ default: handler } = await import('./chat.mjs'));
});

afterEach(() => {
  if (originalApiKey === undefined) {
    delete process.env.GEMINI_API_KEY;
  } else {
    process.env.GEMINI_API_KEY = originalApiKey;
  }
  global.fetch = originalFetch;
});

test('responde a preflight OPTIONS com 204 e aplica CORS para origem permitida', async () => {
  const req = { method: 'OPTIONS', headers: { origin: 'https://rafael-tozato.github.io' } };
  const { res, calls } = mockResponse();

  await handler(req, res);

  assert.ok(calls.headers.includes(['Access-Control-Allow-Origin', 'https://rafael-tozato.github.io']));
  assert.ok(calls.headers.some(([name, value]) => name === 'Vary' && value === 'Origin'));
  assert.equal(last(calls.status), 204);
  assert.equal(calls.end, 1);
});

test('nao aplica Access-Control-Allow-Origin para origem nao permitida', async () => {
  const req = { method: 'OPTIONS', headers: { origin: 'https://origem-desconhecida.com' } };
  const { res, calls } = mockResponse();

  await handler(req, res);

  assert.equal(calls.headers.some(([name]) => name === 'Access-Control-Allow-Origin'), false);
  assert.equal(last(calls.status), 204);
});

test('rejeita metodos diferentes de POST com 405', async () => {
  const { res, calls } = mockResponse();

  await handler({ method: 'GET', body: {} }, res);

  assert.equal(last(calls.status), 405);
  assert.deepEqual(last(calls.json), { error: 'Método não permitido' });
});

test('nao quebra quando req.body esta ausente', async () => {
  process.env.GEMINI_API_KEY = 'chave-de-teste';
  const { res, calls } = mockResponse();

  await handler({ method: 'POST', headers: {} }, res);

  assert.equal(last(calls.status), 400);
  assert.deepEqual(last(calls.json), { error: 'Mensagem inválida ou vazia.' });
});

test('retorna 500 quando GEMINI_API_KEY nao esta configurada', async () => {
  delete process.env.GEMINI_API_KEY;
  const { res, calls } = mockResponse();

  await handler({ method: 'POST', body: { message: 'ola' } }, res);

  assert.equal(last(calls.status), 500);
  assert.deepEqual(last(calls.json), { error: 'Chave de API não configurada.' });
});

test('retorna 200 e envia a chave Gemini em header, nunca na URL', async () => {
  process.env.GEMINI_API_KEY = 'chave-de-teste';
  const { res, calls } = mockResponse();
  global.fetch = async (url, options) => {
    assert.equal(url.includes('chave-de-teste'), false);
    assert.equal(options.headers['x-goog-api-key'], 'chave-de-teste');
    return {
      ok: true,
      json: async () => ({
        candidates: [{ content: { parts: [{ text: 'Resposta da IA' }] } }]
      })
    };
  };

  await handler({ method: 'POST', body: { message: 'ola' } }, res);

  assert.equal(last(calls.status), 200);
  assert.deepEqual(last(calls.json), { reply: 'Resposta da IA' });
});

test('nao expoe detalhes internos quando a API externa retorna falha', async () => {
  process.env.GEMINI_API_KEY = 'chave-de-teste';
  const { res, calls } = mockResponse();
  global.fetch = async () => ({
    ok: false,
    status: 400,
    json: async () => ({ error: { message: 'detalhe interno sensivel' } })
  });

  await handler({ method: 'POST', body: { message: 'ola' } }, res);

  assert.equal(last(calls.status), 502);
  assert.deepEqual(last(calls.json), {
    error: 'Não foi possível concluir a consulta à API de IA.'
  });
  assert.equal(JSON.stringify(calls.json).includes('detalhe interno sensivel'), false);
});

test('retorna 503 quando a API externa limita requisicoes', async () => {
  process.env.GEMINI_API_KEY = 'chave-de-teste';
  const { res, calls } = mockResponse();
  global.fetch = async () => ({ ok: false, status: 429, json: async () => ({}) });

  await handler({ method: 'POST', body: { message: 'ola' } }, res);

  assert.equal(last(calls.status), 503);
});

test('retorna 502 quando o fetch falha por erro de rede', async () => {
  process.env.GEMINI_API_KEY = 'chave-de-teste';
  const { res, calls } = mockResponse();
  global.fetch = async () => {
    throw new Error('Falha de conexao');
  };

  await handler({ method: 'POST', body: { message: 'ola' } }, res);

  assert.equal(last(calls.status), 502);
  assert.deepEqual(last(calls.json), { error: 'Falha ao comunicar com o serviço de IA.' });
});

test('retorna 400 quando a mensagem esta ausente ou vazia', async () => {
  process.env.GEMINI_API_KEY = 'chave-de-teste';
  const { res, calls } = mockResponse();

  await handler({ method: 'POST', body: { message: '  ' } }, res);

  assert.equal(last(calls.status), 400);
  assert.deepEqual(last(calls.json), { error: 'Mensagem inválida ou vazia.' });
});

test('retorna 413 e nao chama a API para mensagens acima de 8000 caracteres', async () => {
  process.env.GEMINI_API_KEY = 'chave-de-teste';
  const { res, calls } = mockResponse();
  global.fetch = async () => {
    throw new Error('A API externa nao deveria ser chamada');
  };

  await handler({ method: 'POST', body: { message: 'a'.repeat(8001) } }, res);

  assert.equal(last(calls.status), 413);
  assert.deepEqual(last(calls.json), {
    error: 'Mensagem excede o limite de 8000 caracteres.'
  });
});

test('retorna 500 quando a resposta da IA vem sem candidates', async () => {
  process.env.GEMINI_API_KEY = 'chave-de-teste';
  const { res, calls } = mockResponse();
  global.fetch = async () => ({
    ok: true,
    json: async () => ({ promptFeedback: { blockReason: 'SAFETY' } })
  });

  await handler({ method: 'POST', body: { message: 'ola' } }, res);

  assert.equal(last(calls.status), 500);
  assert.deepEqual(last(calls.json), {
    error: 'Resposta da IA vazia ou bloqueada pelo filtro de segurança.'
  });
});

test('retorna 504 quando a chamada excede o tempo limite', async () => {
  process.env.GEMINI_API_KEY = 'chave-de-teste';
  const { res, calls } = mockResponse();
  global.fetch = async () => {
    const error = new Error('The operation was aborted');
    error.name = 'AbortError';
    throw error;
  };

  await handler({ method: 'POST', body: { message: 'ola' } }, res);

  assert.equal(last(calls.status), 504);
  assert.deepEqual(last(calls.json), {
    error: 'Tempo limite excedido ao consultar a API.'
  });
});
