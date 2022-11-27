//This div is where your profile information will appear//
const overview = document.querySelector(".overview");
const repoList = document.querySelector("ul");
const username = "tunge1";

const profileData =  async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    display(data);
};

profileData();

const display = function (data) {
    const div = document.createElement("div");
    div.classList.add(".user-info");
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
    displayRepos();
};

const displayRepos = async function () {
    const ris = await fetch(`https://api.github.com/users/${username}/repos?sort=updated?per_page=100`);
    const repoData = await ris.json();
    repoInfo(repoData);
};

const repoInfo = function (repos) {
    for (const  repo of repos) {
        const li = document.createElement("li");
        li.classList.add(".repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    };
};


