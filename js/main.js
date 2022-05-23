"use strict";

var pages = 0;

const options = { // Declaração das cahves para RapidAPI
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
		'X-RapidAPI-Key': '03c090ac21msh4e7ac00b13dc67cp13104fjsn56d1012cf8b6'
	}
};

const createCard = data => { // cria o card e coloca a thumbmail
    document.getElementById("games").innerHTML += `
        <a class="card" id="${data.id}" href="${data.game_url}">
            <h1 class="title">${data.title}</h1>
        </a>
    `;
    document.getElementById(data.id).style.backgroundImage = 'url(' + data.thumbnail +')'
}

const requestGames = async (params = "") => { // faz o request dos dados
    const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games${params}`, options);
    return await response.json();
}

const createParams = (tag, platform, sort) => // cria os parametros para busca
    `?platform=${platform}&sort-by=${sort}${tag ? `&category=${tag}`: ``}` 

const createBanner = data => {// altera o banner
    document.getElementById("banner").style.backgroundImage = 'url(' + data.thumbnail.replace("thumbnail.jpg","background.webp") +')';
    document.getElementById("banner").href = data.game_url;
}

const createCards = async (offset = 0,tag = "", platform = "all", sort = "relevance") => {
    const gamesData = await requestGames(createParams(tag, platform, sort));
    if(offset === 0){
        createBanner(gamesData[0]);
        pages=0;
    }
    offset *= 9;
    offset++;
    for (let i = 0; i < 9 && (offset + i < gamesData.length) ; i++) {
        let position = offset + i;
        createCard(gamesData[position]);
    }
    pages++;
}
createCards(0);