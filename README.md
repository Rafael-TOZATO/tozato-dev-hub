<p align="center">
  <img src="./banner.jpg" alt="Banner do TozatoCode-AI Hub" width="100%">
</p>

<h1 align="center">TozatoCode-AI Hub</h1>

<p align="center">
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&amp;logo=node.js&amp;logoColor=white" alt="Node.js 18+">
  </a>
  <a href="https://jestjs.io/">
    <img src="https://img.shields.io/badge/Jest-29.7.0-C21325?style=for-the-badge&amp;logo=jest&amp;logoColor=white" alt="Jest 29.7.0">
  </a>
  <a href="https://tozato-dev-hub.vercel.app/">
    <img src="https://img.shields.io/badge/Vercel-live-000000?style=for-the-badge&amp;logo=vercel&amp;logoColor=white" alt="Hospedado na Vercel">
  </a>
  <a href="https://github.com/Rafael-TOZATO/tozato-dev-hub/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/Rafael-TOZATO/tozato-dev-hub?style=for-the-badge" alt="Licença">
  </a>
  <a href="https://codeql.github.com/">
    <img src="https://img.shields.io/badge/CodeQL-security%20analysis-0F80C1?style=for-the-badge&amp;logo=github&amp;logoColor=white" alt="CodeQL — análise de segurança">
  </a>
  <a href="https://github.com/Rafael-TOZATO/tozato-dev-hub/commits/main/">
    <img src="https://img.shields.io/badge/Maintained-Yes-2ea44f?style=for-the-badge" alt="Projeto mantido">
  </a>
</p>

## Sobre o Projeto

O **TozatoCode-AI Hub** é uma aplicação web interativa que reúne o portfólio profissional, apresenta dados e repositórios públicos do GitHub e oferece um assistente conversacional integrado à API do Google Gemini. O projeto combina engenharia de software e inteligência artificial sob a identidade da **TozatoCode-AI**.

## Validações e Melhorias Recentes

- **Suíte automatizada:** 11 testes com Jest, executados com suporte a módulos ESM. Cobrem CORS, métodos inválidos, mensagem ausente ou vazia, ausência da chave de API, respostas bem-sucedidas, erros da API, bloqueio de segurança e timeout.
- **Smoke tests locais:** a página e os assets foram servidos com HTTP 200; `/api/chat` respondeu 204 ao preflight e 405 a uma requisição GET, conforme esperado.
- **Homologação da integração:** uma chamada de teste à API publicada respondeu HTTP 200.
- **Servidor local:** `npm start` serve a página e encaminha as requisições de `/api/chat` ao handler local. A porta padrão é `3000` e pode ser alterada pela variável `PORT`.
- **CodeQL:** o selo identifica a ferramenta; não indica que a análise automática esteja ativa. O repositório ainda não tem um workflow CodeQL configurado.

## Como Executar o Projeto Localmente

Requer Node.js 18 ou superior.

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie a aplicação:

   ```bash
   npm start
   ```

   Por padrão, o servidor fica disponível em `http://localhost:3000`. Para testar o chat com o Gemini, configure `GEMINI_API_KEY` no ambiente antes de iniciar a aplicação.

3. Em outro terminal, execute os testes:

   ```bash
   npm test
   ```

## Contatos e Conexões

- **LinkedIn:** [rafaeltozato81](https://www.linkedin.com/in/rafaeltozato81)
- **GitHub:** [Rafael-TOZATO](https://github.com/Rafael-TOZATO)
- **Repositório do projeto:** [tozato-dev-hub](https://github.com/Rafael-TOZATO/tozato-dev-hub)
- **Medium:** [@ornelas.tozato](https://medium.com/@ornelas.tozato)
- **Microsoft Learn:** [Transcript](https://learn.microsoft.com/pt-br/users/rafaelornelastozato-2209/transcript/dzo2wizrzkx2853)
- **Portfólio PWA — Tozato Dev Hub:** [tozato-dev-hub.vercel.app](https://tozato-dev-hub.vercel.app)
- **H-Folio:** [h-folio-psi.vercel.app](https://h-folio-psi.vercel.app)
- **Aurora BI (Lovable):** [aurora-bi-dio.lovable.app](https://aurora-bi-dio.lovable.app)
