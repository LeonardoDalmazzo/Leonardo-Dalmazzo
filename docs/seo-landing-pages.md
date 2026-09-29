# Integração das páginas comerciais

## Base existente e decisões

O projeto é um site estático com HTML, CSS e JavaScript vanilla, sem etapa de build. `css/style.css` centraliza os estilos. `css/variables.css` define as fontes Segoe UI/Graffiti e as cores; `colorCustomizer.js` mantém a paleta e o tema. As páginas secundárias utilizam header e footer compartilhados em JavaScript. A home possui seu próprio markup de navegação.

As sete páginas novas reutilizam esse header, menu, footer, Font Awesome, temas e os componentes de `servicesSection.css` e `showcaseGallery.css`. O complemento `landingPages.css` trata somente composição, link para pular ao conteúdo e apresentações estáticas dos projetos. Não há biblioteca nova, formulário duplicado, carrossel ou JavaScript específico de landing page.

Os serviços e textos dos projetos foram baseados em `services.html` e `projects.html`. Os contatos permanecem os existentes: WhatsApp `https://wa.me/5511991795884`, seção de contato da home e redes do footer. Fiançailles e Loctubo são apresentados como projetos do portfólio, sem atribuir métricas ou avaliações ao desenvolvedor.

## Arquivos criados

| Arquivo | Finalidade |
| --- | --- |
| `criacao-de-sites/index.html` | Landing principal: hero, formatos, escopo, processo, projetos, diferenciais, FAQ e orçamento. |
| `landing-pages/index.html` | Serviço de criação de landing pages: serviços, vendas, campanhas e lançamentos, Google Ads, revisão de conversão, CTAs, formulário/WhatsApp, mobile, processo e FAQ. |
| `site-institucional/index.html` | Definição e público do site institucional, páginas Home/Sobre/Serviços/Portfólio/Contato, comparação com landing page, desenvolvimento, publicação, manutenção e projetos reais. |
| `criacao-de-sites-sao-paulo/index.html` | Página local para negócios de São Paulo: formatos de site, SEO local, atendimento remoto, Loctubo/Fiançailles, processo, FAQ e orçamento. |
| `loja-virtual/index.html` | Landing comercial de desenvolvimento de loja virtual, recursos condicionados ao escopo, pagamentos por provedores, processo, FAQ e orçamento. |
| `quanto-custa-criar-um-site/index.html` | Guia sem preços inventados: fatores do orçamento, comparação de cinco formatos, custos recorrentes, preparação da proposta e FAQ. |
| `site-sob-medida-ou-wordpress/index.html` | Comparação entre desenvolvimento sob medida e CMS, valor do profissional, critérios de escolha, projetos reais, FAQ e orçamento. |
| `css/sections/landingPages.css` | Complementos visuais compartilhados pelas páginas comerciais. |
| `assets/imgs/projects/previews/fiancailles.webp` | Prévia otimizada do topo da captura existente `(4).png`, com galeria do projeto. |
| `assets/imgs/projects/previews/loctubo.webp` | Prévia otimizada da captura existente `(01).png`. |
| `docs/seo-landing-pages.md` | Registro de integração, validação e publicação. |
| `robots.txt` | Permite rastreamento público e referencia o sitemap. |
| `sitemap.xml` | Inventário de 13 URLs públicas, incluindo as sete novas páginas. |

## Arquivos alterados

| Arquivo | Alteração |
| --- | --- |
| `components/layout/header/header.js` | Resolve links a partir da localização do componente para funcionar em subdiretórios; mantém o link de pular conteúdo primeiro na ordem de foco; devolve foco ao botão ao fechar o menu com Escape. |
| `css/header.css` | Retira o botão de voltar ao topo da navegação por teclado enquanto ele está invisível. |
| `css/sections/servicesSection.css` | Permite quebra de linha no breadcrumb e identifica links contextuais com sublinhado. |
| `css/sections/projectsSection.css` | Espaçamento e sublinhado dos novos links contextuais no cabeçalho de projetos. |
| `index.html` | Link para criação de sites em Mais opções. |
| `services.html` | Links contextuais para os cinco serviços na categoria Sites e aplicativos e para o guia de orçamento no FAQ. |
| `projects.html` | Links para os três serviços no cabeçalho do portfólio. |

## SEO e campanhas

