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

As imagens dos projetos são ilustrações, identificadas na interface. O conteúdo representa a primeira versão publicada: Helpdesk, pipeline, atendimento e monitoramento. A seleção discutida posteriormente, incluindo Terraform e o novo conversor de ECG, ainda precisa ser incorporada.

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

## Colocar no seu GitHub

Crie um repositório vazio chamado `portfolio-viniciuscaol`, sem README inicial. Na pasta extraída:

```bash
git init
git branch -M main
git add .
git commit -m "Adiciona portfolio profissional"
git remote add origin https://github.com/viniciuscaol/portfolio-viniciuscaol.git
git push -u origin main
```

Use a autenticação do GitHub já configurada na sua máquina. Se já existir um repositório com esse nome, escolha outro nome e ajuste a URL. Não substitua outro projeto sem conferir seu conteúdo.

## Hospedagem

O site pode ser servido em qualquer hospedagem estática, GitHub Pages, Nginx ou infraestrutura Docker. Para GitHub Pages, use a publicação a partir da branch `main` e da pasta raiz. Os caminhos dos assets são relativos, permitindo uso em subdiretórios.

Documentação: https://docs.github.com/pages

Enviar o código para o GitHub não altera a hospedagem atual. O domínio continua apontando para o site já publicado. Para migrar a hospedagem, primeiro valide a nova URL e só então ajuste o domínio e seus registros DNS conforme o novo provedor. Este pacote não contém um arquivo CNAME nem altera DNS automaticamente.

## Verificações antes de publicar mudanças

- Abra o site no computador e no celular.
- Teste filtros, detalhes dos projetos e fechamento por Escape.
- Confira links, datas e descrição da sua contribuição em cada projeto.
- Use dados fictícios em capturas de tela.
- A sintaxe do JavaScript pode ser verificada com `node --check assets/main.js`.

## Próximas melhorias

1. Unificar Helpdesk e pipeline em um único caso.
2. Incluir o projeto AWS/Terraform após as correções técnicas.
3. Incorporar capturas reais dos projetos com dados fictícios.
4. Revisar e disponibilizar currículo atualizado.
5. Avaliar o novo conversor de ECG antes de incluir.
