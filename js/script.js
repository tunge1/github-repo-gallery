//This div is where your profile information will appear//
const overview = document.querySelector(".overview");
const username = "tunge1";
const repoList = document.querySelector("ul");
const individualRepo = document.querySelector(".repos");
const individualData = document.querySelector(".repo-data");
const backToButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const profileData =  async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    display(data);
};

profileData();

const display = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
     <figure>
       <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overview.append(div);
    displayRepos(username);
};

const displayRepos = async function (username) {
    const ris = await fetch(`https://api.github.com/users/${username}/repos?sort=updated?per_page=100`);
    const repoData = await ris.json();
    displayInformation(repoData);
};

const displayInformation= function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add(".repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    };
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepo(repoName);
    }
});

const specificRepo = async function (repoName) {
    const rus = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await rus.json();

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    };
    specificRepoInformation(repoInfo, languages);
};

const specificRepoInformation = function (repoInfo, languages) {
    backToButton.classList.remove("hide");
    individualData.innerHTML = "";
    individualData.classList.remove("hide");
    individualRepo.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages.join(", ")}</p>
      <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    individualData.append(div);
};

backToButton.addEventListener("click", function (e) {
    individualRepo.classList.remove("hide");
    individualData.classList.add("hide");
    backToButton.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
    const search = e.target.value;
    const repos = document.querySelectorAll("li");
    console.log(repos);
    const lowercase = search.toLowerCase();
    for (const repo of repos) {
        const lowercaseValue = repo.innerText.toLowerCase();
        if (lowercaseValue.includes(lowercase)) {
        repo.classList.remove("hide");
        } else {
        repo.classList.add("hide");
        }
    }
});