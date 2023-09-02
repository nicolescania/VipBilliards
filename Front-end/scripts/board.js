


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

        console.log(game)



        const row = document.getElementById('row');
        card = document.createElement('div');
        card.classList = "col-4 mb-2";

        card.innerHTML = `      
        <div class="card bg-body-secondary text-center  " id= '${game._id}'> 
        <a  class="text-decoration-none text-dark  fw-bold gamesNumbers text-center card-texttiene px-0" style="font-size: 6.25rem"  id= 'link_container_${game._id}' href="javascript:getGame('${game._id}', '${gameName}') "> ${gameName}   </a>
        <p class="${game._id}"> </p>
        
        
        </div>       
     `;
        row.appendChild(card);
        const data = await getGameActive(game._id, game.name)
        //verifyGameActive(game._id)

      // setStatus(game._id, data.status )


    });
}

function setStatus(gameId, statusName){

    pStatus = document.getElementsByClassName(gameId)
    pStatus[0].innerHTML = statusName

}



// VERIFY GAMES ACTIVE

async function verifyGameActive(gameid) {

    getGameActive(gameid)

}


// GET GAME ACTIVE

async function getGameActive(gameId, name=null) {


    try {

        bodyInfo = { 'gameId': gameId }
        const response = await getRequest(`${URL}/game/game-active`, `POST`, bodyInfo);
        data = await response.json();
       

        if (data.gameStatus == true) {
            changeHoldColor2(gameId, gameId, "bg-info", "text-white")


            gameInfo = {
                status: 'TAKEN',
                isAvailable: false,
                timeStarted: data.gameStarted,
                payment: data.charge,
                holdTimeStarted: data.holdTimeStarted,
                timePlaying: data.timePlaying,
                timeOnHold:data.holdTime,
                amount: data.charge
            }
        }
            
        if (data.gameStatus == false) {
            changeHoldColor2(gameId, gameId, "bg-warning", "text-dark")
           
            gameInfo = {
                status: 'ON HOLD',
                isAvailable: false,
                timeStarted: data.gameStarted,
                payment: data.charge,
                holdTimeStarted: data.holdTimeStarted,
                timePlaying: data.timePlaying,
                timeOnHold:data.holdTime,
                amount: data.charge
            }
        }
       
        if(data.gameActiveExist == false){
            changeHoldColor2(gameId, gameId, "bg-body-secondary", "text-dark")
       
            gameInfo = {
            
                status: 'AVAILABLE',
                isAvailable: true,

            }
        }


        setStatus(gameId, gameInfo.status)
        return gameInfo;
        

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
    document.getElementById('gameInfo').innerHTML = ''
     
       myModal= document.getElementById('modalButtons').innerHTML = `

       <div class="row">
       <div class="col">
       <a class= "bg-success text-uppercase text-decoration-none text-white fw-bold py-2 px-5 m-2 rounded-3" href="javascript:startGameByMinute('${gameid}') "> Start (Min) </a>
       <a class= "bg-success text-uppercase text-decoration-none text-white fw-bold py-2 px-5 m-2 rounded-3" href="javascript:startGame('${gameid}') "> Start </a>


       </div>
 
    
       
`;

       document.getElementById('gameName').innerHTML = `
        
       <div>
       <p class=" fw-bold text-uppercase" style="font-size: 3.50rem"> Table ${gameName} <span class= "text-success"> ${data.status} </span> </p>

    
   
   
     
     </div>
       
  
       
       `

    } if (data.status == 'ON HOLD') {
        

        document.getElementById('gameInfo').innerHTML = `
        
        <div class="row">
        <div class="col-6">
        <p class="text-start fs-4 ms-5  ps-5"  >Started:  </p>
        </div>
        <div class="col-6">
        <p class="text-end fs-4 me-5 pe-5  " >  ${data.timeStarted}  </p>

        </div>      
         </div>
         <div class="row">
         <div class="col-6">
         <p class="text-start fs-4 ms-5  ps-5"  >Time:  </p>
         </div>
         <div class="col-6">
         <p class="text-end fs-4 me-5 pe-5" >  ${data.timePlaying}  </p>
 
         </div>      
          </div>

          <div class="row">
          <div class="col-6">
          <p class="text-start fs-4 ms-5  ps-5"  >Time on hold:  </p>
          </div>
          <div class="col-6">
          <p class="text-end fs-4 me-5 pe-5" >  ${data.timeOnHold}  </p>
  
          </div>      
           </div>
   

           <div class="row">
           <div class="col-6">
           <p class="text-start fs-4 ms-5  ps-5"  >Amount:  </p>
           </div>
           <div class="col-6">
           <p class="text-end fs-4 me-5 pe-5" >  CAD${data.amount}  </p>
   
           </div>      
            </div>
        `

        myModal = document.getElementById('modalButtons').innerHTML = `




        <a class= "bg-info text-uppercase text-decoration-none text-white fw-bold btn btn-lg py-2 px-5 mx-3 rounded-3" href="javascript:resumeGame('${gameid}') "> Resume </a>
     
        <a class= "bg-danger text-uppercase text-decoration-none text-white fw-bold btn btn-lg py-2 px-5 mx-3 rounded-3" href="javascript:closeFreeGame('${gameid}') ">  FREE close </a>

       

        `;

        document.getElementById('gameName').innerHTML = `
        
        <div>
    
        <p class=" fw-bold text-uppercase" style="font-size: 3.50rem"> Table ${gameName} <span class= "text-warning"> ${data.status} </span> </p>



</div>
       
       
        
        `
 
    } if (data.status == 'TAKEN') {
        myModal = document.getElementById('modalButtons').innerHTML = `
        <a class= "btn btn-lg text-uppercase bg-warning text-decoration-none text-dark fw-bold py-2 px-5 mx-4 rounded-3" href="javascript:holdGame('${gameid}') "> Hold </a>
        <a class= "btn btn-lg text-uppercase bg-dark-subtle text-decoration-none text-dark fw-bold py-2 px-5 m-2 rounded-3" href="javascript:TransferModal('${gameid}') "> Transfer </a>
         <a class= "btn btn-lg text-uppercase bg-danger text-decoration-none text-white py-2 px-5 m-2 rounded-3" href="javascript:closeGame('${gameid}') "> Stop </a>
         
         `
         document.getElementById('gameName').innerHTML = `
        
         <div>
    
         <p class=" fw-bold text-uppercase" style="font-size: 2.25rem"> Table ${gameName} <span class= "text-info"> ${data.status} </span> </p>


 
 </div>
   
    
         
         `


         document.getElementById('gameInfo').innerHTML = `
         
         <div class="row">
        <div class="col-6">
        <p class="text-start fs-4 ms-5  ps-5"  >Started:  </p>
        </div>
        <div class="col-6">
        <p class="text-end fs-4 me-5 pe-5  " >  ${data.timeStarted}  </p>

        </div>      
         </div>
         <div class="row">
         <div class="col-6">
         <p class="text-start fs-4 ms-5  ps-5"  >Time:  </p>
         </div>
         <div class="col-6">
         <p class="text-end fs-4 me-5 pe-5" >  ${data.timePlaying}  </p>
 
         </div>      
          </div>

           <div class="row">
           <div class="col-6">
           <p class="text-start fs-4 ms-5  ps-5"  >Amount:  </p>
           </div>
           <div class="col-6">
           <p class="text-end fs-4 me-5 pe-5" >  CAD${data.amount}  </p>
   
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


function changeHoldColor2(gameid, gameName, bgColor, textColor) {
    const myDiv = document.getElementById(gameid)
    const text = document.getElementById('link_container_'+gameName)

 
    // Remove the class
    myDiv.classList.remove("bg-body-secondary");

    // Add the new class
    myDiv.classList.add(bgColor);

    // Remove the class
    text.classList.remove("text-dark");

    // Add the new class
    text.classList.add(textColor);
    


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

// START GAME BY THE MINUTE
async function startGameByMinute(gameId) {
    try {

        bodyInfo = { 'gameId': gameId }
        const response = await getRequest(`${URL}/game/start-game-by-minute`, `POST`, bodyInfo);
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


//FREE GAME
async function closeFreeGame(gameId) {
    try {

        bodyInfo = { 'gameId': gameId }
        const response = await getRequest(`${URL}/game/free-game`, `delete`, bodyInfo);
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













