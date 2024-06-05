document.addEventListener('DOMContentLoaded', () => {
    // Event listener for edit buttons
    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', event => {
        const id = event.target.getAttribute('data-id');
        const form = document.querySelector(`.edit-form[data-id="${id}"]`);
        form.style.display = 'block';
      });
    });
  
    // Event listener for edit forms
    document.querySelectorAll('.edit-form').forEach(form => {
      form.addEventListener('submit', async event => {
        event.preventDefault();
        const id = event.target.getAttribute('data-id');
        const title = document.querySelector(`#edit-title-${id}`).value.trim();
        const content = document.querySelector(`#edit-content-${id}`).value.trim();
  
        if (title && content) {
          const response = await fetch(`/api/techposts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert('Failed to update post');
          }
        }
      });
    });
  
    // Event listener for delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', async event => {
        const id = event.target.getAttribute('data-id');
  
        const response = await fetch(`/api/techposts/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to delete post');
        }
      });
    });
  });
  