// event listener when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    //  logout button using a query selector
    const logoutButton = document.querySelector('a[href="/logout"]');
    
    // if  logout button exists 
    if (logoutButton) {
      // event listener to the logout button 
      logoutButton.addEventListener('click', async (event) => {
        // Prevent the default 
        event.preventDefault();
        
        // log out the user
        const response = await fetch('/api/users/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
  
        // redirect the user to the homepage
        if (response.ok) {
          document.location.replace('/');
        } else {
          //log out failed
          alert('Failed to log out.');
        }
      });
    }
  });
  