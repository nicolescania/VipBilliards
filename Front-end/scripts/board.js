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
     
        <div class="card bg-white text-center py-4" id= '${game._id}'> 
        <a href="javascript:getGame('${game._id}', '${gameName}')"> ${game.name}</a> 
        
        </div>       
     `;
    

        row.appendChild(card);


    });
}


async function getGame(gameid, gameName) {

    document.getElementById('gameName').innerHTML = `${gameName}`;
    myModal = document.getElementById('gameModal').innerHTML = `<a href="javascript:startGame('${gameid}') "> Start </a>`;
  
  
}


function changeColor(gameid) {

    const myDiv = document.getElementById(gameid)

    // Remove the class
    myDiv.classList.remove("bg-white");

    // Add the new class
    myDiv.classList.add("bg-success");
   
    getGameActive(gameid)


}


async function startGame(gameId) {


    try {

        bodyInfo = { 'gameId': gameId }
        const response = await getRequest(`${URL}/time/finalcharge`, `POST`, bodyInfo);
        data = await response.json();

        changeColor(gameId)


        return console.log(data);

    } catch {

    }

}



async function getGameActive(gameId) {


    try {

        bodyInfo = { 'gameId': gameId }
        const response = await getRequest(`${URL}/game/consulta2`, `POST`, bodyInfo);
        data = await response.json();
        return console.log(data);

    } catch {

    }

}





async function activeGame(chargesDetailId, gameId) {


    try {

        bodyInfo = { 'gameId': gameId }
        const response = await getRequest(`${URL}/time/finalcharge`, `POST`, bodyInfo);
        data = await response.json();

        changeColor(gameId)


        return console.log(data);

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



document.addEventListener('DOMContentLoaded', function() {



});