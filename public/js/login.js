// event listener 
document.querySelector('#login-form').addEventListener('submit', async (event) => {
    // Prevent the default 
    event.preventDefault();
  
    // Trims username and passwords inputs
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    // Check if both username and password if empty
    if (username && password) {
      //ok then log in the user
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // if ok, redirect the user to the home
      if (response.ok) {
        document.location.replace('/');
      } else {
        // login fails
        alert(' log in has failed');
      }
    }
  });
  