- Um H1 por página, com títulos e descrições exclusivos; palavra-chave principal no title, H1 e texto da página principal.
- Canonicals absolutos no domínio `https://leonardodalmazzo.com`, para `/criacao-de-sites/`, `/landing-pages/`, `/site-institucional/`, `/criacao-de-sites-sao-paulo/`, `/loja-virtual/` e `/quanto-custa-criar-um-site/`. O acesso explícito a `index.html` aponta para o mesmo canonical do diretório.
- Open Graph e Twitter Card com imagens existentes otimizadas, textos alternativos e URLs absolutas.
- JSON-LD com `Service`, `Person` e `BreadcrumbList` nas páginas comerciais. O provider referencia `https://leonardodalmazzo.com/#leonardo-dalmazzo`, definido como Person no mesmo grafo. O guia de orçamento usa `WebPage`, com author e breadcrumb referenciados no grafo.
- Links de entrada em páginas existentes e navegação contextual entre os serviços. A página local recebe links de `services.html` e `criacao-de-sites/index.html`, e aponta para os três formatos, serviços, projetos e contato. Contato disponível por links HTML mesmo sem JavaScript.
- FAQ com `details`/`summary`, sem script e sem promessa de resultado enriquecido ou posição no Google.
- CTAs com `data-contact="whatsapp"` e `data-cta-location="hero|revisao|final"` para permitir futura configuração de medição. Nenhum ID fictício de Google Ads/Analytics ou tag de rastreamento foi instalado. Medição de conversões depende das contas e configurações reais; um clique não comprova atendimento ou venda.
- Imagens com dimensões explícitas, WebP, carregamento lazy e decodificação assíncrona abaixo da dobra. O hero usa texto e CSS, sem imagem pesada ou nova dependência.

### Conteúdo e títulos das páginas complementares

- `site-institucional/index.html`: H1 “Criação de Site Institucional para Empresas” e title “Criação de Site Institucional para Empresas | Leonardo Dalmazzo”. Inclui a seção “Site Institucional x Landing Page”, com link para o serviço complementar, e os projetos Fiançailles e Loctubo.
- `landing-pages/index.html`: H1 “Criação de Landing Pages Profissionais” e title “Criação de Landing Page Profissional | Leonardo Dalmazzo”. A primeira tela informa entrega, público, finalidade e orçamento por WhatsApp. O bloco “Já anuncia no Google e sua página não converte?” orienta a revisão de mensagem, contato, mobile e medição sem garantir resultados.
- Descrições exclusivas, títulos sociais e JSON-LD acompanham o conteúdo de cada página. Os links para criação de sites, serviços, projetos e contato continuam presentes.
- O detalhamento dessas duas páginas utiliza apenas os componentes e estilos já integrados. Não exige novos arquivos CSS, JavaScript, dependências ou backend.

### Página local de São Paulo

`criacao-de-sites-sao-paulo/index.html` usa o title “Criação de Sites em São Paulo | Leonardo Dalmazzo” e o H1 “Criação de Sites em São Paulo”, com descrição própria, Open Graph, Twitter Card e breadcrumb Início → Criação de sites → São Paulo. O conteúdo aborda a escolha do formato, informações úteis para buscas locais, organização do atendimento e preparação do orçamento; não replica páginas por bairro.

As referências foram conferidas antes da implementação:

- `index.html` contém mapas da cidade de São Paulo, Freguesia do Ó e Vila Mariana. A cidade sustenta `areaServed: {"@type": "City", "name": "São Paulo"}` no Service; nenhum endereço, coordenada, escritório ou nova área de atendimento foi adicionado.
- `services.html` informa que sites e sistemas podem ser combinados à distância. A menção a presencial está ligada a computadores, impressoras e redes; por isso, a página local de sites apresenta atendimento remoto.
- `projects.html` descreve a Loctubo como site institucional e catálogo digital de locação, com busca, filtros, orçamento por WhatsApp, campanhas e SEO local. A página usa essa descrição e a stack já registrada, sem resultados atribuídos ou métricas.
- Fiançailles permanece apresentado como projeto do portfólio, sem atribuição de localização ou resultados comerciais.

A inclusão local altera apenas o novo HTML, os links de entrada em `services.html` e `criacao-de-sites/index.html` e este registro. Reutiliza as imagens otimizadas, todo o CSS e os scripts existentes.

### Loja virtual e guia de orçamento

Antes da inclusão, foram revisados os serviços, contatos, estilos, scripts, páginas e referências de preços existentes. Não foi encontrada tabela real de preços. A página de loja virtual apresenta o serviço solicitado, sem implementar catálogo funcional, carrinho, painel, checkout ou backend. Todos esses recursos são possibilidades condicionadas à proposta; pagamentos são descritos como integração com provedores apropriados, sem processamento próprio ou armazenamento direto de cartões.

O guia responde à pergunta já no hero, separa desenvolvimento de despesas recorrentes e compara landing page, site institucional, catálogo, loja virtual e sistema web. O CTA comercial aparece após o conteúdo explicativo. As duas páginas recebem links de `services.html` e `criacao-de-sites/index.html`, possuem links entre si e mantêm contato pelo WhatsApp existente. Reutilizam todos os estilos e scripts, sem novos arquivos CSS/JS. Open Graph e Twitter utilizam o retrato existente `assets/imgs/profile.jpg`, com dimensões e descrição próprias, sem atribuir um projeto de portfólio a uma loja que não está documentada.

## Verificação local

