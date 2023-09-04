


async function getUserList() {
  //const response = await getRequest(`${URL}/user/list`, `get`, null);

  response = await getRequest(`${URL}/user/list`, `GET`);
  data = await response.json();

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
    const response = await getRequest(`${URL}/user/login`, `POST`, bodyInfo);

    data = await response.json();

    
    Object.values(data).forEach(user => {
      localStorage.setItem('location', user.location._id)

    });


   // console.log(data);

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
     // console.log("Stored Email:", storedEmail);
     /// console.log("Stored Token:", storedToken);

      //alert('Login successful!');

      let peanutPlaza = '64f3c4f621bef0587507ae22'
      let danforth = '64f3c50a21bef0587507ae24'
      let college = '64f3c4cb21bef0587507ae20'

      window.location.href = "http://127.0.0.1:5500/Front-end/views/board.html";

    


      // Redirect to a new page after successful login
    } else {
      console.log(response);
      console.log(data);
      alert(data.message);
    }


  } catch (err) {
    console.error('Error:', err);
  }
});




      