


displayGameList()
// GET LIST OF GAMES
async function getGameList() {

    const data = await getRequest(`${URL}/games/list`, `GET`);

    return await data.json()

}



// DISPLAY ALL THE GAMES IN THE SCREEN
async function displayGameList() {

    games = await getGameList()

    games.forEach(async (game) => {

        let gameName = game.name

        //const data = await getGameActive(game._id)
        //    console.log(data.status)



        const row = document.getElementById('row');
        card = document.createElement('div');
        card.classList = "col-4 mb-2";

        card.innerHTML = `      
        <div class="card bg-body-secondary text-center  " id= '${game._id}'> 
        <a  class="text-decoration-none text-dark fs-1 fw-bold gamesNumbers  text-center card-text p-4"  id= '${gameName}' href="javascript:getGame('${game._id}', '${gameName}') "> ${gameName}   </a>
       
   
        
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

function hideModal() {
    var modal = new bootstrap.Modal(document.getElementById("exampleModal"));

    modal.hide();
}

//


// GET THE GAME STARTED 
async function getGame(gameid, gameName) {

    showModal()

    const data = await getGameActive(gameid)
 
    
   if (data.status == 'AVAILABLE') {
     
       myModal= document.getElementById('modalButtons').innerHTML = `<a class= "bg-info text-decoration-none text-dark fw-bold py-2 px-4 m-2 rounded-3" href="javascript:startGame('${gameid}') "> Start </a>`;

       document.getElementById('gameName').innerHTML = `
        
       <div class="row">
       <div class="col-6">
             <p class="fs-3 fw-bold"> Table ${gameName}</p>
       </div>
       <div class="col-6">
             <p class="fs-3 ">  ${data.status}</p>
       </div>
     
     </div>
       
  
       
       `

    } if (data.status == 'ON HOLD') {
        myModal = document.getElementById('modalButtons').innerHTML = `<a class= "bg-info text-decoration-none text-dark fw-bold py-2 px-4 m-2 rounded-3" href="javascript:resumeGame('${gameid}') "> Resume </a>`;

        document.getElementById('gameName').innerHTML = `
        
        <div class="row">
        <div class="col-6">
              <p class="fs-3 fw-bold"> Table ${gameName}</p>
        </div>
        <div class="col-6">
              <p class="fs-3 text-warning">  ${data.status}</p>
        </div>
      
      </div>
       
        
        `
 
    } if (data.status == 'TAKEN') {
        myModal = document.getElementById('modalButtons').innerHTML = `
        <a class= "bg-warning text-decoration-none text-dark fw-bold py-2 px-4 m-2 rounded-3" href="javascript:holdGame('${gameid}') "> Hold </a>
        <a class= "bg-dark-subtle text-decoration-none text-dark fw-bold py-2 px-4 m-2 rounded-3" href="javascript:TransferModal('${gameid}') "> Transfer </a>
         <a class= "bg-danger text-decoration-none text-white py-2 px-4 m-2 rounded-3" href="javascript:closeGame('${gameid}') "> Stop </a>
         
         `
         document.getElementById('gameName').innerHTML = `
        
         <div class="row">
         <div class="col-6">
               <p class="fs-3 fw-bold"> Table ${gameName}</p>
         </div>
         <div class="col-6">
               <p class="fs-3 text-info">  ${data.status}</p>
         </div>
       
       </div>
        
         
         `
         document.getElementById('gameInfo').innerHTML = `
         
         <div class="row">

         <div class="col">
         <p class="text-left mx-5 fw-bold" >Time Started:    </p>
         </div>

         <div class="col">
         <p class="text-right mx-2 fw-bold" >   ${data.timeStarted} </p>
         </div>

       </div>

       <div class="row">
         
       <div class="col mx-2">
       <p class="text-left mx-5 fw-bold">Payment</p>
       </div>

       <div class="col mx-2">
       <p class="text-right text-center mx-5 fw-bold">CAD$${data.payment} </p>
       </div>

     </div>
         
         
        `;
 
 
    }

    if (showModal() == true)
    {
        hideModal()

    }





}



function showStartButton(gameid) {
    document.getElementById('startGameModal').innerHTML = `<a href="javascript:startGame('${gameid}') "> Start </a>`;

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

        getGameActive(gameId)

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

        getGameActive(gameId)

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
        getGameActive(gameId)
     

        return console.log(data);

    } catch {
        return console.log("hold game does not work")
    }

}


// RESUME GAME
async function resumeGame(gameId) {
    try {

        bodyInfo = { 'gameId': gameId }
        const response = await getRequest(`${URL}/resume-game`, `POST`, bodyInfo);
        data = await response.json();
        getGameActive(gameId)
  

        return console.log(data);

    } catch {
        return console.log("resume game does not work")

    }

}

// TRANSFER GAME
async function transferGame(gameIdOld) {
    try {

        const gameIdNew = document.getElementById("menuSelectionGames").value

        bodyInfo = { 'gameId01': gameIdOld, 'gameId02': gameIdNew }
        const response = await getRequest(`${URL}/game/transfer-game`, `POST`, bodyInfo);
        data = await response.json();

        getGameActive(gameIdNew)

        return console.log(data);

    } catch {
        return console.log('no funciona transfer game func')
    }

}






// // Assuming you have an HTML element with an ID
// let refreshButton = document.getElementById("mainContainer");

// refreshButton.addEventListener("click", function() {
//     location.reload(); // Reload the page
// });













