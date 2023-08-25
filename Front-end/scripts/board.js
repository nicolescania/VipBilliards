


displayGameList()
// GET LIST OF GAMES
async function getGameList() {

    const data = await getRequest(`${URL}/games/list`, `GET`);

    return await data.json()

}



// DISPLAY ALL THE GAMES IN THE SCREEN
async function displayGameList() {

    games = await getGameList()
    //console.log(games)
    games.forEach(async (game) => {
        console.log(game)
        let gameName = game.name



        const row = document.getElementById('row');
        card = document.createElement('div');
        card.classList = "col-4 mb-2";
        card.innerHTML = `      
        <div class="card bg-body-secondary text-center py-4 m-2" id= '${game._id}'> 
        <a  class="text-decoration-none text-dark fs-1 fw-bold p-2 m-2 "  id= '${gameName}' href="javascript:getGame('${game._id}', '${gameName}') "> ${gameName} </a>
   
        
        </div>       
     `;
        verifyGameActive(game._id)

        row.appendChild(card);

    });
}



// VERIFY GAMES ACTIVE

async function verifyGameActive(gameid) {

    getGameActive(gameid)

}


// GET GAME ACTIVE

async function getGameActive(gameId) {

    try {

        bodyInfo = { 'gameId': gameId }
        const response = await getRequest(`${URL}/game/game-active`, `POST`, bodyInfo);
        data = await response.json();

        if (data.gameStatus == true) {
            changeColor(gameId, data.game)

            return {
                status: 'TAKEN',
                isAvailable: false,
                timeStarted: data.gameStarted,
                payment: data.charge
            }
        } if (data.gameStatus == false) {
            changeHoldColor(gameId, data.game)
            return {
                status: 'ON HOLD',
                isAvailable: false,
                timeStarted: data.gameStarted,
                payment: data.charge
            }
        }
        return {
            status: 'AVAILABLE',
            isAvailable: true,

        }

    } catch {
        return "Error en el get";
    }

}



function showModal() {
    var modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    modal.show();
    
}






// GET THE GAME STARTED 
async function getGame(gameid, gameName) {
 
    showModal()
    document.getElementById('gameName').innerHTML = `${gameName}`;

    const data = await getGameActive(gameid)
    console.log(data)
    if (data) {
        document.getElementById('gameInfo').innerHTML = `<p>Table '${gameName}'  '${data.status}'.</p>
        <p>Time Started '${data.timeStarted}' .</p>
        <p> payment '${data.payment}' .</p>
        `;
    }


    myModal = document.getElementById('gameModal').innerHTML = `<a href="javascript:startGame('${gameid}') "> Start </a>`;
    myModal = document.getElementById('holdButtonModal').innerHTML = `<a href="javascript:holdGame('${gameid}') "> Hold </a>`;
    myModal = document.getElementById('resumeButtonModal').innerHTML = `<a href="javascript:resumeGame('${gameid}') "> Resume </a>`;
    myModal = document.getElementById('closeButtonModal').innerHTML = `<a href="javascript:closeGame('${gameid}') "> Close </a>`;
    myModal = document.getElementById('transferModal').innerHTML = `<a href="javascript:TransferModal('${gameid}') "> Transfer </a>`;

  
}


async function TransferModal(gameid) {

  

  

    var modal = new bootstrap.Modal(document.getElementById("transfermodal02"));
    modal.show();
    games = await getGameList()

    const select = document.getElementById('menuSelectionGames');
    select.innerHTML = ''
    games.forEach(async (game) => {

        const data = await getGameActive(game._id)
        if (data.isAvailable == true) {
            let gameName = game.name
            console.log(game)
            select.innerHTML = select.innerHTML + `<option value="${game._id}">${gameName}</option>`;

        }



    });
    document.getElementById('transferGameModal').innerHTML = `<a href="javascript:transferGame('${gameid}') "> Transfer </a>`;

}




// CHANGE GAME COLOR

function changeColor(gameid, gameName) {

    const myDiv = document.getElementById(gameid)
    const text = document.getElementById(gameName)



    // Remove the class
    myDiv.classList.remove("bg-body-secondary");

    // Add the new class
    myDiv.classList.add("bg-info");

    // Remove the class
    text.classList.remove("text-dark");

    // Add the new class
    text.classList.add("text-white");






}


function changeHoldColor(gameid, gameName) {
    const myDiv = document.getElementById(gameid)
    const text = document.getElementById(gameName)


    // Remove the class
    myDiv.classList.remove("bg-body-secondary");

    // Add the new class
    myDiv.classList.add("bg-warning");

    // Remove the class
    text.classList.remove("text-white");

    // Add the new class
    text.classList.add("text-dark");


}


// START GAME
async function startGame(gameId) {
    try {

        bodyInfo = { 'gameId': gameId }
        const response = await getRequest(`${URL}/game/start-game`, `POST`, bodyInfo);
        data = await response.json();

        changeColor(gameId)

        return console.log(data);

    } catch {

    }

}
//CLOSE GAME
async function closeGame(gameId) {
    try {

        bodyInfo = { 'gameId': gameId }
        const response = await getRequest(`${URL}/game/close-game`, `delete`, bodyInfo);
        data = await response.json();

        //changeColor(gameId)

        return console.log(data);

    } catch {

    }

}



// HOLD GAME
async function holdGame(gameId) {
    try {

        bodyInfo = { 'gameId': gameId }
        const response = await getRequest(`${URL}/hold-game`, `POST`, bodyInfo);
        data = await response.json();

        changeHoldColor(gameId)

        return console.log(data);

    } catch {

    }

}


// RESUME GAME
async function resumeGame(gameId) {
    try {

        bodyInfo = { 'gameId': gameId }
        const response = await getRequest(`${URL}/resume-game`, `POST`, bodyInfo);
        data = await response.json();

        changeColor(gameId)

        return console.log(data);

    } catch {

    }

}

// TRANSFER GAME
async function transferGame(gameIdOld) {
    try {

        const gameIdNew = document.getElementById("menuSelectionGames").value

        bodyInfo = { 'gameId01': gameIdOld, 'gameId02': gameIdNew }
        const response = await getRequest(`${URL}/game/transfer-game`, `POST`, bodyInfo);
        data = await response.json();

        changeColor(gameIdNew)

        return console.log(data);

    } catch {
       return console.log('no funciona transfer game func')
    }

}




















