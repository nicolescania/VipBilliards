async function getChargeList(locationId,startDate,endDate) {


    const response = await getRequest(`${URL}/game-charges/list?locationId=${locationId}&startDate=${startDate}&endDate=${endDate}`, `get`,);
    data = await response.json();
    return data

}


async function getValue() {
  // Get the values of the input fields
  displaychargeList()
}
    


function formatMoneyCAD(number, decimalPlaces = 2) {
    // Ensure number is a valid number
    if (typeof number !== 'number' || isNaN(number)) {
      return 'Invalid number';
    }
  
    // Round the number to the specified decimal places
    const roundedNumber = Number(number.toFixed(decimalPlaces));
  
    // Use Intl.NumberFormat for currency formatting with 'en-CA' locale
    const formatter = new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD', // Currency code for Canadian Dollars
      minimumFractionDigits: decimalPlaces,
    });
  
    return formatter.format(roundedNumber);
  }
  
  
  // GET DATE FORMATTED


const getFormattedDate = (date) => {


  date = new Date(date);

  // adjust 0 before single digit date
  let day = ("0" + date.getDate()).slice(-2);

  // current month
  let month = ("0" + (date.getMonth() + 1)).slice(-2);

  // current year
  let year = date.getFullYear();

  // current hours
  let hours = date.getHours();

  // current minutes
  let minutes = date.getMinutes();

  // current seconds
  let seconds = date.getSeconds();

  // prints date & time in YYYY-MM-DD HH:MM:SS format
  return (month + "-" + day + "-" + year + " " + hours + ":" + minutes + ":" + seconds);




};
  

async function displaychargeList(){


  const startDateTime = document.getElementById("startDateTimeInput").value;
  const endDateTime = document.getElementById("endDateTimeInput").value;
  
    const storedLocation = localStorage.getItem("location");
    const storageBranch = localStorage.getItem("branch")
 
    charges = await getChargeList(storedLocation,startDateTime,endDateTime)



   

    const chargePerLocaton = charges.filter(charge => charge.location._id === storedLocation);
  
    document.getElementById('branchNameChargeView').innerHTML = `      
    <div>
    <p class=" fw-bold text-uppercase text-center h2 pb-2">  management system | ${storageBranch} branch  </p>
  </div>
    `
    totalTime = 0
    totalAmount = 0
    let count = 1
    chargeList.innerHTML =''
    chargePerLocaton.forEach(locationGame => {

     console.log(locationGame._id)

         const tr = document.getElementById('tr');
        const chargeList = document.getElementById('chargeList');

        let formattedAmount = formatMoneyCAD(locationGame.amount)
        
        const td = document.createElement('td');
        if (locationGame.duration){
         
            
            chargeList.innerHTML = chargeList.innerHTML + `  
            <tr>
            <td> ${count++} </td>    
            <td> Table ${locationGame.game.name} </td>
            <td> ${formattedAmount} </td>
            <td> ${locationGame.duration} minutes</td>
            <td><a href="javascript:deleteCharge('${locationGame._id}')" class="btn btn-danger btn-sm delete"><i class="fa-solid fa-trash-can"></i> Delete</a></td>
             </tr>                
  `  ;

  totalAmount += locationGame.amount;
  totalTime += locationGame.duration


    }
 

    document.getElementById('totalCharge').innerHTML = `  <tr>
    <th>Total</th>
    <td></td>
    <td>  ${formatMoneyCAD(totalAmount)}</td>
    <td> ${totalTime} minutes</td>
    <td> </td>


  </tr>`


 })


}


//CLOSE GAME
async function deleteCharge(chargeId) {
console.log(chargeId)

  const response = await getRequest(`${URL}/game/delete-charge/${chargeId}`, `delete`);
  data = await response.json();
  displaychargeList()
  return data



}
