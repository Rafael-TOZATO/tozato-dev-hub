const handler = require('./chat');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('api/chat handler', () => {
  const originalApiKey = process.env.GEMINI_API_KEY;

  afterEach(() => {
    process.env.GEMINI_API_KEY = originalApiKey;
    jest.restoreAllMocks();
  });

  test('rejeita metodos diferentes de POST com 405', async () => {
    const req = { method: 'GET', body: {} };
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: 'Método não permitido' });
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
});
