<p align="center">
  <img src="https://img.shields.io/badge/Status-Ativo-success?style=for-the-badge&logo=git" alt="Status">
  <img src="https://img.shields.io/badge/Branch%20Protection-Active-success?style=for-the-badge&logo=github" alt="Branch Protection">
  <img src="https://img.shields.io/badge/HTML5%2FCSS3-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5/CSS3">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Gemini%20API-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Gemini API">
</p>

<p align="center">
  <a href="https://github.com/Rafael-TOZATO/tozato-dev-hub"><img src="https://img.shields.io/badge/Reposit%C3%B3rio-181717?style=for-the-badge&logo=github&logoColor=white" alt="Repositório"></a>
  <a href="https://www.linkedin.com/in/rafaeltozato81"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://medium.com/@ornelas.tozato"><img src="https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white" alt="Medium"></a>
  <a href="https://learn.microsoft.com/pt-br/users/rafaelornelastozato-2209/transcript/dzo2wizrzkx2853"><img src="https://img.shields.io/badge/Microsoft%20Learn-0078D4?style=for-the-badge&logo=microsoft&logoColor=white" alt="Microsoft Learn"></a>
</p>

<p align="center">
  <img src="banner.jpg" alt="TozatoCode-AI Banner" width="100%">
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

- **Exibição em tempo real** de dados do perfil do GitHub.
- **Listagem e filtragem** de repositórios públicos.
- **Seção consolidada** de links profissionais e canais de contato.
- **Interface de chat interativa** para suporte e navegação guiada, com backend serverless integrado à API do Gemini.

---

## Tecnologias Utilizadas

- HTML5, CSS3 / Tailwind CSS
- JavaScript (ES6+)
- GitHub REST API
- Vercel (hospedagem e função serverless)
- Google Gemini API

---

## Execução local

Requer Node.js 18 ou superior.

```bash
npm ci
npm start
```

O servidor local fica disponível em `http://localhost:3000` por padrão e aceita uma porta diferente pela variável `PORT`. Ele serve a página estática e encaminha `/api/chat` para a função serverless local. Para testar chamadas reais ao Gemini, configure `GEMINI_API_KEY` no ambiente antes de iniciar o servidor.

## Testes

Execute `npm test` para rodar os testes unitários da função serverless de chat (`api/chat.mjs`). A suíte cobre CORS, métodos inválidos, ausência de configuração, validação da mensagem, respostas bem-sucedidas, erros da API e timeout.

---

## 📬 Contatos

- 💼 **LinkedIn:** [rafaeltozato81](https://www.linkedin.com/in/rafaeltozato81)
- 🐙 **GitHub:** [Rafael-TOZATO](https://github.com/Rafael-TOZATO)
- ✍️ **Medium:** [@ornelas.tozato](https://medium.com/@ornelas.tozato)
- 🌐 **Portfólio PWA (Dev Hub):** [tozato-dev-hub.vercel.app](https://tozato-dev-hub.vercel.app)
- 🌐 **H-Folio:** [h-folio-psi.vercel.app](https://h-folio-psi.vercel.app)
- 🚀 **Aurora BI (Lovable):** [aurora-bi-dio.lovable.app](https://aurora-bi-dio.lovable.app)
- 📜 **Microsoft Learn:** [Transcript](https://learn.microsoft.com/pt-br/users/rafaelornelastozato-2209/transcript/dzo2wizrzkx2853)
