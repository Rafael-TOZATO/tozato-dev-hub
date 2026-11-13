<p align="center">
  <img src="./banner.jpg" alt="Banner do TozatoCode-AI Hub" width="100%">
</p>

<h1 align="center">TozatoCode-AI Hub</h1>
<p align="center">
  <a href="https://github.com/Rafael-TOZATO/tozato-dev-hub/actions/workflows/quality-gate.yml"><img src="https://github.com/Rafael-TOZATO/tozato-dev-hub/actions/workflows/quality-gate.yml/badge.svg" alt="Quality Gate"></a>
  <a href="https://github.com/Rafael-TOZATO/tozato-dev-hub/actions/workflows/codeql.yml"><img src="https://github.com/Rafael-TOZATO/tozato-dev-hub/actions/workflows/codeql.yml/badge.svg" alt="CodeQL"></a>
  <a href="https://github.com/Rafael-TOZATO/tozato-dev-hub/commits/main"><img src="https://img.shields.io/github/last-commit/Rafael-TOZATO/tozato-dev-hub?style=for-the-badge" alt="Último commit"></a>
  <a href="https://github.com/Rafael-TOZATO/tozato-dev-hub/stargazers"><img src="https://img.shields.io/github/stars/Rafael-TOZATO/tozato-dev-hub?style=for-the-badge" alt="Estrelas"></a>
  <a href="https://github.com/Rafael-TOZATO/tozato-dev-hub/network/members"><img src="https://img.shields.io/github/forks/Rafael-TOZATO/tozato-dev-hub?style=for-the-badge" alt="Forks"></a>
  <a href="https://github.com/Rafael-TOZATO/tozato-dev-hub/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Rafael-TOZATO/tozato-dev-hub?style=for-the-badge" alt="Licença"></a>
</p>

---

---

## Sobre o Projeto

O **TozatoCode-AI Hub** é uma aplicação web interativa que reúne o portfólio profissional, apresenta dados e repositórios públicos do GitHub e oferece um assistente conversacional integrado à API do Google Gemini. O projeto combina engenharia de software e inteligência artificial sob a identidade da **TozatoCode-AI**.

---

---

## Como Executar o Projeto Localmente

Requer Node.js 20 ou superior.

1. Instale as dependências:

   ```bash
   npm ci
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

---

---

---

## 🤝 Contribuição e Governança

Contribuições e relatos de bugs são bem-vindos para o aprimoramento contínuo da plataforma.

* **Reportar Bugs:** Abra uma [Issue de Bug](https://github.com/Rafael-TOZATO/tozato-dev-hub/issues/new?template=bug_report.md) detalhando o comportamento esperado, logs e ambiente de execução.
* **Sugestões de Features:** Abra uma [Issue de Melhoria](https://github.com/Rafael-TOZATO/tozato-dev-hub/issues/new?template=feature_request.md).
* **Pull Requests:** Antes de enviar um PR, certifique-se de vincular a uma issue existente para validação do Quality Gate.

Para mais detalhes sobre os padrões de commits e arquitetura, consulte o nosso [Guia de Contribuição](./CONTRIBUTING.md).

---

---

---

## Contribuição e Suporte

Encontrou algum erro ou tem sugestões de melhoria? Utilize nossos templates oficiais de governança:

* 🐛 [Relatar um Bug](.github/ISSUE_TEMPLATE/bug_report.md)

---

---

---

## Governança 4.0 — Segurança e Qualidade

Este repositório adota controles automatizados de Governança 4.0 para assegurar integridade dos artefatos e do código, rastreabilidade das alterações, gestão de dependências e prevenção de exposição de credenciais. Os controles são aplicados conforme a natureza técnica e os componentes efetivamente mantidos no projeto.

- **Quality Gate:** validação automatizada do escopo do repositório, incluindo verificações de integridade, testes, análise estática, tipagem ou build quando aplicáveis.
- **Segurança de segredos:** varredura do histórico Git com Gitleaks Action v3.0.0.
- **SAST:** análise com GitHub CodeQL para linguagens suportadas e presentes no código-fonte.
- **Dependências:** monitoramento automatizado e revisão de vulnerabilidades conforme os manifests e lockfiles existentes.
- **Menor privilégio:** permissões mínimas nos workflows e checkout sem persistência desnecessária de credenciais.
- **Rastreabilidade:** commits, execuções e resultados dos controles permanecem registrados no GitHub Actions.

### Controles específicos do repositório

- **Testes automatizados:** 13 cenários executados pelo test runner nativo do Node.js, sem dependência de frameworks externos.
- **Verificação estática:** validação de sintaxe dos módulos da API, servidor local e testes por meio de `node --check`.
- **Dependências:** remoção do Jest e de sua árvore transitiva de pacotes. O projeto não mantém dependências npm de terceiros; o lockfile foi simplificado e permanece versionado.
- **Quality Gate:** workflow executado em push e pull request para a branch `main`, com instalação reproduzível, verificação de sintaxe, testes e auditoria npm.
- **SAST:** workflow CodeQL com consultas `security-extended`, acionado em push, pull request e execução semanal.
- **Proteção da API:** chave Gemini enviada em cabeçalho, limite de 8.000 caracteres, respostas de erro sem detalhes internos e cabeçalhos de segurança.
- **Servidor local:** vinculação padrão a `127.0.0.1` e cabeçalhos contra MIME sniffing, framing e exposição desnecessária de referenciador.
O projeto aplica controles de governança de software para assegurar rastreabilidade, integridade da cadeia de suprimentos e redução de riscos operacionais.
- **Quality Gate:** instalação reproduzível, verificação de sintaxe, testes automatizados e auditoria de dependências.
- **SAST:** análise estática de JavaScript e TypeScript com GitHub CodeQL e consultas de segurança estendida.
- **Segurança de segredos:** varredura do histórico Git com Gitleaks Action v3.0.0.
- **Proteção de credenciais:** chave de API mantida em variável de ambiente e permissões mínimas nos workflows.
- **Rastreabilidade:** resultados e histórico das execuções são mantidos no GitHub Actions.

---

---

## 📬 CONTATOS E PERFIS

- **App Ecosystem:** [tozato-ai-core.vercel.app](https://tozato-ai-core.vercel.app)
- **H-Folio:** [h-folio-l0.vercel.app](https://h-folio-l0.vercel.app)

---
- **GitHub:** [github.com/Rafael-TOZATO](https://github.com/Rafael-TOZATO)

- **Medium:** [medium.com/@ornelas.tozato](https://medium.com/@ornelas.tozato)

- **E-mail:** ornelas.tozato@gmail.com
- **LinkedIn:** [rafaeltozato81](https://www.linkedin.com/in/rafaeltozato81)
- **GitHub:** [Rafael-TOZATO](https://github.com/Rafael-TOZATO)
- **Medium:** [@ornelas.tozato](https://medium.com/@ornelas.tozato)
- **Dev Hub:** [tozato-ai-core.vercel.app](https://tozato-ai-core.vercel.app)
- **Microsoft Learn:** [rafaelornelastozato-2209](https://learn.microsoft.com/pt-br/users/rafaelornelastozato-2209)
