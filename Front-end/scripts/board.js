


async function getGameList() {

    const data = await getRequest(`${URL}/gameTypes/gamelist`, `GET`);

    return await data.json()

}


console.log(getGameList())



async function displayGameList() {

    games = await getGameList()
    console.log(games)
    games.forEach(game => {

        const row = document.getElementById('row');
        card = document.createElement('div');
        card.classList = "col-4 mb-2";
        card.innerHTML = `
        <div class="card text-center py-4"> ${game.name}</div>      
    `;

        row.appendChild(card);


    });
}


    async function getGameId() {
     
    }



async function startGame() {
    games = await getGameList()
    
    games.forEach(game => {
        gameId = game._id
       return  gameId
    
    })

    try {

        bodyInfo = { 'gameId': gameId }
        const response = await getRequest(`${URL}/time/finalcharge`, `POST`, bodyInfo);
        data = await response.json();
        return console.log(data);

    } catch {

    }

}

startGame()

async function initialGame() {
    alert(startGame)
}


const container = document.getElementById("container");
container.addEventListener("click", initialGame);





displayGameList()


