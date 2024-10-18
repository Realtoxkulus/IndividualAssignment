const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');
const form = document.getElementById('form');
const errorMsg = document.getElementById('error-message');

let errors = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    errors = formValidation(usernameInput.value, passwordInput.value);

    if(errors.length > 0){
        errorMsg.innerText = errors.join('. ');
        // e.preventDefault();
    }else{
        authenticator(usernameInput.value, passwordInput.value);
    }
})

function formValidation(username, password){
    let errors = [];

    if(username === '' || username == null){
        errors.push('Username is required');
        usernameInput.parentElement.classList.add('incorrect');
    }

    if(password === '' || password == null){
        errors.push('Password is required');
        passwordInput.parentElement.classList.add('incorrect');
    }

    return errors;
}

const allInputs = [usernameInput, passwordInput];

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorrect');
            errorMsg.innerText = '';
        }
    })
})

function authenticator(username, password) {
    const apiEndpoint = 'https://restapi.tu.ac.th/api/v1/auth/Ad/verify2';
    const token = 'TUa102b22222c092b0a4d8880665add4bfc4cd74b48ef7b7e2d657e126b6faaf63148ead8e7ce823d2587ec03686d3da84';
  
    // Create the data object to be sent to the API
    const loginData = {
      username: username,
      password: password
    };
  
    // Make the API request using fetch
    fetch(apiEndpoint, {
      method: 'POST',  // Authentication is usually done via POST
      headers: {
        'Application-Key': `Bearer ${token}`,  // Token for authentication
        'Content-Type': 'application/json'  // Set the request type to JSON
      },
      body: JSON.stringify(loginData)  // Send the username and password in JSON format
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {  // Assuming the API returns 'status' field
        alert('Login successful!');
      } else {
        alert('Login failed: ' + data.message);  // Handle failure
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
  }