
const id = 'secret_id'
const sec='Secret'
const params= ''//`?client_id=${id}&client_secret=${sec}`


export function fetchPopularRepos (language) {

    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    return fetch(endpoint)
            .then((res) => res.json())
            .then((data) => {
                if(!data.items) {
                    throw new Error(data.message)
                }

                return data.items
            })
}


export function battle (players) {

    return Promise.all(
        [getUserData(players[0]),
         getUserData(players[1])]).then((result) => sortPlayers(result))
}

function sortPlayers (result) {
    return result.sort((a,b) => b.score - a.score)
}

function getErrorMsg(message,username) {
    return `${username} doesn't exist`
}
function getProfile (username) {
    return fetch(`https://api.github.com/users/${username}${params}`)
            .then( (res) => res.json())
            .then((profile) => {
                if(profile.message) {
                    throw new Error(getErrorMsg(profile.message,username))
                }

                return profile
            })
}

function getRepos (username) {
    return fetch(`https://api.github.com/users/${username}/repos${params}`)
    .then((res) => res.json())
    .then((repos) => {
        if(repos.message) {
            throw new Error(getErrorMsg(repos.message,username))
        }

        return repos
    })
}

function calculateScore (followers, repos) {

    return (followers * 4) + getStarCount(repos)

}

function getStarCount(repos) {
    return repos.reduce( ( count, {stargazers_count}) => count + stargazers_count , 0)
}

function getUserData(player) {
    return Promise.all([getProfile(player), getRepos(player)])
    .then(([profile,repos]) => ({
        profile,
        score: calculateScore(profile.followers, repos)
    }))
}