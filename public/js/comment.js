document.querySelector('#new-comment-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const comment_text = document.querySelector('#comment-text').value.trim();
    const post_id = window.location.pathname.split('/').pop();
  
    if (comment_text) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment_text, techpost_id: post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to post comment');
      }
    }
  });
  