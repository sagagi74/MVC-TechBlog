document.querySelector('#signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#signup-username').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard'); // Redirect to dashboard after successful sign-up
      } else {
        alert('Failed to sign up, passwords length should be more than 7 digits');
      }
    }
  });
  