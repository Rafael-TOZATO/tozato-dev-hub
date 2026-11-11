const MAX_MESSAGE_LENGTH = 8000;

const ALLOWED_ORIGINS = [
  'https://tozato-dev-hub.vercel.app',
  'https://tozato-dev-hub-app.vercel.app',
  'https://rafael-tozato.github.io'
];

function applyCors(req, res) {
  const origin = req.headers && req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { message } = req.body || {};

  if (typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({ error: 'Mensagem inválida ou vazia.' });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(413).json({ error: 'Mensagem excede o limite de 8000 caracteres.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Chave de API não configurada.' });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: message.trim() }] }]
      }),
      signal: controller.signal
    });

    let data;
    try {
      data = await response.json();
    } catch {
      return res.status(502).json({ error: 'A API de IA retornou uma resposta inválida.' });
    }

    if (!response.ok) {
      return res.status(response.status === 429 ? 503 : 502).json({
        error: 'Não foi possível concluir a consulta à API de IA.'
      });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return res.status(500).json({ error: 'Resposta da IA vazia ou bloqueada pelo filtro de segurança.' });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    if (error.name === 'AbortError') {
      return res.status(504).json({ error: 'Tempo limite excedido ao consultar a API.' });
    }
    return res.status(502).json({ error: 'Falha ao comunicar com o serviço de IA.' });
  } finally {
    clearTimeout(timeout);
  }
}
