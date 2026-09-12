const handler = require('./chat');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.setHeader = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  return res;
}

describe('api/chat handler', () => {
  const originalApiKey = process.env.GEMINI_API_KEY;

  afterEach(() => {
    process.env.GEMINI_API_KEY = originalApiKey;
    jest.restoreAllMocks();
  });

  test('responde a preflight OPTIONS com 204 e aplica CORS para origem permitida', async () => {
    const req = { method: 'OPTIONS', headers: { origin: 'https://rafael-tozato.github.io' } };
    const res = mockRes();

    await handler(req, res);

    expect(res.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', 'https://rafael-tozato.github.io');
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.end).toHaveBeenCalled();
  });

  test('nao aplica Access-Control-Allow-Origin para origem nao permitida', async () => {
    const req = { method: 'OPTIONS', headers: { origin: 'https://origem-desconhecida.com' } };
    const res = mockRes();

    await handler(req, res);

    expect(res.setHeader).not.toHaveBeenCalledWith('Access-Control-Allow-Origin', 'https://origem-desconhecida.com');
    expect(res.status).toHaveBeenCalledWith(204);
  });

  test('rejeita metodos diferentes de POST com 405', async () => {
    const req = { method: 'GET', body: {} };
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: 'Método não permitido' });
  });

  test('nao quebra quando req.body esta ausente', async () => {
    process.env.GEMINI_API_KEY = 'chave-de-teste';
    const req = { method: 'POST', headers: {} };
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Mensagem inválida ou vazia.' });
  });

  test('retorna 500 quando GEMINI_API_KEY nao esta configurada', async () => {
    delete process.env.GEMINI_API_KEY;
    const req = { method: 'POST', body: { message: 'ola' } };
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Chave de API não configurada.' });
  });

  test('retorna 200 com a resposta da IA quando a chamada tem sucesso', async () => {
    process.env.GEMINI_API_KEY = 'chave-de-teste';
    const req = { method: 'POST', body: { message: 'ola' } };
    const res = mockRes();

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        candidates: [{ content: { parts: [{ text: 'Resposta da IA' }] } }]
      })
    });

    await handler(req, res);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ reply: 'Resposta da IA' });
  });

  test('retorna 500 com a mensagem de erro quando a API responde com falha', async () => {
    process.env.GEMINI_API_KEY = 'chave-de-teste';
    const req = { method: 'POST', body: { message: 'ola' } };
    const res = mockRes();

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: { message: 'Limite de requisicoes excedido' } })
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Limite de requisicoes excedido' });
  });

  test('retorna 500 quando o fetch falha por erro de rede', async () => {
    process.env.GEMINI_API_KEY = 'chave-de-teste';
    const req = { method: 'POST', body: { message: 'ola' } };
    const res = mockRes();

    global.fetch = jest.fn().mockRejectedValue(new Error('Falha de conexao'));

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Falha de conexao' });
  });

  test('retorna 400 quando a mensagem esta ausente ou vazia', async () => {
    process.env.GEMINI_API_KEY = 'chave-de-teste';
    const req = { method: 'POST', body: { message: '' } };
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Mensagem inválida ou vazia.' });
  });

  test('retorna 500 quando a resposta da IA vem sem candidates (bloqueio de seguranca)', async () => {
    process.env.GEMINI_API_KEY = 'chave-de-teste';
    const req = { method: 'POST', body: { message: 'ola' } };
    const res = mockRes();

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ promptFeedback: { blockReason: 'SAFETY' } })
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Resposta da IA vazia ou bloqueada pelo filtro de segurança.' });
  });

  test('retorna 504 quando a chamada excede o tempo limite', async () => {
    process.env.GEMINI_API_KEY = 'chave-de-teste';
    const req = { method: 'POST', body: { message: 'ola' } };
    const res = mockRes();

    global.fetch = jest.fn().mockImplementation(() => {
      const err = new Error('The operation was aborted');
      err.name = 'AbortError';
      return Promise.reject(err);
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(504);
    expect(res.json).toHaveBeenCalledWith({ error: 'Tempo limite excedido ao consultar a API.' });
  });
});
