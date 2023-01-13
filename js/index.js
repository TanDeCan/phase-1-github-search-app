document.addEventListener('DOMContentLoaded', () => {
    const userRepo = document.querySelector('#repos-list');
    const gitSearch = document.querySelector('#github-form');

    function findingUser(user){
        const userObject = user.items[0]
        const userContainer = document.querySelector('#user-list')

        const li = document.createElement('li');

        const card = document.createElement('div');

        card.append(li);

        const h3 = document.createElement('h3');
        h3.textContent = userObject.login

        const img = document.createElement('img');
        img.src = userObject.avatar_url;

        const btn = document.createElement('button');
        btn.textContent = 'Repos'

        li.append(h3, img, btn)
        userContainer.appendChild(card)

        btn.addEventListener('click', () => repoGrab(userObject));
            
    }   

    
     gitSearch.addEventListener('submit', update);
     gitSearch.addEventListener('submit', submitForm);
     

    function update(e){
        const username = e.target.search.value
        fetch(`https://api.github.com/search/users?q=${username}`)
        .then(resp => resp.json())
        .then(result=> findingUser(result))
    }

    function submitForm(e){
        e.preventDefault();
        const search = e.target.search.value;
        console.log(search)
    }

    function repoGrab(userObject){
        console.log(userObject)
        console.log(`https://api.github.com/users/${userObject.login}/repos`)
        fetch(`https://api.github.com/users/${userObject.login}/repos`)
        .then(resp => resp.json())
        .then(results => getRepo(results))
    }

    function getRepo(repos){
       repos.forEach((repoObject) => {
        const repoLi = document.createElement('li');
        repoLi.className = 'repo-list';
        repoLi.innerHTML = `<a href=${repoObject.html_url}>${repoObject.name}</a>`
        userRepo.append(repoLi);
       });
    }
})