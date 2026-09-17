# Nardo Ar — Site Institucional

Site institucional da **Nardo Ar** (Central Ar Maringá), empresa de climatização do **Grupo Nardo** de Maringá/PR. Design cinematográfico escuro com dourado, no padrão dos sites premiados de arquitetura e de grandes grupos empresariais.

## Stack

- **[Vite](https://vitejs.dev/)** — build e dev server
- **[GSAP + ScrollTrigger](https://gsap.com/)** — animações e pinning
- **[Lenis](https://lenis.darkroom.engineering/)** — scroll suave
- **Google Fonts** — Fraunces (display serif editorial) + Archivo (sans)

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de produção em /dist
npm run preview  # serve o build
```

## Experiência

- **Preloader** cinematográfico com contador e cortina de saída
- **Cursor personalizado** (dot + anel com rótulos contextuais)
- **Scroll suave** com Lenis integrado ao ticker do GSAP
- **Tipografia editorial gigante** com máscaras de linha
- **Cards empilhados sticky** na seção de serviços (com scale/escurecimento progressivo)
- **Seção horizontal pinada** para as empresas do Grupo Nardo (carrossel nativo no mobile)
- **Marquees** infinitos (hero + marcas parceiras)
- Manifesto com **reveal de palavras em scrub**, contadores animados, parallax em todas as mídias
- **Botões magnéticos**, menu fullscreen com links gigantes, grain de filme e barra de progresso
- Formulário que **abre o WhatsApp** com a mensagem pronta (sem backend)
- Respeita `prefers-reduced-motion` e degrada graciosamente sem JS

## Estrutura

```
├── index.html          # todo o conteúdo (PT-BR) + JSON-LD LocalBusiness
├── public/
│   ├── favicon.svg
│   └── img/            # imagens cinematográficas (escuras + dourado)
└── src/
    ├── main.js         # orquestração
    ├── css/            # base / components / sections
    └── js/             # módulos: preloader, cursor, menu, animações, form…
```

## Conteúdo & contatos usados

- Telefone/WhatsApp: **(44) 99108-2460** · E-mail: **alnmaringa@gmail.com**
- Endereço: **Av. São Judas Tadeu, 532 — Jardim Imperial II, Maringá/PR**
- Fontes: [centralarmaringa.com.br](https://centralarmaringa.com.br), [gruponardo.com.br](https://gruponardo.com.br), Google Maps e Instagram @gruponardomaringa
- Empresas do grupo: Central Ar · Gesso Nardo · Nardo Planejados · Gran Nardo · Marido Maringá

> Para ajustar cores/tema, edite as variáveis em `src/css/base.css` (`:root`).
> Horários de atendimento e números exibidos podem ser confirmados e ajustados em `index.html`.