- Chrome headless: três páginas em 320, 375, 640, 768, 1024, 1440, 1920 e 2560 px, nos temas claro e escuro, sem transbordamento horizontal detectado.
- Revisão de capturas em desktop e mobile; imagens carregadas e decodificadas, preservando proporção e apresentação dos projetos.
- Menu abre e fecha, Escape restaura foco, FAQ funciona por teclado e o link de pular conteúdo leva ao main.
- Conteúdo, links comerciais e sete respostas do FAQ da página principal estão no HTML e acessíveis sem JavaScript. Header/footer continuam dependendo de JavaScript, como nas páginas secundárias existentes.
- Axe-core 4.10.3: nenhuma violação detectada nos conjuntos WCAG 2 A/AA, WCAG 2.1 AA e boas práticas, nas três páginas, em 320 e 1440 px e nos dois temas. Verificação automatizada não substitui avaliação completa com tecnologias assistivas.
- Parse HTML5 das três páginas e CSS dos quatro arquivos de estilo alterados/criados sem erros. Canonicals, JSON-LD, H1, hierarquia de títulos, IDs, arquivos locais e fragmentos internos verificados.
- Sem erros de execução ou respostas HTTP de erro na rodada de navegação local; header/footer conferidos em home, serviços, projetos e parceiros.
- Sintaxe do JavaScript compartilhado e `git diff --check` aprovados. Não foram medidos Core Web Vitals de usuários reais; essa avaliação depende da publicação e do tráfego.
- Após o detalhamento das páginas complementares, HTML, metadados exatos, links e 48 combinações de página/tema/largura foram novamente verificados. Nas duas páginas revisadas, oito auditorias de acessibilidade (320/1440 px, claro/escuro) não detectaram violações. Primeiras dobras revisadas visualmente, com CTA visível em 320 × 740 px.
- A página local e a página geral de criação de sites passaram em 32 combinações de página/tema/largura, de 320 a 2560 px, sem transbordamento ou erros de carregamento/execução. Na página local, quatro auditorias Axe (320/1440 px, claro/escuro) não detectaram violações. Menu, Escape, FAQ e salto para o conteúdo passaram por navegação por teclado; HTML, caminhos, âncoras e metadados das quatro páginas foram conferidos.

## Publicação e sitemap

A página `/site-sob-medida-ou-wordpress/` reutiliza integralmente os estilos, componentes e imagens existentes. Recebe links da página de criação de sites e do guia de orçamento, tem canonical absoluto próprio, título e descrição exclusivos, Open Graph, Twitter Card e JSON-LD `WebPage`/`Person`/`BreadcrumbList`. A comparação esclarece que CMS também usa código e pode receber trabalho profissional, sem prometer superioridade automática em SEO, desempenho ou segurança. Referências oficiais: [atualizações do WordPress](https://wordpress.org/documentation/article/plugins-themes-auto-updates/) e [otimização](https://developer.wordpress.org/advanced-administration/performance/optimization/).

Na inclusão dessa comparação, foram validados HTML, metadados e caminhos das sete páginas, além de 48 combinações de largura/tema na página nova e nas duas páginas com links alterados. Quatro auditorias de acessibilidade da página nova não detectaram violações, com navegação por teclado e capturas desktop/mobile revisadas. Nenhum CSS, script, dependência ou backend foi adicionado.

A inclusão de loja virtual e guia de orçamento passou por parse HTML5, validação dos metadados, canonical, JSON-LD, caminhos e fragmentos das seis páginas. As duas páginas novas e a página geral foram verificadas em 48 combinações de largura/tema (320 a 2560 px), sem transbordamento ou erros de carregamento/execução. Nas duas páginas novas, oito auditorias Axe em 320/1440 px e claro/escuro não detectaram violações. Capturas desktop/mobile foram revisadas, e menu, Escape, FAQ e salto ao conteúdo passaram por navegação por teclado.

Na análise inicial, `sitemap.xml` e `robots.txt` não existiam no repositório e retornavam HTTP 404 no domínio. Após a solicitação de publicação, ambos foram criados na raiz do projeto.

O sitemap contém 13 URLs absolutas em HTTPS: home, serviços, projetos, certificações, repositórios, parceiros e as sete páginas novas. As rotas de diretório usam barra final; `index.html` não é duplicado. A confirmação `thanks.html` não está no sitemap. Não foram estimados `lastmod`, frequência ou prioridade. O robots permite o rastreamento, inclusive de CSS, scripts e imagens, e informa `https://leonardodalmazzo.com/sitemap.xml`.

O pacote `deploy/leonardo-dalmazzo-v1.2.0-hostgator.zip` reúne os arquivos públicos atualizados, incluindo sitemap e robots. Consulte [o procedimento de publicação](deploy.md) para geração, checksum e extração na raiz documental do domínio. Os ZIPs anteriores foram preservados. Após publicar na hospedagem, conferir as URLs e enviar o sitemap no Search Console. A atualização do Git não configura campanhas nem implica extração automática do ZIP na HostGator.
