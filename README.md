<p align="center">
  <img src="https://img.shields.io/badge/Status-Ativo-success?style=for-the-badge&logo=git" alt="Status">
  <img src="https://img.shields.io/badge/Branch%20Protection-Active-success?style=for-the-badge&logo=github" alt="Branch Protection">
  <img src="https://img.shields.io/badge/HTML5%2FCSS3-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5/CSS3">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Gemini%20API-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Gemini API">
</p>

<p align="center">
  <img src="banner.gif" alt="TozatoCode-AI Banner" width="100%">
</p>

# TozatoCode-AI Hub

> **Autor:** Rafael Ornelas Tozato  
> **Aplicação ao Vivo:** [tozato-dev-hub.vercel.app](https://tozato-dev-hub.vercel.app)  
> **Governança Técnica:** Branch protection ativa  

---

## Sobre o Projeto

Aplicação web interativa desenvolvida para centralizar o portfólio profissional, listagem dinâmica de repositórios via GitHub API e assistente conversacional integrado. O hub une inteligência artificial e engenharia de software sob a identidade visual da **TozatoCode-AI** (*Transforme ideias em impacto*).

---

## Funcionalidades

* **Exibição em tempo real** de dados do perfil do GitHub.
* **Listagem e filtragem** de repositórios públicos.
* **Seção consolidada** de links profissionais e canais de contato.
* **Interface de chat interativa** para suporte e navegação guiada, com backend serverless integrado à API do Gemini.

---

## Tecnologias Utilizadas

* HTML5, CSS3 / Tailwind CSS
* JavaScript (ES6+)
* GitHub REST API
* Vercel (hospedagem e função serverless em `api/chat.js`)
* Google Gemini API

---

## Testes

O projeto possui testes unitários para a função serverless de chat (`api/chat.js`), cobrindo os principais fluxos: método inválido, ausência de chave de API, respostas e tratamento de erros.

Para rodar os testes localmente:
```bash
npm install
npm test
