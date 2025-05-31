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

const scriptURL = 'https://script.google.com/macros/s/AKfycbwmjyMGiDd_dpGZNXy7uAxY5CiUcqzODNEED7uDCHOyPGl26nn9tFemIzf4iIAryu0gvw/exec';
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', e => {
  e.preventDefault();

  // Build URLSearchParams from form data
  const formData = new FormData(form);
  const params = new URLSearchParams();

  for (const pair of formData.entries()) {
    params.append(pair[0], pair[1]);
  }

  fetch(`${scriptURL}?${params.toString()}`, {
    method: 'GET',  // Use GET to avoid CORS issues
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === "success") {
      status.innerHTML = "Message sent successfully!";
      form.reset();
    } else {
      status.innerHTML = `Error: ${data.message}`;
    }
  })
  .catch(error => {
    console.error('Error!', error.message);
    status.innerHTML = "Failed to send message.";
  });
});
