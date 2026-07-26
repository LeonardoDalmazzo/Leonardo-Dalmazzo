document.addEventListener("DOMContentLoaded", () => {
  const repoList = document.getElementById("repo-list");
  if (!repoList) return;

  const username = "LeonardoDalmazzo";
  const featuredPrivateRepos = [
    {
      name: "CDD-COR-SP",
      full_name: "LeonardoDalmazzo/CDD-COR-SP",
      display_name: "LeonardoDalmazzo/CDD-COR-SP",
      description: "CDD/COR-SP (Controle de Documentos / Cons\u00f3rcio Opera\u00e7\u00e3o Rodo-SP) * CNPJ 61.304.104/0001-84",
      html_url: "https://github.com/LeonardoDalmazzo/CDD-COR-SP",
      homepage: "",
      language: "HTML",
      private: true,
      fork: false,
      updated_at: "2026-07-16T00:00:00Z",
      stack: ["HTML"]
    },
    {
      name: "LocTubo",
      full_name: "LeonardoDalmazzo/LocTubo",
      display_name: "LeonardoDalmazzo/LocTubo",
      description: "Loca\u00e7\u00e3o de equipamentos para constru\u00e7\u00e3o civil em S\u00e3o Paulo.",
      html_url: "https://github.com/LeonardoDalmazzo/LocTubo",
      homepage: "https://www.loctubo.com.br/",
      language: "JavaScript",
      private: true,
      fork: false,
      updated_at: "2026-07-11T00:00:00Z",
      stack: ["JavaScript", "HTML", "CSS"]
    },
    {
      name: "Podologia-para-todos",
      full_name: "LeonardoDalmazzo/Podologia-para-todos",
      display_name: "LeonardoDalmazzo/Podologia-para-todos",
      description: "Projeto social para o curso de podologia no SENAC.",
      html_url: "https://github.com/LeonardoDalmazzo/Podologia-para-todos",
      homepage: "",
      language: "HTML",
      private: true,
      fork: false,
      updated_at: "2026-07-04T00:00:00Z",
      stack: ["HTML", "CSS", "JavaScript"]
    },
    {
      name: "ControleAcessoDER",
      full_name: "LeonardoDalmazzo/ControleAcessoDER",
      display_name: "LeonardoDalmazzo/ControleAcessoDER",
      description: "Controle de entrada, sa\u00edda e almo\u00e7o para funcion\u00e1rios e terceiros no Departamento de Estradas de Rodagem - 10\u00aa Coordenadoria Geral Regional de S\u00e3o Paulo CGR-10.",
      html_url: "https://github.com/LeonardoDalmazzo/ControleAcessoDER",
      homepage: "",
      language: "HTML",
      private: true,
      fork: false,
      updated_at: "2026-07-04T00:00:00Z",
      stack: ["HTML", "CSS", "JavaScript"]
    },
    {
      name: "3Finances",
      full_name: "LeonardoDalmazzo/3Finances",
      display_name: "LeonardoDalmazzo/3Finances",
      description: "Sistema financeiro web com autentica\u00e7\u00e3o, rotas protegidas e publica\u00e7\u00e3o em Render.",
      html_url: "https://github.com/LeonardoDalmazzo/3Finances",
      homepage: "https://threefinances.onrender.com/Account/Login?ReturnUrl=%2F",
      language: "C#",
      private: true,
      fork: false,
      updated_at: "2026-05-18T00:00:00Z",
      stack: ["C#", "ASP.NET Core", "Blazor", "Entity Framework", "Identity", "PostgreSQL", "Render"]
    },
    {
      name: "der-cgr10-inventario-patrimonial",
      full_name: "LeonardoDalmazzo/der-cgr10-inventario-patrimonial",
      display_name: "LeonardoDalmazzo/der-cgr10-inventario-patrimonial",
      description: "Sistema web em Blazor para cadastro, gest\u00e3o, visualiza\u00e7\u00e3o e relat\u00f3rios de patrim\u00f4nio do DER - 10\u00aa Coordenadoria Geral Regional de S\u00e3o Paulo (CGR-10), com autentica\u00e7\u00e3o, perfis de acesso e auditoria.",
      html_url: "https://github.com/LeonardoDalmazzo/der-cgr10-inventario-patrimonial",
      homepage: "",
      language: "",
      private: true,
      fork: false,
      updated_at: "2026-05-18T00:00:00Z",
      stack: ["HTML", "C#", "CSS", "JavaScript"]
    },
    {
      name: "ARYA",
      full_name: "LeonardoDalmazzo/ARYA",
      display_name: "LeonardoDalmazzo/ARYA",
      description: "Controle de estoque e OS.",
      html_url: "https://github.com/LeonardoDalmazzo/ARYA",
      homepage: "",
      language: "",
      private: true,
      fork: false,
      updated_at: "2026-05-18T00:00:00Z",
      stack: ["CSS", "HTML", "C#", "JavaScript"]
    },
    {
      name: "The-Oficina-System",
      full_name: "aryamecanica/The-Oficina-System",
      display_name: "aryamecanica/The-Oficina-System",
      description: "CRM + ERP para Oficinas de Motos.",
      html_url: "https://github.com/aryamecanica/The-Oficina-System",
      homepage: "https://the-oficina-system.onrender.com/",
      language: "HTML",
      private: true,
      fork: false,
      updated_at: "2026-05-18T00:00:00Z",
      stack: ["HTML", "C#", "CSS", "Other"]
    }
  ];
  const repositoryOverrides = featuredPrivateRepos.reduce((overrides, repo) => {
    overrides[repo.full_name] = repo;
    overrides[repo.name] = repo;
    return overrides;
  }, {});
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  function createIcon(className) {
    const icon = document.createElement("i");
    icon.className = className;
    icon.setAttribute("aria-hidden", "true");
    return icon;
  }

  function createMetaItem(iconClass, label, value) {
    const item = document.createElement("li");
    item.appendChild(createIcon(iconClass));
    item.appendChild(document.createTextNode(`${label}: ${value}`));
    return item;
  }

  function createStackList(stackItems) {
    const stack = document.createElement("div");
    stack.className = "repo-stack";

    const label = document.createElement("span");
    label.className = "repo-stack__label";
    label.textContent = "Stack";

    const list = document.createElement("ul");
    list.className = "repo-stack__list";

    stackItems.forEach((item) => {
      const stackItem = document.createElement("li");
      stackItem.className = "repo-stack__item";
      stackItem.textContent = item;
      list.appendChild(stackItem);
    });

    stack.appendChild(label);
    stack.appendChild(list);
    return stack;
  }

  function createRepoLink(href, iconClass, label, modifierClass) {
    const link = document.createElement("a");
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = modifierClass ? `repo-link ${modifierClass}` : "repo-link";
    link.appendChild(createIcon(iconClass));
    link.appendChild(document.createTextNode(label));
    return link;
  }

  function createPrivateCodeNote() {
    const note = document.createElement("span");
    note.className = "repo-link repo-link--disabled";
    note.setAttribute("aria-label", "C\u00f3digo privado");
    note.appendChild(createIcon("fas fa-lock"));
    note.appendChild(document.createTextNode("C\u00f3digo privado"));
    return note;
  }

  function getFallbackStack(repo) {
    const stack = [
      ...(repo.stack || []),
      repo.language,
      ...(repo.topics || [])
    ];

    return [...new Set(stack.filter(Boolean))]
      .map(item => String(item).replace(/-/g, " "))
      .slice(0, 7);
  }

  function getLanguageStack(languages) {
    return Object.entries(languages)
      .sort(([, currentBytes], [, nextBytes]) => nextBytes - currentBytes)
      .map(([language]) => language)
      .slice(0, 7);
  }

  async function hydrateRepoStack(repo) {
    if (repo.private || !repo.languages_url) {
      return repo;
    }

    try {
      const response = await fetch(repo.languages_url);

      if (!response.ok) {
        throw new Error(`GitHub Languages respondeu com status ${response.status}`);
      }

      const languages = await response.json();
      const languageStack = getLanguageStack(languages);

      return {
        ...repo,
        stack: languageStack.length ? languageStack : repo.stack
      };
    } catch (error) {
      console.error(`Falha ao carregar stack de ${repo.full_name || repo.name}:`, error);
      return repo;
    }
  }

  function normalizeRepo(repo) {
    const override = repositoryOverrides[repo.full_name] || repositoryOverrides[repo.name] || {};

    return {
      ...repo,
      ...override,
      homepage: override.homepage || repo.homepage,
      html_url: override.html_url || repo.html_url,
      stack: getFallbackStack({ ...repo, ...override }),
      canViewCode: !(override.private ?? repo.private)
    };
  }

  function renderEmptyState(message) {
    repoList.className = "repo-grid";
    repoList.innerHTML = "";

    const empty = document.createElement("p");
    empty.className = "repo-empty";
    empty.textContent = message;
    repoList.appendChild(empty);
  }

  async function renderRepos(repos) {
    repoList.innerHTML = "";

    const allRepos = [...featuredPrivateRepos, ...repos]
      .map(normalizeRepo)
      .reduce((uniqueRepos, repo) => {
        const key = repo.full_name || repo.name;

        if (!uniqueRepos.some(item => (item.full_name || item.name) === key)) {
          uniqueRepos.push(repo);
        }

        return uniqueRepos;
      }, []);

    const visibleRepos = allRepos
      .filter(repo => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    const hydratedRepos = await Promise.all(visibleRepos.map(hydrateRepoStack));

    hydratedRepos.forEach((repo, index) => {
        const card = document.createElement("article");
        card.className = "repo-card";
        card.setAttribute("data-aos", "fade-up");
        card.setAttribute("data-aos-delay", `${Math.min(index * 60, 360)}`);

        const body = document.createElement("div");
        body.className = "repo-card__body";

        const eyebrow = document.createElement("div");
        eyebrow.className = "repo-card__eyebrow";
        eyebrow.appendChild(createIcon("fab fa-github"));
        eyebrow.appendChild(document.createTextNode(repo.private ? "Privado" : "P\u00fablico"));

        const title = document.createElement("h3");
        title.textContent = repo.display_name || repo.name;

        const description = document.createElement("p");
        description.textContent = repo.description || "Reposit\u00f3rio sem descri\u00e7\u00e3o publicada no GitHub.";

        const meta = document.createElement("ul");
        meta.className = "repo-meta";
        meta.appendChild(createMetaItem("fas fa-clock", "Atualizado", formatter.format(new Date(repo.updated_at))));

        const linksContainer = document.createElement("div");
        linksContainer.className = "repo-links";

        if (repo.canViewCode) {
          linksContainer.appendChild(createRepoLink(repo.html_url, "fab fa-github", "C\u00f3digo", ""));
        } else {
          linksContainer.appendChild(createPrivateCodeNote());
        }

        if (repo.homepage && /^https?:\/\//.test(repo.homepage)) {
          linksContainer.appendChild(createRepoLink(repo.homepage, "fas fa-arrow-up-right-from-square", "Site", "repo-link--secondary"));
        }

        body.appendChild(eyebrow);
        body.appendChild(title);
        body.appendChild(description);
        body.appendChild(createStackList(repo.stack.length ? repo.stack : ["Geral"]));
        body.appendChild(meta);
        card.appendChild(body);
        card.appendChild(linksContainer);
        repoList.appendChild(card);
      });

    if (!repoList.children.length) {
      renderEmptyState("Nenhum reposit\u00f3rio ou projeto encontrado no momento.");
    }
  }

  fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`GitHub API respondeu com status ${response.status}`);
      }

      return response.json();
    })
    .then(repos => {
      if (!Array.isArray(repos)) {
        throw new Error("Resposta inesperada da API do GitHub.");
      }

      renderRepos(repos);
    })
    .catch(error => {
      console.error("Falha ao carregar reposit\u00f3rios:", error);
      renderRepos([]);
    });
});
