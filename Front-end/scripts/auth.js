


async function getUserList() {

  data = await getRequest(`${URL}/users`, `GET`);
  console.log(data)
}


getUserList()



const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = inputEmail.value;
  const password = inputPassword.value;

  try {

    bodyInfo = { 'emailAddress': email, 'password': password }
    const response = await getRequest(`${URL}/login`, `POST`, bodyInfo);

    data = await response.json();
    console.log(data);

    if (response.ok) {
      // Store the token in local storage or a cookie for future API requests
      const token = data.token
      // Save email and token to local storage
      localStorage.setItem('emailAddress', email);
      localStorage.setItem('token', token);

      // Retrieve data from local storage
      const storedEmail = localStorage.getItem("emailAddress");
      const storedToken = localStorage.getItem("token");

      // Print local storage
      console.log("Stored Email:", storedEmail);
      console.log("Stored Token:", storedToken);

      alert('Login successful!');

      // Redirect to a new page after successful login
    window.location.href = "http://127.0.0.1:5500/Front-end/views/board.html";
    } else {
      console.log(response);
      console.log(data);
      alert(data.message);
    }


  } catch (err) {
    console.error('Error:', err);
  }
});


// JSON.stringify({ 'greetings': 'hello'})
// whatever = { 'greetings': 'hello'};
// JSON.stringify(whatever)


//NEXT
      //Guardar TOKEN, EMAIL IN LOCAL STORAGE
      // REDIRECIONAR A OTRA PAGINA SI INICIO SESION
      //LIMPIAR EL CODIGO
      // MOSTRAR EN PANTALLA LAS MESAS EN LA NUEVA PAGINA 


      