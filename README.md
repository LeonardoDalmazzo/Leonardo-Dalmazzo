# 🚀 Leonardo Dalmazzo | Portfolio SPA

Bem-vindo ao meu portfólio profissional — um projeto **Single Page Application (SPA)** interativo, destacando meus projetos, habilidades e experiência. Acesse ao vivo:  
[Portfolio Online](https://leonardodalmazzo.github.io/Leonardo-Dalmazzo/)

---

##  Sobre o Projeto

Este site foi desenvolvido para apresentar de maneira elegante e funcional:

- Uma interface moderna com navegação fluída (SPA)
- Componente de cabeçalho e rodapé modular em JavaScript
- Transições suaves com animações via AOS
- Tema claro/escuro interativo com persistência > **localStorage**
- Formulário de contato com resposta automática e página de agradecimento
- Estrutura modular (JS, CSS, componentes reutilizáveis)

---

##  Tecnologias Utilizadas

| Categoria           | Ferramentas & Tecnologias                                   |
|---------------------|-------------------------------------------------------------|
| **Front-end**       | HTML5, CSS3, JavaScript (Vanilla)                           |
| **Animações**       | [AOS - Animate On Scroll](https://michalsnik.github.io/aos/)|
| **Componentização** | JavaScript modularizado para header, footer e outros        |
| **Contato**         | FormSubmit.co com redirecionamento e resposta automática    |
| **Tema**            | Toggle claro/escuro com `localStorage`                      |
| **Hospedagem**      | GitHub Pages                                                |

---

##  Estrutura do Projeto

```
/
├── index.html
├── projects.html
├── thanks.html
├── README.md
├── components/
│   ├── buttons/
│   │   └── buttonGlowBounce.css
│   ├── layout/
│   │   ├── header/
│   │   │   ├── header.js
│   │   │   └── header.css
│   │   └── footer/
│   │       ├── footer.js
│   │       └── footer.css
│   └── repositories/
│       ├── repositories.js
│       └── repositories.css
├── css/
│   ├── style.css          # Centraliza os @import dos estilos
│   ├── reset.css
│   ├── variables.css
│   ├── responsive.css
│   ├── sections/
│   │   ├── sections.css
│   │   ├── homeSection.css
│   │   ├── aboutSection.css
│   │   ├── contactSection.css
│   │   ├── moreOptionsSection.css
│   │   ├── techStackSection.css
│   │   ├── certificationsSection.css
│   │   ├── experienceSection.css
│   │   └── resumeSection.css
├── js/
│   └── script.js
├── assets/
│   ├── docs/
│   │   └── resume.pdf
│   ├── icones/
│   │   └── # (vazio por enquanto, usar para favicon e ícones futuros)
│   └── imgs/
│       ├── progile.jpg
│       ├── progile01.jpg
│       └── certifications/
│           ├── Balta - Fundamentos do Csharp.png
│           ├── Balta - Sites Responsivos.png
│           ├── certificate-alura-gitGithub.png
│           └── certificate-awsAcademy-cloudFoundations.png
```