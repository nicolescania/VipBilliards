const URL = 'http://localhost:5000/api';



async function getRequest(url, method, bodyInfo = null) {

  const config = {
    method: method,
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
    },

  };

  if (bodyInfo != null) {
    config.body = JSON.stringify(bodyInfo);
  }

  try {

    const result = await fetch(url, config);
    return result;


  } catch (error) {
    console.log(error);
  }
}
