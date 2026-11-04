# Colaboração no portfólio

- O proprietário pediu que alterações sejam entregues em pull requests para revisão antes da main.
- Trabalhe em branch própria. Não faça push direto na main nem merge da PR sem solicitação explícita do proprietário.
- Execute `node --check assets/main.js` e `python3 scripts/build_site.py` antes de abrir a PR.
- Descreva na PR as alterações, verificações realizadas e limitações.
- A publicação automática está no workflow `portfolio.yml`, condicionada à main e à variável `DEPLOY_GITHUB_PAGES=true`. Não contorne a revisão com publicação direta na hospedagem atual.
- Não altere DNS, audiência ou hospedagem sem escopo explícito para essa migração.
- Descreva projetos com base em evidências do código e informações fornecidas; diferencie laboratórios, validação estática e implantação comprovada.
- Não publique dados reais de pacientes, clientes, credenciais ou capturas internas identificáveis.
