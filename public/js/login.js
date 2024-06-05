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
  
      // if ok
      if (response.ok) {

        //fixing it because of redirect issue
       // document.location.replace(data.redirect);
     // location.reload();
   
      document.location.replace('/dashboard');
      } else {
        // login fails
        alert(' log in has failed');
      }
    }
  });
  