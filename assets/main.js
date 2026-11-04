const projects={
  "helpdesk": {
    "type": "APLICAÇÃO + INFRAESTRUTURA",
    "title": "Helpdesk & entrega contínua",
    "context": "Organizar o atendimento técnico e conectar a gestão de chamados aos dados de uma base legada de telemedicina.",
    "work": [
      "Desenvolvimento de aplicação com FastAPI, Jinja2 e PostgreSQL.",
      "Integração com a base legada para autenticação e informações de clientes.",
      "Gestão de chamados, histórico, anexos e notificações por WhatsApp.",
      "Implantação em Kubernetes e automação de entrega com GitHub Actions.",
      "Build de imagens e publicação no GitHub Container Registry.",
      "Implantação automatizada em homologação e aprovação para produção.",
      "Execução de migrações de banco com Alembic.",
      "Configuração de Ingress, certificados TLS, volumes persistentes e verificações de saúde."
    ],
    "flow": "GitHub Actions → Build → GHCR → Homologação → Aprovação → Produção<br>Interface → FastAPI → PostgreSQL<br>Integrações → base legada + WhatsApp",
    "stack": "FastAPI · SQLAlchemy · Alembic · PostgreSQL · Docker · GitHub Actions · GHCR · k3s · Traefik · cert-manager",
    "link": "https://github.com/viniciuscaol/hpcematel"
  },
  "atendimento": {
    "type": "INTEGRAÇÃO + OPERAÇÃO",
    "title": "Atendimento compartilhado",
    "context": "Disponibilizar atendimento corporativo por WhatsApp para múltiplos atendentes em uma interface web.",
    "work": [
      "Implantação de Chatwoot integrado ao WAHA com Docker Compose.",
      "Configuração de PostgreSQL, Redis e processamento de tarefas com Sidekiq.",
      "Importação de histórico recente de conversas.",
      "Configuração de acesso HTTPS e rotinas de backup com teste de restauração."
    ],
    "flow": "WhatsApp → WAHA → Chatwoot<br>Persistência → PostgreSQL + anexos",
    "stack": "Docker Compose · Chatwoot · WAHA · PostgreSQL · Redis · rclone"
  },
  "monitoramento": {
    "type": "REDES + OBSERVABILIDADE",
    "title": "Monitoramento de links",
    "context": "Ampliar a visibilidade sobre o comportamento das conexões de internet e facilitar o diagnóstico de problemas.",
    "work": [
      "Configuração de coleta SNMP no MikroTik.",
      "Sondas de conectividade e latência por link em um coletor Linux.",
      "Configuração de rotas e marcação de tráfego para direcionar as sondas.",
      "Trabalho de integração das informações para acompanhamento em dashboards."
    ],
    "flow": "MikroTik + links → SNMP / sondas<br>Coleta → acompanhamento operacional",
    "stack": "MikroTik RouterOS · Linux · SNMP · Grafana · systemd"
  },
  "ecg": {
    "type": "PYTHON + PROCESSAMENTO DE ARQUIVOS",
    "title": "Conversor de ECG WXML",
    "context": "Transformar arquivos de exames WinCardio em formatos que possam ser visualizados no navegador e integrados a outros sistemas.",
    "work": [
      "API FastAPI com endpoints de conversão e inspeção de metadados.",
      "Renderização vetorial em SVG e PDF, além de PNG, JPEG e ZIP.",
      "Visualizador web com zoom, navegação e exportação; conversor por linha de comando.",
      "Testes de calibração, validação de entrada e limites, com CI para Python, API em Docker e interface no navegador."
    ],
    "flow": "WXML → Validação do perfil → Renderização<br>SVG → Visualizador web / PDF e imagens → Exportação",
    "stack": "Python · FastAPI · ReportLab · pypdfium2 · SVG · Docker Compose · pytest · GitHub Actions",
    "status": "Validação técnica com casos sintéticos e um WXML real. Compatibilidade limitada aos perfis documentados; sem diagnóstico ou laudo automático e sem homologação clínica.",
    "link": "https://github.com/viniciuscaol/api-ecg-wxml"
  },
  "terraform": {
    "type": "LABORATÓRIO + INFRAESTRUTURA COMO CÓDIGO",
    "title": "Laboratório AWS & Terraform",
    "context": "Projeto acadêmico do Santander Coders / Ada Tech para representar a infraestrutura de um cenário de e-commerce em configurações versionadas.",
    "work": [
      "Definição de VPC e sub-redes públicas, privadas e de banco em três zonas de disponibilidade.",
      "Configuração em código de instâncias EC2, Application Load Balancer e banco RDS MySQL.",
      "Definição de armazenamento S3 e distribuição de conteúdo com CloudFront.",
      "Validação no GitHub Actions com terraform fmt, init e validate, além de verificação de sintaxe do bootstrap Bash."
    ],
    "flow": "Terraform / HCL → Recursos AWS declarados<br>Rede + computação + banco + armazenamento + distribuição",
    "stack": "Terraform · AWS · VPC · EC2 · ALB · RDS MySQL · S3 · CloudFront · Bash · GitHub Actions",
    "status": "Laboratório com validação estática e CI aprovados. Implantação e testes operacionais na AWS ainda pendentes.",
    "link": "https://github.com/viniciuscaol/proejetofinal-sciac"
  }
};
const dialog=document.querySelector('dialog');let trigger;
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('.project').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&!card.dataset.category.split(' ').includes(button.dataset.filter)})}));
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{trigger=button;const p=projects[button.dataset.project];document.querySelector('#modal-content').innerHTML='<div class="eyebrow">'+p.type+'</div><h2 id="modal-title">'+p.title+'</h2><h3>O contexto</h3><p>'+p.context+'</p><h3>Minha atuação</h3><ul>'+p.work.map(x=>'<li>'+x+'</li>').join('')+'</ul><h3>Como se conecta</h3><div class="flow">'+p.flow+'</div><h3>Tecnologias</h3><p>'+p.stack+'</p>'+(p.status?'<h3>Estado do projeto</h3><p>'+p.status+'</p>':'')+(p.link?'<a class="modal-link" href="'+p.link+'" target="_blank" rel="noopener noreferrer">Ver repositório no GitHub ↗</a>':'');dialog.showModal()}));
document.querySelector('.modal-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});dialog.addEventListener('close',()=>trigger?.focus());
document.querySelector('#copy-email').addEventListener('click',async e=>{try{await navigator.clipboard.writeText('viniciuscaol@gmail.com');e.target.textContent='E-mail copiado ✓'}catch{e.target.textContent='viniciuscaol@gmail.com — selecione para copiar'}});document.querySelector('#year').textContent=new Date().getFullYear();
