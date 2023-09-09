async function getChargeList() {

    const response = await getRequest(`${URL}/game-charges/list`, `GET`);
    data = await response.json();
    return data
    

}


async function displaychargeList(){
    charges = await getChargeList()


    charges.forEach(charge => {

        console.log(charge.amount)


        const tr = document.getElementById('tr');
        const chargeList = document.getElementById('chargeList');

        const td = document.createElement('td');
    
        chargeList.innerHTML = chargeList.innerHTML + `  
        <tr>    
        <td> Table ${charge.game.name} </td>
        <td> ${charge.amount} </td>
        <td> ${charge.duration} </td>
         </tr>
       
 

     
 `;




    });
}


displaychargeList()