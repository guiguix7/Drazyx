# Drazyx — Site Oficial (v2.0)

Reconstrução do site como plataforma multi-página (não mais uma SPA de
seção única), mantendo a identidade visual atual (fundo escuro,
glassmorphism, roxo/violeta + toques de carmesim, tipografia Space
Grotesk/Inter) como base.

## Rodando o projeto

```bash
npm install
npm run dev
```

## Sobre a nova dependência

O projeto passa a usar **react-router-dom** — é a única biblioteca nova
adicionada. Necessária porque o pedido passou de "uma SPA de seção
única" para uma arquitetura de páginas reais (`/music`, `/beats`,
`/production`, etc.), com URLs próprias por lançamento (`/music/:id`).
Não foi adicionada nenhuma outra dependência (SEO, animações e o player
de áudio foram implementados sem libs extras).

## Estrutura

```
src/
  components/   Navbar, Footer, ReleaseCard, BeatRow, AudioPlayer,
                NewsletterForm, SupportCard, SEO, Reveal
  pages/        Home, Music, Release, Beats, Production, Licensing,
                TheRoom, About, Contact, Support, NotFound
  data/         releases.js, beats.js, services.js, socialLinks.js,
                contact.js
  styles/       global.css (design tokens + utilitários)
```

Toda informação editável (beats, releases, links, textos) fica nos
arquivos de `data/` — não há conteúdo hardcoded espalhado pelos
componentes.

## Regra seguida sobre dados

Nenhuma informação foi inventada. Onde um dado real não foi fornecido
(bio, títulos e capas dos álbuns, prazos de serviço, links de apoio,
credits, etc.), o código usa um placeholder visível — normalmente
`[ADD ALGO AQUI]` — ou um comentário `// TODO:` explicando exatamente o
que falta e onde editar. Busque por `TODO` e `[ADD` no projeto para
achar tudo o que ainda precisa do seu input.

## Nenhuma funcionalidade é simulada

- **Newsletter** (`NewsletterForm.jsx`) e **Contato** (`Contact.jsx`)
  não fingem sucesso: sem um backend configurado, a submissão cai no
  estado `error` e explica que a interface está pronta para
  integração — nunca mostra "mensagem enviada" sem ter enviado nada.
- **Beats sem `purchaseUrl`** não mostram botões de compra fictícios:
  levam para `/contact` com o assunto já preenchido.
- **Beats sem `previewUrl`** têm o botão de play desabilitado, com
  `title="Preview em breve"`.

## O que ainda depende de serviços/dados externos

| Item | Onde | Depende de |
|---|---|---|
| Envio do formulário de contato | `pages/Contact.jsx` → `sendContactMessage()` | Backend/endpoint ou serviço (Formspree, Resend, etc.) |
| Inscrição na newsletter | `components/NewsletterForm.jsx` → `subscribeToNewsletter()` | Provedor de email (Mailchimp, Buttondown, etc.) |
| Compra de beats (MP3/WAV/Exclusive) | `data/beats.js` (`purchaseUrl`) | BeatStars, Airbit, Stripe, Mercado Pago ou checkout próprio |
| Preview de áudio dos beats | `data/beats.js` (`previewUrl`) | Arquivos de áudio hospedados |
| Links de apoio (Buy Me a Coffee / Ko-fi / Pix) | `data/socialLinks.js` (`supportLinks`) | Contas criadas nessas plataformas |
| Bio, identidade artística, timeline com datas reais | `pages/About.jsx` | Texto fornecido por você |
| Títulos, ano, capa e credits dos 2 álbuns já linkados | `data/releases.js` | Dados reais dos lançamentos |
| Favicon e imagem de Open Graph | `index.html`, `/public` | Arquivos de imagem reais |
| Domínio final (`drazyx.com` usado como placeholder) | `index.html`, `SEO.jsx`, `sitemap.xml`, `robots.txt` | Confirmação do domínio |

## Checklist do que foi implementado

- [x] Arquitetura multi-página com React Router
- [x] Home enxuta (Hero, Latest Release, Featured Beat, About teaser, The Room teaser, Support teaser)
- [x] Music (catálogo) + Release individual com credits/related music
- [x] Beats (beat store) com player de preview (1 tocando por vez) e dados estruturados prontos para BeatStars/Airbit
- [x] Production (Custom Beats, Mix & Master, Collaboration) com CTA para contato
- [x] Licensing com casos de uso e CTA
- [x] The Room com newsletter funcional (estado real) e espaço para downloads
- [x] About com bio/identidade em placeholder e timeline dinâmica
- [x] Contact com validação, estados idle/submitting/success/error e leitura de `?subject=`
- [x] Support com cards de apoio (desabilitados até haver link real)
- [x] Footer e Navbar com os links sociais reais fornecidos
- [x] SEO: title/description por página, canonical, Open Graph, Twitter Card, JSON-LD, sitemap.xml, robots.txt
- [x] Acessibilidade: aria-labels, foco visível, `prefers-reduced-motion`, labels em todos os campos
- [x] Responsivo (mobile-first) e lazy loading nos iframes/imagens
- [x] Sem dark patterns, sem dados fictícios (plays, seguidores, depoimentos)

## Pendências que dependem só de você

- Preencher todos os `TODO` / `[ADD ...]` em `data/releases.js`, `data/beats.js`, `data/services.js`, `pages/About.jsx`
- Definir e configurar os serviços externos da tabela acima
- Adicionar favicon real e imagem de Open Graph (1200×630)