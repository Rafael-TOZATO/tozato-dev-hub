# Guia de Contribuição e Governança

Este documento define o fluxo mínimo para alterações rastreáveis e verificáveis no Tozato Dev Hub.

## Reporte de problemas

1. Consulte as issues existentes antes de abrir uma nova.
2. Utilize os modelos em `.github/ISSUE_TEMPLATE/`.
3. Descreva o comportamento observado, o comportamento esperado e os passos de reprodução.
4. Remova tokens, chaves, dados pessoais e outros segredos de logs e capturas de tela.

## Branches e commits

Crie uma branch específica para cada alteração:

```bash
git checkout -b fix/descricao-curta
# ou
git checkout -b feat/descricao-curta
```

Utilize Conventional Commits:

- `feat(scope):` nova funcionalidade.
- `fix(scope):` correção de defeito ou segurança.
- `refactor(scope):` alteração estrutural sem mudança funcional pretendida.
- `test(scope):` inclusão ou ajuste de testes.
- `docs(scope):` documentação.
- `chore(scope):` manutenção e dependências.
- `ci(scope):` automação e pipelines.

## Validação obrigatória

Antes de abrir um pull request, execute:

```bash
npm ci
npm run check
npm test
npm audit --audit-level=high
```

O Quality Gate e a análise CodeQL são executados pelo GitHub Actions em alterações direcionadas à branch `main`. Corrija falhas antes da integração.

## Segurança

- Nunca inclua chaves de API, tokens ou credenciais no código, nos commits ou nos logs.
- Armazene segredos em variáveis de ambiente e nos mecanismos de secrets da plataforma de hospedagem.
- Valide entradas no servidor e evite retornar mensagens internas de serviços externos.
- Mantenha dependências e runtimes dentro de versões suportadas.

## Pull requests

Descreva o objetivo, os arquivos afetados, os riscos e as validações executadas. Vincule a issue correspondente quando aplicável. Preserve a arquitetura e a lógica funcional existentes, evitando alterações não relacionadas ao escopo.
