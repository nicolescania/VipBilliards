async function getChargeList() {

    const response = await getRequest(`${URL}/game-charges/list`, `GET`);
    data = await response.json();
    return data
    

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
  
  
  

async function displaychargeList(){
    charges = await getChargeList()


    const storedLocation = localStorage.getItem("location");
    const storageBranch = localStorage.getItem("branch")
    
    const chargePerLocaton = charges.filter(charge => charge.location._id === storedLocation);
  
    document.getElementById('branchNameChargeView').innerHTML = `      
    <div>
    <p class=" fw-bold text-uppercase text-center h2 pb-2">  management system | ${storageBranch} branch  </p>
  </div>
    `
    totalAmount = 0
    let count = 1
    chargePerLocaton.forEach(locationGame => {
     

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
             </tr>                
  `  ;

  totalAmount += locationGame.amount;


console.log(totalAmount)
    }
 

    document.getElementById('totalCharge').innerHTML = `  <tr>
    <th>Total</th>
    <td></td>
    <td id="totalGameCharge" colspan="3">  ${formatMoneyCAD(totalAmount)}</td>
  </tr>`


 })
//  document.getElementById('totalCharge').textContent = formatMoneyCAD(totalAmount);


}
displaychargeList()