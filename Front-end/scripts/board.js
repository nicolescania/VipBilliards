


// GET LIST OF GAMES
async function getGameList() {

    const data = await getRequest(`${URL}/games/list`, `GET`);

    return await data.json()

}



// DISPLAY ALL THE GAMES IN THE SCREEN
async function displayGameList() {
 
    games = await getGameList()
    //console.log(games)
    games.forEach(game => {
         console.log(game)
        let gameName = game.name

        const row = document.getElementById('row');
        card = document.createElement('div');
        card.classList = "col-4 mb-2";
        card.innerHTML = `      
        <div class="card bg-body-secondary text-center py-4 m-2" id= '${game._id}'> 
        <a  class="text-decoration-none text-dark fs-1 fw-bold p-2 m-2 "  id= '${gameName}' href="javascript:getGame('${game._id}', '${gameName}') "> ${gameName} </a> 
        <a  class="text-decoration-none"  id= 'disponibilidad' > AVAILABLE </a>
        
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



// GET THE GAME STARTED 
async function getGame(gameid, gameName) {
    const result = await getGameActive(gameid)
    document.getElementById('gameInfo').innerHTML =  `<p>Table '${gameName}'  '${result.status}' .</p>`;
    document.getElementById('gameName').innerHTML = `${gameName}`;
    myModal = document.getElementById('gameModal').innerHTML = `<a href="javascript:startGame('${gameid}') "> Start </a>`;
    myModal = document.getElementById('holdButtonModal').innerHTML = `<a href="javascript:holdGame('${gameid}') "> Hold </a>`;
    myModal = document.getElementById('resumeButtonModal').innerHTML = `<a href="javascript:resumeGame('${gameid}') "> Resume </a>`;
    myModal = document.getElementById('closeButtonModal').innerHTML = `<a href="javascript:closeGame('${gameid}') "> Close </a>`;
    myModal = document.getElementById('transferModal').innerHTML = `<a href="javascript:TransferModal() "> Transfer </a>`;

 
  
}


async function TransferModal(){
        
 
    games = await getGameList()

    games.forEach( async (game) => {
      
        const result = await getGameActive(game._id)
        
      if   (  result.isAvailable == true )
      {


        let gameName = game.name
        console.log(game)


        const select = document.getElementById('menuSelectionGames');
        option = document.createElement('option');
        //option.classList = "col-4 mb-2";
        option.innerHTML = `  
        <option value="1">${gameName}</option>
 
    
     `;

        select.appendChild(option);

            
      }
  
 
   // myModal = document.getElementById('transferModal').innerHTML = `<a href="javascript:transferGame('${gameid}') "> Close </a>`;
   // document.getElementById('gameavailable').innerHTML = `${gameName}`;

});
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


function changeHoldColor(gameid, gameName)
{
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
async function transferGame(gameIdOld,gameIdNew ) {
    try {

        bodyInfo = { 'gameId01': gameIdOld, 'gameId02': gameIdNew  }
        const response = await getRequest(`${URL}/game/transfer-game`, `POST`, bodyInfo);
        data = await response.json();

        changeColor(gameId)

        return console.log(data);

    } catch {

    }

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
                isAvailable: false
               }
        }if(data.gameStatus == false) {
            changeHoldColor(gameId,data.game) 
            return {
                status: 'ON HOLD',
                isAvailable: false
               }
        } 
            return {
                status: 'AVAILABLE',
                isAvailable: true
               }

    } catch {

    }

}






displayGameList()








// Get the div element by its ID
const myDiv = document.getElementById("mydiv");

// Add a click event listener to the div element
myDiv.addEventListener("click", function () {
    // Change the background color of the div when it's clicked
    myDiv.innerHTML = `
     
  <div class="card bg-black text-center py-4"> 

  </div>       

// `

    // Save the change to local storage
    localStorage.setItem('myChange', 'Your changed value');

    // Retrieve the change from local storage
    const myChange = localStorage.getItem('myChange');
    console.log(myChange); // Output: Your changed value



});

