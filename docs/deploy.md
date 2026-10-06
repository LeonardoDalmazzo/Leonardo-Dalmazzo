# Publicação na HostGator

O pacote `v1.5.0` adiciona a página de hospedagem gerenciada com quatro planos, contato por WhatsApp e condições de contratação. Atualiza as referências comerciais para explicitar que a publicação exige versões prontas em `.zip`, reorganiza o menu com acesso direto à hospedagem e padroniza o título Certificados. Inclui todos os arquivos públicos, preservando a home comercial, o carrossel, o formulário e os temas existentes.

## Gerar o pacote

Na raiz do repositório, com Python 3 instalado:

```powershell
py scripts/build-deploy.py 1.5.0
```

O script cria `deploy/leonardo-dalmazzo-v1.5.0-hostgator.zip` e o arquivo `.zip.sha256` correspondente. No Windows, use o launcher `py`; em outros ambientes, use `python` ou `python3`. Usa apenas a biblioteca padrão do Python, confere a integridade do ZIP e compara cada arquivo empacotado com sua origem. Não sobrescreve um pacote de release existente; para a próxima release, informe sua nova versão.

Pacote v1.5.0: 115 arquivos, 91.141.795 bytes. SHA-256: `1a69b02bf610cbff1206857e89d4e02404e3d4bdf680aa0944101fa431ec76f9`.

O ZIP contém os HTML da raiz, as pastas de páginas com `index.html`, `assets`, `components`, `css`, `js`, `robots.txt` e `sitemap.xml`. Não inclui `.git`, instruções de agentes, scripts de desenvolvimento, documentação nem os ZIPs anteriores. Os arquivos ficam diretamente na raiz do pacote, sem uma pasta de projeto envolvendo o site.

## Publicar

1. Faça backup dos arquivos atuais do domínio no painel da hospedagem.
2. Envie o ZIP para a raiz documental configurada para `leonardodalmazzo.com` e extraia seu conteúdo ali, substituindo os arquivos correspondentes. Essa raiz pode ser `public_html` ou uma pasta específica do domínio; confirme a configuração no painel.
3. Preserve configurações do servidor e outros arquivos que não fazem parte deste pacote. O projeto não fornece uma nova configuração `.htaccess`.
4. Remova o ZIP enviado da pasta pública após a extração.
5. Confira a home, serviços, projetos, certificados, menu, imagens e as oito páginas comerciais em subdiretórios, incluindo `/hospedagem-de-sites/`. Verifique também respostas HTTP 200 para `/robots.txt` e `/sitemap.xml` e o XML retornado pelo servidor.
6. Envie `https://leonardodalmazzo.com/sitemap.xml` no Search Console da propriedade correspondente e acompanhe a leitura e indexação.

Ao atualizar uma instalação anterior para `v1.3.0`, remova também os arquivos obsoletos `assets/fonts/GraffitiMenu-Regular.woff2` e `css/sections/moreOptionsSection.css` da pasta do site. A extração do ZIP não apaga arquivos antigos. Confirme que `components/showcase/showcaseFilters.js` foi enviado e teste os filtros nas três páginas, em celular e desktop. Se a hospedagem usar cache, atualize-o para evitar misturar versões de CSS e JavaScript.

Ao atualizar para `v1.4.0`, exclua da raiz pública o arquivo HTML da antiga página de parcerias: a extração não remove essa cópia existente. Confirme o envio de `components/carousel/caseCarousel.js` e confira os controles do carrossel, a seleção de acompanhamento mensal no formulário e os temas claro e escuro.

O push para o GitHub atualiza o repositório; este procedimento não pressupõe deploy automático na HostGator.

Na atualização para `v1.5.0`, confira os quatro planos e seus links de WhatsApp, o backup mensal em todos os planos, os limites de 20 GB e 20 mil visitas/mês do trienal e o e-mail sujeito à consulta. Verifique a seção de arrependimento: 7 dias legais no mensal e 30 dias corridos de política comercial adicional nos demais, preservando os direitos legais. Confirme a borda de destaque apenas no bienal, os títulos com os anos e a navegação Home, Sobre, Serviços, Hospedagem, Projetos, Certificados, Repositórios e Contato. Atualize o cache da hospedagem, se houver.

## Rastreamento

`robots.txt` permite rastreamento de todas as rotas e recursos e referencia o sitemap absoluto. O sitemap lista 13 URLs preferenciais: a home, quatro páginas principais e oito páginas comerciais. Usa a raiz `/` para a home e diretórios com barra final para as páginas comerciais, sem duplicar `index.html`, fragmentos ou parâmetros.

`thanks.html` continua no pacote para o fluxo de contato, mas não integra o sitemap por ser uma confirmação de envio. Isso não equivale a uma regra de `noindex`. Não há bloqueios novos nem datas de atualização estimadas. Os campos opcionais `lastmod`, `priority` e `changefreq` foram omitidos.

Referência: [criação e envio de sitemaps no Google Search Central](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
