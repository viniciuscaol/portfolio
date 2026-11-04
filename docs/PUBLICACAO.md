# Revisão por PR e publicação

## Fluxo de trabalho

1. Criar uma branch a partir da main atualizada.
2. Alterar o código e executar as verificações locais.
3. Abrir uma PR para main e revisar o check `Validar e preparar site`.
4. Fazer o merge depois da revisão do proprietário.
5. Se o GitHub Pages estiver habilitado conforme abaixo, o push gerado pelo merge publicará o site automaticamente.

Uma PR não publica em produção. O workflow atual não configura regras de proteção de branch; para exigir revisão e check aprovado, configure uma ruleset/proteção da main no GitHub. Sem essa regra, um push direto na main também pode publicar quando o Pages estiver habilitado.

## Situação inicial

O domínio `viniciuscaol.site` utiliza a hospedagem existente. O repositório não tinha GitHub Pages habilitado quando esta configuração foi preparada.

A variável `DEPLOY_GITHUB_PAGES` precisa ser exatamente `true` para ativar a publicação. Sem ela, o workflow apenas verifica o JavaScript, confere arquivos locais/âncoras e prepara `_site/`. O job de publicação aparece como ignorado; isso é esperado.

A PR não troca registros DNS, não adiciona domínio personalizado ao Pages e não altera a versão já publicada na hospedagem existente.

## Ativação opcional do GitHub Pages

Faça uma única vez se escolher hospedar pelo GitHub:

1. No repositório, abra **Settings → Pages**.
2. Em **Build and deployment**, selecione **GitHub Actions** como Source.
3. Abra **Settings → Secrets and variables → Actions → Variables**.
4. Crie uma variável de repositório, não um secret:
   - Nome: `DEPLOY_GITHUB_PAGES`
   - Valor: `true`
5. Depois de a PR ser mesclada, execute manualmente o workflow **Portfolio CI e Pages** na branch `main`, ou envie a próxima alteração aprovada por PR.
6. Abra a URL retornada pelo passo de deploy e valide o conteúdo antes de migrar o domínio.

Não é necessário criar PAT, chave SSH, token de cloud ou secret para esse workflow. O GitHub fornece o token temporário e a identidade OIDC do job. Se a conta aplicar restrições às Actions ou ao ambiente `github-pages`, ajuste essas regras conforme sua política.

## Domínio personalizado

A publicação no Pages e a troca de DNS são etapas diferentes. Primeiro confirme que a nova URL funciona. Depois configure `viniciuscaol.site` em **Settings → Pages → Custom domain** e ajuste os registros DNS conforme a documentação oficial do GitHub Pages. Preserve o serviço atual até a nova configuração e o HTTPS estarem prontos.

Este workflow publica somente `index.html` e `assets/`. Se futuramente precisar incluir CNAME, currículo, screenshots ou outros arquivos públicos, atualize explicitamente `scripts/build_site.py`; arquivos da raiz não são publicados automaticamente.

## Verificações locais

```bash
node --check assets/main.js
python3 scripts/build_site.py
python3 -m http.server 8080 --directory _site
```

Abra http://localhost:8080. A verificação automática de referências não substitui a revisão visual nem testa o funcionamento de serviços externos.

## Reverter uma versão

Faça uma PR que reverta o commit problemático. Com o Pages habilitado, o merge da reversão publicará os arquivos resultantes. Para pausar futuros deploys automáticos, defina `DEPLOY_GITHUB_PAGES=false`; isso não remove a versão já publicada.

## Referências

- [Workflow de publicação Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Domínio personalizado](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
