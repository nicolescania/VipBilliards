


async function getGameList() {

    const data = await getRequest(`${URL}/gameTypes/gamelist`, `GET`);

    return await data.json()

}


console.log(getGameList())



async function displayGameList() {

    games = await getGameList()
    console.log(games)
    games.forEach(game => {
        let gameName = game.name

        const row = document.getElementById('row');
        card = document.createElement('div');
        card.classList = "col-4 mb-2";
        card.innerHTML = `
     
        <div class="card text-center py-4"> 
        <a href="javascript:getGame('${game._id}', '${gameName}')"> ${game.name}</a> 
        </div>       
     `;

        row.appendChild(card);


    });
}


async function getGame(gameid, gameName) {

    document.getElementById('gameName').innerHTML = `${gameName}`;
    document.getElementById('gameModal').innerHTML = `<a href="javascript:startGame('${gameid}')"> Start </a>`;


}



async function startGame(gameId) {


    try {

        bodyInfo = { 'gameId': gameId }
        const response = await getRequest(`${URL}/time/finalcharge`, `POST`, bodyInfo);
        data = await response.json();
        return console.log(data);

    } catch {

    }

}

displayGameList()

//CREAR EL MODAL EN HTML (COPIAR Y PEGAR DESDE LA DOCUMENTACION):
    //A. COLOCARLE ALGUN IDENTIFICADOR A LA ETIQUETA DEL NOMBRE, ID UNICO, CLASE, ETC
    //B. COLOCARLE IDENTIFICADOR A ALGUN DIV

//AL DAR CLICK A LA MESA, LLAMAR UNA FUNCIÓN QUE RECIBA DOS PARAMETROS: GAMEID Y GAMENAME
    //A. LA FUNCION VA A LLAMAR EL IDENTIFICADOR DE LA ETIQUETA DEL NOMBRE Y PONERLE EL NOMBRE DEL JUEGO SELECCIONADO
    //B. AL DIV VACIO, LE VAS A COLOCAR UN INNERHTML CON UN BOTON QUE DIGA "START" Y QUE LLAME LA FUNCION STARTGAME

//ABRIR EL MODAL






       // <a href="javascript:startGame('${game._id}')"> ${game.name}</a> 

