


displayGameList()
// GET LIST OF GAMES
async function getGameList() {

    const data = await getRequest(`${URL}/games/list`, `GET`);

    return await data.json()

}





// DISPLAY ALL THE GAMES IN THE SCREEN
async function displayGameList() {

    games = await getGameList()

    const storedLocation = localStorage.getItem("location");
    const storageBranch = localStorage.getItem("branch")


    
console.log(storedLocation)

    const location = games.filter(game => game.location._id === storedLocation);
  
    location.forEach(locationGame => {

    

        return layaoutLocation(locationGame.location.layout, locationGame._id, locationGame.name, storageBranch)


    })


}

function setStatus(gameId, statusName) {

    pStatus = document.getElementsByClassName(gameId)
    pStatus[0].innerHTML = statusName

}

async function layaoutLocation(cardClassList, gameid, gameName, storageBranch) {
    const row = document.getElementById('row');

    card = document.createElement('div');
    card.classList = cardClassList;

    document.getElementById('branchName').innerHTML = `      
    <div>
    <p class=" fw-bold text-uppercase text-center h2 pb-2 mb-2">  management system | ${storageBranch} branch  </p>
  </div>
    `

    card.innerHTML = `      
    <div class="card bg-body-secondary text-center py-5" id= '${gameid}'> 
    <a  class="text-decoration-none text-dark  fw-bold gamesNumbers text-center card-texttiene px-0  display-1"  id= 'link_container_${gameid}' href="javascript:getGame('${gameid}', '${gameName}') "> ${gameName}   </a>
    <p class="${gameid}"> </p>
    
    
    </div>       
 `;
    row.appendChild(card);
    const data = await getGameActive(gameid, gameName)
}


// VERIFY GAMES ACTIVE

async function verifyGameActive(gameid) {

    getGameActive(gameid)

}


// GET GAME ACTIVE

async function getGameActive(gameId, name = null) {


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
                timeOnHold: data.holdTime,
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
                timeOnHold: data.holdTime,
                amount: data.charge
            }
        }

        if (data.gameActiveExist == false) {
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

    
    loading = document.getElementById('loading')
    loading.style.visibility = "visibility";
  
    var modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    document.getElementById('gameInfo').innerHTML = ''
    myModal = document.getElementById('modalButtons').innerHTML = ''
    document.getElementById('gameName').innerHTML = ''
    modal.show();

}

function hideModal(modalHide) {

    // Get a reference to the modal element by its ID
    let modal = document.getElementById(modalHide);

    // Hide the modal by removing the "show" class and setting the "display" style to "none"
    modal.classList.remove('show');
    modal.style.display = 'none';

    // Optionally, remove the modal-backdrop if it exists
    var backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.remove();
    }

}




// GET THE GAME STARTED 
async function getGame(gameid, gameName) {
  
    loading = document.getElementById('loading')
    loading.style.display = "block";


    showModal()

    const data = await getGameActive(gameid)

 
    //loading.style.display = "none";

    if (data.status == 'AVAILABLE') {
        loading = document.getElementById('loading')
        loading.style.display = "none";
        document.getElementById('gameInfo').innerHTML = ''
        myModal = document.getElementById('modalButtons').innerHTML = ''
        document.getElementById('gameName').innerHTML = ''

        myModal = document.getElementById('modalButtons').innerHTML = `

       <div class="row w-100">
       <div class="col-md-6 mb-2">
       <a class="btn btn-success opacity50 w-100 text-uppercase btn-lg fw-bold"  href="javascript:startGameByMinute('${gameid}') "> Start (Min) </a>
       </div>
       <div class="col-md-6 mb-2">
       <a class= "btn btn-success w-100 text-uppercase btn-lg fw-bold" href="javascript:startGame('${gameid}') "> Start </a>
        

       </div>
 
    
       
`;

        document.getElementById('gameName').innerHTML = `
        
       <div>
       <p class=" fw-bold text-uppercase" style="font-size: 3.50rem"> Table ${gameName} <span class= "text-success"> ${data.status} </span> </p>
     </div>
       
  
       
       `

    } if (data.status == 'ON HOLD') {
        loading = document.getElementById('loading')
        loading.style.display = "none";

        document.getElementById('gameInfo').innerHTML = ''
        myModal = document.getElementById('modalButtons').innerHTML = ''
        document.getElementById('gameName').innerHTML = ''

        document.getElementById('gameInfo').innerHTML = `
        
        <div class="row">
        <div class="col-3">
        <p class="text-start fs-4 ms-md-5  ps-md-5"  >Started:  </p>
        </div>
        <div class="col-9">
        <p class="text-end fs-4 me-md-5 pe-md-5  " >  ${data.timeStarted}  </p>

        </div>      
         </div>
         <div class="row">
         <div class="col-3">
         <p class="text-start fs-4 ms-md-5  ps-md-5"  >Time:  </p>
         </div>
         <div class="col-9">
         <p class="text-end fs-4 me-md-5 pe-md-5" >  ${data.timePlaying}  </p>
 
         </div>      
          </div>

          <div class="row">
          <div class="col-3">
          <p class="text-start fs-4 ms-md-5  ps-md-5"  >Hold:  </p>
          </div>
          <div class="col-9">
          <p class="text-end fs-4 me-md-5 pe-md-5" >  ${data.timeOnHold}  </p>
  
          </div>      
           </div>
   

           <div class="row">
           <div class="col-3">
           <p class="text-start fs-4 ms-md-5  ps-md-5"  >Amount:  </p>
           </div>
           <div class="col-9">
           <p class="text-end fs-4 me-md-5 pe-md-5" >  CAD${data.amount}  </p>
   
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

        console.log(data.timeStarted)
        loading = document.getElementById('loading')
        loading.style.display = "none";
        document.getElementById('gameInfo').innerHTML = ''
        myModal = document.getElementById('modalButtons').innerHTML = ''
        document.getElementById('gameName').innerHTML = ''

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
        <div class="col-3">
        <p class="text-start fs-4 ms-md-5  ps-md-5"  >Started:  </p>
        </div>
        <div class="col-9">
        <p class="text-end fs-4 me-md-5 pe-md-5    " >  ${data.timeStarted}  </p>

        </div>      
         </div>
         <div class="row">
         <div class="col-3">
         <p class="text-start fs-4 ms-md-5  ps-md-5"  >Time:  </p>
         </div>
         <div class="col-9">
         <p class="text-end fs-4 me-md-5 pe-md-5  " >  ${data.timePlaying}  </p>
 
         </div>      
          </div>

           <div class="row">
           <div class="col-3">
           <p class="text-start fs-4 ms-md-5  ps-md-5"  >Amount:  </p>
           </div>
           <div class="col-9">
           <p class="text-end fs-4 me-md-5 pe-md-5  " >  CAD${data.amount}  </p>
   
           </div>      
            </div>
         
         
        `;


    }









}



