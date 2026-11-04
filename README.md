# Portfólio — Vinicius Caldas Oliveira

Portfólio profissional em português, com foco em Infraestrutura, Redes e DevOps.

Site atual: https://viniciuscaol.site

## Tecnologias e recursos

HTML sem framework, CSS responsivo e JavaScript puro. Sem dependências de npm, banco de dados ou serviços externos para renderizar o site.

- Ilustração de rede em SVG com respeito à preferência de movimento reduzido.
- Filtros de projetos e detalhes em modais acessíveis pelo teclado.
- Trajetória profissional e tecnologias.
- Contato por e-mail, GitHub e LinkedIn.
- Botão de copiar e-mail (depende de HTTPS ou localhost e da permissão do navegador).

A API de ECG usa uma captura da aplicação em execução local com a amostra sintética do próprio repositório. Os demais projetos usam ilustrações identificadas na interface. A imagem pode ser aberta em tamanho completo pelo cartão e pelos detalhes do projeto. Veja [docs/CAPTURAS.md](docs/CAPTURAS.md) para a origem e a reprodução. A seleção inclui Helpdesk e seu pipeline de entrega contínua, conversor de ECG WXML, laboratório AWS/Terraform, atendimento compartilhado e monitoramento de links. Os três primeiros têm links diretos para seus repositórios.

O laboratório Terraform tem validação estática e CI aprovados, com implantação na AWS pendente. A API de ECG apresenta seu perfil suportado e sua validação técnica; não fornece diagnóstico ou laudo automático nem possui homologação clínica.

## Executar localmente

Requer Python 3:

```bash
python3 -m http.server 8080
```

Abra http://localhost:8080. Para encerrar, use Ctrl+C.

## Executar com Docker

Requer Docker e o plugin Compose:

```bash
docker compose up -d --build
```

Abra http://localhost:8080.

```bash
docker compose logs --tail=50
docker compose down
```

O contêiner usa Nginx. HTTPS deve ser configurado na hospedagem ou no proxy reverso escolhido.

## Onde editar

| Arquivo | Conteúdo |
| --- | --- |
| `index.html` | Textos, experiências, contatos, cartões e metadados |
| `assets/styles.css` | Cores, tipografia, animação e regras para celular |
| `assets/main.js` | Detalhes dos projetos, filtros, modal e cópia do e-mail |
| `Dockerfile` | Imagem do servidor web |
| `nginx.conf` | Configuração do Nginx |
| `compose.yaml` | Execução em contêiner |

Os detalhes dos projetos estão no objeto `projects` em `assets/main.js`. Cada cartão em `index.html` usa `data-project` com a mesma chave. Ao incluir projetos, atualize também a contagem do filtro "Todos" e as categorias em `data-category`.

## Colaboração e publicação

Este é o repositório `viniciuscaol/portfolio`. Alterações devem ser feitas em branch própria e entregues por pull request para revisão antes da main.

O workflow **Portfolio CI e Pages** verifica a sintaxe do JavaScript, referências locais e âncoras do HTML. Depois prepara somente `index.html` e `assets/` em `_site/`, sem publicar arquivos de configuração ou documentação.

O deploy para GitHub Pages é opcional e está desativado por padrão. Quando o Pages estiver configurado e a variável `DEPLOY_GITHUB_PAGES` tiver o valor `true`, o merge na main dispara a publicação após a validação. PRs apenas validam. Um push direto na main também dispara esse fluxo; a exigência de PR depende da proteção de branch configurada no GitHub.

O domínio `viniciuscaol.site` foi conectado ao GitHub Pages com DNS gerenciado no Cloudflare e Enforce HTTPS ativado. O Pages e a variável de publicação foram configurados pelo proprietário; a primeira publicação foi concluída com sucesso.

Veja [docs/PUBLICACAO.md](docs/PUBLICACAO.md) para a ativação, migração do domínio e reversão de versões.

```bash
node --check assets/main.js
python3 scripts/build_site.py
```

## Verificações antes de publicar mudanças

- Abra o site no computador e no celular.
- Teste filtros, detalhes dos projetos e fechamento por Escape.
- Confira links, datas e descrição da sua contribuição em cada projeto.
- Use dados fictícios em capturas de tela.
- A sintaxe do JavaScript pode ser verificada com `node --check assets/main.js`.

## Próximas melhorias

1. Incorporar capturas dos projetos com dados fictícios.
2. Revisar e disponibilizar currículo atualizado.
3. Documentar os testes de implantação do laboratório AWS quando forem executados.
