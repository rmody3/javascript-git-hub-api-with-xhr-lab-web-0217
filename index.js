function getRepositories() {
  // event.preventDefault()
  let name = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + name + '/repos')
  req.send()
}


function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"'
    const dataRepoName = 'data-repository="' + repo.name + '"'
    return(`
      <li>
        <h2>${repo.name}</h2>
        <a href="${repo.html_url}">${repo.html_url}</a><br>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
      </li>`
          )
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const reponame = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + reponame + '/commits')
  req.send()
}



function displayCommits(){
  const commits = JSON.parse(this.responseText)
  const detailArray = commits.map(commit => {
    const message = commit.commit.message
    const author = commit.commit.author.name
    const login = commit.author.login
    return(`<li>${author}-${login}-${message}</li>`)
  })
  const detailList = `<ul>${detailArray.join(" ")}</ul>`
  document.getElementById("details").innerHTML = detailList
}


function getBranches(el) {
  const reponame = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + reponame + '/branches')
  req.send()
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const detailArray = branches.map(branch => {
    const name = branch.name
    return(`<li>${name}</li>`)
  })
  const detailList = `<ul>${detailArray.join(" ")}</ul>`
  document.getElementById("details").innerHTML = detailList
}