function showStartButton(gameid) {
    loading = document.getElementById('loading')
    loading.style.display = "none";
    document.getElementById('startGameModal').innerHTML = `<a href="javascript:startGame('${gameid}') "> Start </a>`;

}



async function TransferModal(gameid) {
    secondLoading = document.getElementById('secondLoading')
    secondLoading.style.display = "block";
  

    var modal = new bootstrap.Modal(document.getElementById("transfermodal02"));
    modal.show();
    games = await getGameList()

    const select = document.getElementById('menuSelectionGames');
    select.innerHTML = ''
    games.forEach(async (game) => {
        

        const data = await getGameActive(game._id)
        if (data.isAvailable == true) {
            secondLoading.style.display = "none";
            let gameName = game.name
            console.log(game)
            select.innerHTML = select.innerHTML + `<option value="${game._id}">${gameName}</option>`;

        }



    });

    hideModal("exampleModal")

    document.getElementById('transferButton').innerHTML = `<a class= "btn btn-lg text-uppercase bg-dark-subtle text-decoration-none text-dark fw-bold py-2 px-5 m-2 rounded-3" href="javascript:transferGame('${gameid}') "> Transfer </a> `;
  


}




function changeHoldColor2(gameid, gameName, bgColor, textColor) {
    const myDiv = document.getElementById(gameid)
    const text = document.getElementById('link_container_' + gameName)


    // Remove the class
    //myDiv.classList.remove("bg-body-secondary");
    myDiv.className = `card text-center py-2  ${bgColor}`;



    // Remove the class
    text.classList.remove("text-dark");
    text.classList.remove("text-white");


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
        hideModal("exampleModal")


        return console.log(data);


    } catch {

    }

}

// START GAME BY THE MINUTE
async function startGameByMinute(gameId) {
    try {

        bodyInfo = { 'gameId': gameId }
        const response = await getRequest(`${URL}/game/start-game-by-minute`, `post`, bodyInfo);
        data = await response.json();

        getGameActive(gameId)
        hideModal("exampleModal")


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
        hideModal("exampleModal")


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
        hideModal("exampleModal")


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
        hideModal("exampleModal")



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
        hideModal("exampleModal")



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
        getGameActive(gameIdOld)

        getGameActive(gameIdNew)
        hideModal("transfermodal02")
        return console.log(data);

    } catch {
        return console.log('no funciona transfer game func')
    }

}















function updateTimestampsToChinaTime() {
    const timestampElements = document.querySelectorAll('.timestamp');
    
    timestampElements.forEach(element => {
        const timestamp = element.getAttribute('data-timestamp');
        const chinaTime = convertToChinaTime(timestamp);
        element.textContent = `Timestamp (China): ${chinaTime.toLocaleString()}`;
    });
}

// Run the updateTimestampsToChinaTime function when the page loads
window.addEventListener('DOMContentLoaded', updateTimestampsToChinaTime);