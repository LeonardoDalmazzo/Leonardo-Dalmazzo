document.addEventListener("DOMContentLoaded", () => {
  const repoList = document.getElementById("repo-list");

  const username = "LeonardoDalmazzo";

  fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then(response => response.json())
    .then(repos => {
      // Optional: sort by most recently updated
      repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

      repos.forEach((repo, index) => {
        const card = document.createElement("div");
        card.className = "repo-card";
        card.setAttribute("data-aos", "fade-up");
        card.setAttribute("data-aos-delay", `${index * 100}`);

        const title = document.createElement("h3");
        title.textContent = repo.name;

        const description = document.createElement("p");
        description.textContent = repo.description || "No description available.";

        const linksContainer = document.createElement("div");
        linksContainer.className = "repo-links";

        const githubLink = document.createElement("a");
        githubLink.href = repo.html_url;
        githubLink.target = "_blank";
        githubLink.className = "btn-glow-bounce";
        githubLink.innerHTML = `<i class="fab fa-github"></i> View on GitHub`;

        linksContainer.appendChild(githubLink);

        if (repo.homepage) {
          const liveLink = document.createElement("a");
          liveLink.href = repo.homepage;
          liveLink.target = "_blank";
          liveLink.className = "btn-glow-bounce";
          liveLink.innerHTML = `<i class="fas fa-globe"></i> GitHub Pages`;
          linksContainer.appendChild(liveLink);
        }

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(linksContainer);
        repoList.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Failed to load repositories:", error);
      repoList.innerHTML = "<p>Unable to load repositories at this time.</p>";
    });
});
