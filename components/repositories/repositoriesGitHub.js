document.addEventListener("DOMContentLoaded", () => {
  const repoList = document.getElementById("repo-list");
  if (!repoList) return;

  const username = "LeonardoDalmazzo";
  const stackFilters = [
    { id: "dotnet", label: "C# / .NET", icon: "fas fa-code", matches: ["c#", "csharp", "dotnet", "net", "aspnet", "aspnetcore", "blazor", "entityframework", "efcore"] },
    { id: "javascript", label: "JavaScript / TypeScript", icon: "fab fa-js", matches: ["javascript", "typescript", "nodejs", "react", "angular", "vue"] },
    { id: "web", label: "HTML / CSS", icon: "fab fa-html5", matches: ["html", "html5", "css", "css3", "scss", "sass"] },
    { id: "dados", label: "SQL / Bancos de dados", icon: "fas fa-database", matches: ["sql", "postgresql", "postgres", "sqlite", "mysql", "sqlserver", "tsql", "plpgsql"] },
    { id: "python", label: "Python", icon: "fab fa-python", matches: ["python", "django", "flask", "fastapi"] },
    { id: "java", label: "Java", icon: "fab fa-java", matches: ["java", "spring", "springboot"] },
    { id: "php", label: "PHP", icon: "fab fa-php", matches: ["php", "laravel"] },
    { id: "c-cpp", label: "C / C++", icon: "fas fa-terminal", matches: ["c", "c++", "cpp"] }
  ];

  function getRepoCategories(repo) {
    const technologies = new Set(getFallbackStack(repo).map(value => value.toLowerCase().replace(/[\s._-]/g, "")));
    const categories = stackFilters
      .filter(filter => filter.matches.some(technology => technologies.has(technology)))
      .map(filter => filter.id);
    return categories.length ? categories : ["outras"];
  }

  function renderFilters() {
    const section = repoList.closest(".showcase-page");
    const controls = section.querySelector("[data-showcase-controls]");
    const buttons = controls.querySelector(".showcase-filters");
    const focusedControl = controls.contains(document.activeElement) ? document.activeElement : null;
    const focusedFilter = focusedControl?.dataset.filter;
    const focusedSelect = focusedControl?.matches(".showcase-select");
    const selectedFilter = buttons.querySelector('[aria-pressed="true"]')?.dataset.filter || "all";
    const categories = new Set(Array.from(repoList.children).flatMap(card => JSON.parse(card.dataset.category || "[]")));
    const available = [
      { id: "all", label: "Todos", icon: "fas fa-layer-group" },
      ...stackFilters.filter(filter => categories.has(filter.id)),
      ...(categories.has("outras") ? [{ id: "outras", label: "Outras stacks", icon: "fas fa-cubes" }] : [])
    ];
    buttons.replaceChildren();
    controls.querySelector(".showcase-select")?.remove();
    available.forEach(filter => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "filter-btn";
      button.classList.toggle("active", filter.id === selectedFilter);
      button.dataset.filter = filter.id;
      const label = document.createElement("span");
      label.dataset.filterLabel = "";
      label.textContent = filter.label;
      button.append(createIcon(filter.icon), label);
      buttons.appendChild(button);
    });
    controls.hidden = false;
    window.ShowcaseFilters.init(repoList);
    if (focusedSelect) controls.querySelector(".showcase-select").focus();
    if (focusedFilter) buttons.querySelector(`[data-filter="${focusedFilter}"]`)?.focus();
  }
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
      language: "C#",
      private: true,
      fork: false,
      updated_at: "2026-07-04T00:00:00Z",
      stack: ["C#", "ASP.NET Core", "Blazor", "EF Core", "PostgreSQL", "Identity", "Docker"]
    },
    {
      name: "ControleAcessoDER",
      full_name: "LeonardoDalmazzo/ControleAcessoDER",
      display_name: "LeonardoDalmazzo/ControleAcessoDER",
      description: "Controle de entrada, sa\u00edda e almo\u00e7o para funcion\u00e1rios e terceiros no Departamento de Estradas de Rodagem - 10\u00aa Coordenadoria Geral Regional de S\u00e3o Paulo CGR-10.",
      html_url: "https://github.com/LeonardoDalmazzo/ControleAcessoDER",
      homepage: "",
      language: "C#",
      private: true,
      fork: false,
      updated_at: "2026-07-04T00:00:00Z",
      stack: ["C#", "ASP.NET Core", "Blazor", "EF Core", "SQLite"]
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
      language: "C#",
      private: true,
      fork: false,
      updated_at: "2026-05-18T00:00:00Z",
      stack: ["C#", "ASP.NET Core", "Blazor", "EF Core", "SQLite", "Identity"]
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
      .map(item => String(item));
  }

  function getLanguageStack(languages) {
    return Object.entries(languages)
      .sort(([, currentBytes], [, nextBytes]) => nextBytes - currentBytes)
      .map(([language]) => language);
  }

  async function hydrateRepoStack(repo) {
    if (repo.private || !repo.languages_url) {
      return repo;
    }

    try {
      const response = await fetch(repo.languages_url, { signal: AbortSignal.timeout(8000) });

      if (!response.ok) {
        throw new Error(`GitHub Languages respondeu com status ${response.status}`);
      }

      const languages = await response.json();
      const languageStack = getLanguageStack(languages);

      return {
        ...repo,
        stack: [...new Set([...repo.stack, ...languageStack])]
      };
    } catch (error) {
      return { ...repo, stackIncomplete: true };
    }
  }

  function normalizeRepo(repo) {
    const override = repositoryOverrides[repo.full_name] || {};

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
    repoList.className = "showcase-grid repo-grid";
    repoList.innerHTML = "";

    const empty = document.createElement("p");
    empty.className = "repo-empty";
    empty.textContent = message;
    repoList.appendChild(empty);
  }

  function renderRepos(repos) {
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

    repoList.replaceChildren();
    visibleRepos.forEach((repo) => {
      const card = document.createElement("article");
      card.className = "showcase-card repo-card";
      card.dataset.category = JSON.stringify(getRepoCategories(repo));

      const body = document.createElement("div");
      body.className = "repo-card__body";

      const eyebrow = document.createElement("div");
      eyebrow.className = "repo-card__eyebrow";
      eyebrow.appendChild(createIcon("fab fa-github"));
      eyebrow.appendChild(document.createTextNode(repo.private ? "Privado" : "P\u00fablico"));

      const title = document.createElement("h3");
      title.textContent = repo.name;

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

    renderFilters();
    repoList.setAttribute("aria-busy", "false");

    if (!repoList.children.length) {
      renderEmptyState("Nenhum reposit\u00f3rio ou projeto encontrado no momento.");
    }
  }

  async function loadRepos() {
    // Curated projects remain useful while the public list is loading.
    renderRepos([]);
    const notice = document.querySelector("[data-repo-notice]");
    try {
      const repos = [];
      let page = 1;
      while (true) {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated&page=${page}`, {
          signal: AbortSignal.timeout(8000)
        });
        if (!response.ok) throw new Error(`GitHub: ${response.status}`);
        const batch = await response.json();
        if (!Array.isArray(batch)) throw new Error("Resposta inesperada do GitHub.");
        repos.push(...batch);
        if (batch.length < 100) break;
        page += 1;
      }
      const normalized = repos.filter(repo => !repo.fork).map(normalizeRepo);
      renderRepos(normalized);
      // Limit concurrent requests when enriching language metadata.
      const hydrated = [];
      let cursor = 0;
      await Promise.all(Array.from({ length: Math.min(4, normalized.length) }, async () => {
        while (cursor < normalized.length) {
          const repo = normalized[cursor++];
          hydrated.push(await hydrateRepoStack(repo));
        }
      }));
      renderRepos(hydrated);
      if (hydrated.some(repo => repo.stackIncomplete)) {
        notice.textContent = "Algumas stacks usam os dados resumidos do GitHub; a lista completa de linguagens está temporariamente indisponível.";
        notice.hidden = false;
      }
    } catch {
      // Keep the repositories already rendered when GitHub is unavailable.
    }
  }

  loadRepos();
});
