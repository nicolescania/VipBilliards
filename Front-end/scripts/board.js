


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
    console.log(storageBranch);


    const location = games.filter(game => game.location === storedLocation);

    console.log(location)
    location.forEach(locationGame => {
        return layaoutLocation("col-md-4 mb-2 px-5 my-2", locationGame._id, locationGame.name, storageBranch)


    })





    // if (storedLocation == 'Peanut Plaza') {

    //     const peanutPlaza = games.filter(game => game.location === 'peaunutPlaza');
    //     peanutPlaza.forEach(peanutPlazaGame => {
    //         return layaoutLocation("col-4 mb-2", peanutPlazaGame._id, peanutPlazaGame.name)


    //     })
    // } if (storedLocation == 'Danforth') {
    //     const danforth = games.filter(game => game.location === '64f3c50a21bef0587507ae24');
    //     danforth.forEach(danforthGame => {
    //         console.log(danforthGame)
    //         return layaoutLocation("col-3 mb-2", danforthGame._id, danforthGame.name)


    //     })


    // } if (storedLocation == 'college') {

    //     const college = games.filter(game => game.location === '64f3c4cb21bef0587507ae20');
    //     college.forEach(collegeGame => {
    //         return layaoutLocation("col-4 mb-2", collegeGame._id, collegeGame.name)

    //     })



    // }


    //verifyGameActive(game._id)

    // setStatus(game._id, data.status )


    // });
}

function setStatus(gameId, statusName) {

    pStatus = document.getElementsByClassName(gameId)
    pStatus[0].innerHTML = statusName

}
//style="font-size: 2.0rem">


async function layaoutLocation(cardClassList, gameid, gameName, storageBranch) {
    const row = document.getElementById('row');

    card = document.createElement('div');
    card.classList = cardClassList;

    document.getElementById('branchName').innerHTML = `      
    <div>
    <p class=" fw-bold text-uppercase text-center h2 pb-2">  management system | ${storageBranch} branch  </p>
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
    var modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    modal.show();

}

function hideModal() {

    // Get a reference to the modal element by its ID
    let modal = document.getElementById('exampleModal');

    // Hide the modal by removing the "show" class and setting the "display" style to "none"
    modal.classList.remove('show');
    modal.style.display = 'none';

    // Optionally, remove the modal-backdrop if it exists
    var backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.remove();
    }

}

//


// GET THE GAME STARTED 
async function getGame(gameid, gameName) {

    showModal()

    const data = await getGameActive(gameid)


    if (data.status == 'AVAILABLE') {
        document.getElementById('gameInfo').innerHTML = ''

        myModal = document.getElementById('modalButtons').innerHTML = `

       <div class="row">
       <div class="col">
       <a class= "bg-success text-uppercase text-decoration-none text-white  fw-bold py-2 px-2 m-2 rounded-3" href="javascript:startGameByMinute('${gameid}') "> Start (Min) </a>
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
    hideModal()


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
        hideModal()

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
        hideModal()

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
        hideModal()

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
        hideModal()

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
        hideModal()


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
        hideModal()


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
        hideModal()

        return console.log(data);

    } catch {
        return console.log('no funciona transfer game func')
    }

}















