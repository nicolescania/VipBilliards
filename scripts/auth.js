


async function getUserList() {

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

  

    const location = data.user.location._id
    const branch = data.user.location.name
    const layout = data.user.location.layout
  
  



    //console.log(data);

    if (response.ok) {
      // Store the token in local storage or a cookie for future API requests
      const token = data.token
      // Save email and token to local storage
      localStorage.setItem('emailAddress', email);
      localStorage.setItem('token', token);
      localStorage.setItem('location', location)
      localStorage.setItem('branch', branch)
      localStorage.setItem('layout', layout)

     

      // Retrieve data from local storage
      const storedEmail = localStorage.getItem("emailAddress");
      const storedToken = localStorage.getItem("token");
  

 

      // Print local storage
     console.log("Stored Email:", storedEmail);
     console.log("Stored Token:", storedToken);



      //alert('Login successful!');

      //window.location.href = "/board/views/board.html";
            window.location.href = "/views/board.html";


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




      
