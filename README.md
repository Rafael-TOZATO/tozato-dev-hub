# TozatoCode-AI Hub

![Branch Protection](https://img.shields.io/badge/branch%20protection-active-success)

Aplicação web interativa desenvolvida para centralizar o portfólio profissional, listagem dinâmica de repositórios via GitHub API e assistente conversacional integrado.

**Aplicação ao vivo:** [tozato-dev-hub.vercel.app](https://tozato-dev-hub.vercel.app)

## Funcionalidades
- Exibição em tempo real de dados do perfil do GitHub.
- Listagem e filtragem de repositórios públicos.
- Seção consolidada de links profissionais e canais de contato.
- Interface de chat interativa para suporte e navegação guiada, com backend serverless integrado à API do Gemini.

## Tecnologias Utilizadas
- HTML5, CSS3 / Tailwind CSS
- JavaScript (ES6+)
- GitHub REST API
- Vercel (hospedagem e função serverless em `api/chat.js`)
- Google Gemini API

## Testes

O projeto possui testes unitários para a função serverless de chat (`api/chat.js`), cobrindo os principais fluxos: método inválido, ausência de chave de API, resposta bem-sucedida, erro retornado pela API e falha de rede.

Para rodar os testes localmente:
```bash
npm install
npm test
```

## Contato e Redes Profissionais

- **GitHub:** [Rafael-TOZATO](https://github.com/Rafael-TOZATO)
- **LinkedIn:** [Rafael Ornelas Tozato](https://linkedin.com/in/rafaeltozato81)
- **Medium:** [Artigos e Publicações](https://medium.com/@rafael-tozato)
- **DIO:** [Perfil Digital Innovation One](https://www.dio.me/users/rafael_tozato)
