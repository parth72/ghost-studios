document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.page-loader');
  setTimeout(() => loader.classList.add('hide'), 800);

  const animated = document.querySelectorAll('.animate');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

  animated.forEach(el => observer.observe(el));
});

function toggleMode() {
  document.body.classList.toggle('light-mode');
}

const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'; // Replace with your actual script ID
const form = document.forms['submit-to-google-sheet'];
const status = document.getElementById('form-status');

form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      status.innerHTML = "Message sent successfully!";
      form.reset();
    })
    .catch(error => {
      status.innerHTML = "Failed to send message.";
    });
});