# Publicação na HostGator

O pacote `v1.4.0` apresenta a nova home comercial, com carrossel de projetos, acompanhamento mensal e formulário de contato com seleção de interesse. Inclui a nova paleta de cores para os temas claro e escuro e a remoção da antiga página de parcerias do site, do menu e do sitemap. As páginas comerciais e os arquivos de rastreamento continuam incluídos.

## Gerar o pacote

Na raiz do repositório, com Python 3 instalado:

```powershell
py scripts/build-deploy.py 1.4.0
```

O script cria `deploy/leonardo-dalmazzo-v1.4.0-hostgator.zip` e o arquivo `.zip.sha256` correspondente. No Windows, use o launcher `py`; em outros ambientes, use `python` ou `python3`. Usa apenas a biblioteca padrão do Python, confere a integridade do ZIP e compara cada arquivo empacotado com sua origem. Não sobrescreve um pacote de release existente; para a próxima release, informe sua nova versão.

O ZIP contém os HTML da raiz, as pastas de páginas com `index.html`, `assets`, `components`, `css`, `js`, `robots.txt` e `sitemap.xml`. Não inclui `.git`, instruções de agentes, scripts de desenvolvimento, documentação nem os ZIPs anteriores. Os arquivos ficam diretamente na raiz do pacote, sem uma pasta de projeto envolvendo o site.

## Publicar

1. Faça backup dos arquivos atuais do domínio no painel da hospedagem.
2. Envie o ZIP para a raiz documental configurada para `leonardodalmazzo.com` e extraia seu conteúdo ali, substituindo os arquivos correspondentes. Essa raiz pode ser `public_html` ou uma pasta específica do domínio; confirme a configuração no painel.
3. Preserve configurações do servidor e outros arquivos que não fazem parte deste pacote. O projeto não fornece uma nova configuração `.htaccess`.
4. Remova o ZIP enviado da pasta pública após a extração.
5. Confira a home, serviços, projetos, certificados, menu, imagens e as sete novas rotas. Verifique também respostas HTTP 200 para `/robots.txt` e `/sitemap.xml` e o XML retornado pelo servidor.
6. Envie `https://leonardodalmazzo.com/sitemap.xml` no Search Console da propriedade correspondente e acompanhe a leitura e indexação.

Ao atualizar uma instalação anterior para `v1.3.0`, remova também os arquivos obsoletos `assets/fonts/GraffitiMenu-Regular.woff2` e `css/sections/moreOptionsSection.css` da pasta do site. A extração do ZIP não apaga arquivos antigos. Confirme que `components/showcase/showcaseFilters.js` foi enviado e teste os filtros nas três páginas, em celular e desktop. Se a hospedagem usar cache, atualize-o para evitar misturar versões de CSS e JavaScript.

Ao atualizar para `v1.4.0`, exclua da raiz pública o arquivo HTML da antiga página de parcerias: a extração não remove essa cópia existente. Confirme o envio de `components/carousel/caseCarousel.js` e confira os controles do carrossel, a seleção de acompanhamento mensal no formulário e os temas claro e escuro.

O push para o GitHub atualiza o repositório; este procedimento não pressupõe deploy automático na HostGator.

## Rastreamento

`robots.txt` permite rastreamento de todas as rotas e recursos e referencia o sitemap absoluto. O sitemap lista 12 URLs preferenciais: a home, quatro páginas principais e sete novas páginas. Usa a raiz `/` para a home e diretórios com barra final para as novas páginas, sem duplicar `index.html`, fragmentos ou parâmetros.

`thanks.html` continua no pacote para o fluxo de contato, mas não integra o sitemap por ser uma confirmação de envio. Isso não equivale a uma regra de `noindex`. Não há bloqueios novos nem datas de atualização estimadas. Os campos opcionais `lastmod`, `priority` e `changefreq` foram omitidos.

Referência: [criação e envio de sitemaps no Google Search Central](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
