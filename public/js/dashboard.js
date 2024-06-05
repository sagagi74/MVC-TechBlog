document.addEventListener('DOMContentLoaded', () => {
  // Adds event listeners to edit buttons to show the edit form when clicked
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', event => {
      const id = event.target.getAttribute('data-id');
      const form = document.querySelector(`.edit-form[data-id="${id}"]`);
      form.style.display = 'block';
    });
  });

  //  Adds event listeners to edit forms to handle form submission and update posts
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

  //  Adds event listeners to delete buttons to handle post deletion
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
