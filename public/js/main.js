document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.querySelector('a[href="/logout"]');
    if (logoutButton) {
      logoutButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const response = await fetch('/api/users/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to log out.');
        }
      });
    }
  });
  