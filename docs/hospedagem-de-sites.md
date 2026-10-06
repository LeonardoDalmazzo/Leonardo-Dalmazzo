# Hospedagem gerenciada de sites

- Página: `/hospedagem-de-sites/`.
- Entrada: categoria `#hospedagem` de `services.html`; URL incluída no sitemap.
- Conteúdo comercial: imagem e PDF `Hospedagem_Gerenciada_Precos.pdf` fornecidos pelo responsável pelo site. Conferidos em 06/10/2026.

## Valores e escopo

| Período | Valor total | Equivalência mensal | Economia sobre mensalidades de R$ 35 |
| --- | --- | --- | --- |
| Mensal | R$ 35/mês | R$ 35 | Sem desconto |
| Anual | R$ 347,88 por 12 meses | R$ 28,99 | R$ 72,12 em 12 meses (aprox. 17,2%) |
| Bienal | R$ 480 por 24 meses | R$ 20,00 | R$ 360 em 24 meses (aprox. 42,9%) |
| Trienal | R$ 899,64 por 36 meses | R$ 24,99 | Comparação de desconto não anunciada: inclui recursos adicionais |

O plano bienal foi corrigido conforme orientação posterior do responsável pelo site: R$ 20,00 por mês de equivalência, totalizando R$ 480 por 24 meses. A equivalência mensal não é apresentada como parcelamento ou cobrança mensal dos períodos maiores. Pagamento, renovação e condições de encerramento após o arrependimento são informados antes da contratação.

Mensal, anual e bienal incluem até 10 GB e até 10 mil visitas/mês. O trienal inclui até 20 GB e até 20 mil visitas/mês. A duplicação aplica-se somente a armazenamento e visitas. Todos os planos incluem 1 backup mensal, SSL grátis, gestão da hospedagem e publicação de versões prontas enviadas em .zip.

O trienal também inclui e-mail personalizado com o domínio do cliente, sujeito à consulta de disponibilidade, quantidade de contas e armazenamento por conta. Essas condições aparecem no card, na seção de inclusões, no FAQ e na mensagem do WhatsApp. Nos outros planos, e-mail é contratado à parte. Domínio e renovação de domínio continuam não inclusos em todos os planos. Demanda superior aos limites pode exigir proposta personalizada. Desenvolvimento, alterações e migração não são anunciados como inclusos.

## Publicação de versões e criação

A gestão da hospedagem inclui colocar no ar uma versão já pronta, enviada pelo cliente em arquivo .zip. Criar páginas, alterar conteúdo, implementar funcionalidades, corrigir código e preparar ou gerar a nova versão são escopo separado de desenvolvimento. Isso está explícito na página de hospedagem, no catálogo de serviços e nas referências de hospedagem das páginas de criação, landing pages, site institucional, loja virtual, São Paulo, guia de preços e comparação com WordPress. As entregas de desenvolvimento continuam seguindo suas próprias propostas.

## Arrependimento e cancelamento

- Mensal: direito legal de arrependimento de 7 dias nas contratações fora do estabelecimento, com contagem da assinatura ou do recebimento do serviço conforme o art. 49 do CDC.
- Anual, bienal e trienal: 30 dias corridos a partir da contratação como política comercial adicional indicada pelo responsável pelo site. Não é anunciado como prazo legal de 30 dias. O direito legal permanece preservado em todos os planos.
- Desistência nesses prazos: devolução integral dos valores pagos pelo plano, sem multa. A restituição no exercício do direito legal segue o CDC.
- Após esses prazos: o cliente pode solicitar encerramento; condições de término, eventuais valores e reembolso seguem o contrato informado antes da compra e os direitos legais. Não foi criada proibição de cancelamento posterior nem regra de perda automática de valores.
- Solicitação pelo WhatsApp existente, com plano e data de contratação. Esse botão de atendimento não tem os atributos de conversão comercial dos CTAs de contratação.

Fonte legal consultada: [Código de Defesa do Consumidor, art. 49](https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm#art49). A política está na seção `#cancelamento`, com links nos quatro cards e em `services.html`.

## Componentes e manutenção

A página reutiliza `servicesSection.css`, `landingPages.css`, header, footer, botões, navegação, FAQ nativo, temas e personalização de cores existentes. `components/pricing/pricingCards.css` oferece cards reutilizáveis; `hostingPage.css` cuida apenas da composição da nova página, com tokens derivados das variáveis existentes. Não há dependência, imagem pesada ou JavaScript novo.

Ao alterar preços, sincronizar o HTML dos cards e FAQ, mensagens do WhatsApp, metadados, ofertas JSON-LD e a apresentação em `services.html`. Os valores dos dados estruturados representam os totais dos períodos, não a equivalência mensal.

## Campanhas e contato

Os CTAs abrem `https://wa.me/5511991795884` com mensagens específicas. Os quatro cards incluem período e valor. A abertura do WhatsApp inicia o atendimento; não efetua compra ou pagamento automaticamente.

Os atributos `data-contact="whatsapp"`, `data-cta-location="hero|planos|final"` e `data-plan="mensal|anual|bienal|trienal"` permitem configurar medição posteriormente. Não foi instalado rastreamento de Google Ads/Analytics. Para medir conversões, é necessário configurar as contas e identificadores reais; clicar no WhatsApp não comprova venda.

O script `scripts/build-deploy.py` inclui diretórios que contêm `index.html`, além de `components` e `css`. A página está no pacote `deploy/leonardo-dalmazzo-v1.5.0-hostgator.zip`, com checksum e instruções em `docs/deploy.md`. A geração do pacote e o push não publicam os arquivos na HostGator.

## Verificação local

- Layout sem transbordamento entre 320 e 2560 px, incluindo celular, tablet, desktop e tela ampla.
- Inspeção visual em 390 e 1440 px, nos temas claro e escuro.
- Menu móvel abre e fecha; Escape devolve o foco ao botão.
- FAQ nativo, âncoras, acesso pela lista de serviços e conteúdo principal sem JavaScript.
- Preços dos dados estruturados, número e mensagens de WhatsApp conferidos.
- Sem erros JavaScript ou respostas HTTP de erro durante a navegação local.
