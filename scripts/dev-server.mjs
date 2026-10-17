import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import chatHandler from '../api/chat.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const port = Number.parseInt(process.env.PORT || '3000', 10);
const host = process.env.HOST || '0.0.0.0';
const maxBodyBytes = 1024 * 1024;

const staticFiles = new Map([
  ['/', { file: 'index.html', contentType: 'text/html; charset=utf-8' }],
  ['/index.html', { file: 'index.html', contentType: 'text/html; charset=utf-8' }],
  ['/banner.jpg', { file: 'banner.jpg', contentType: 'image/jpeg' }],
  ['/tozatocode-banner-web.mp4', { file: 'tozatocode-banner-web.mp4', contentType: 'video/mp4' }],
  ['/manifest.json', { file: 'manifest.json', contentType: 'application/manifest+json' }]
]);

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

async function readJsonBody(req) {
  const chunks = [];
  let size = 0;

  for await (const chunk of req) {
    size += chunk.length;
    if (size > maxBodyBytes) {
      const error = new Error('Corpo da requisição excede 1 MB.');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  if (size === 0) return {};

  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    const error = new Error('JSON inválido.');
    error.statusCode = 400;
    throw error;
  }
}

function createServerlessResponse(res) {
  const adapter = {
    setHeader(name, value) {
      res.setHeader(name, value);
      return adapter;
    },
    status(statusCode) {
      res.statusCode = statusCode;
      return adapter;
    },
    json(body) {
      if (!res.headersSent) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
      }
      res.end(JSON.stringify(body));
      return adapter;
    },
    end() {
      res.end();
      return adapter;
    }
  };

  return adapter;
}

const server = createServer(async (req, res) => {
  const pathname = new URL(req.url || '/', 'http://localhost').pathname;

  if (pathname === '/api/chat') {
    if (req.method === 'POST') {
      try {
        req.body = await readJsonBody(req);
      } catch (error) {
        sendJson(res, error.statusCode || 400, { error: error.message });
        return;
      }
    }

    try {
      await chatHandler(req, createServerlessResponse(res));
    } catch (error) {
      console.error('Falha ao executar /api/chat:', error);
      if (!res.headersSent) {
        sendJson(res, 500, { error: 'Falha interna do servidor.' });
      } else {
        res.destroy(error);
      }
    }
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    sendJson(res, 405, { error: 'Método não permitido' });
    return;
  }

  const asset = staticFiles.get(pathname);
  if (!asset) {
    sendJson(res, 404, { error: 'Arquivo não encontrado.' });
    return;
  }

  try {
    const body = await readFile(resolve(projectRoot, asset.file));
    res.writeHead(200, {
      'Content-Type': asset.contentType,
      'Content-Length': body.length,
      'Cache-Control': 'no-store'
    });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch (error) {
    console.error('Falha ao servir arquivo estático:', error);
    sendJson(res, 500, { error: 'Falha ao carregar o arquivo.' });
  }
});

server.listen(port, host, () => {
  console.log(`Tozato Dev Hub disponível em http://localhost:${port}`);
});
