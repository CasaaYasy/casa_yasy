document.addEventListener('DOMContentLoaded', () => {
  const showRegisterBtn = document.getElementById('show-register');
  const showLoginBtn = document.getElementById('show-login');

  showLoginBtn.addEventListener('click', () => {
    document.body.classList.remove('show-register');
  });

  showRegisterBtn.addEventListener('click', () => {
    document.body.classList.add('show-register');
  });

  
});

// Esperar a que la página cargue completamente
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  const greetingElement = document.getElementById("greeting");

  // Obtener la hora actual
  const currentHour = new Date().getHours();

  // Determinar el saludo según la hora
  let greeting;
  if (currentHour >= 6 && currentHour < 12) {
    greeting = "¡Buenos días!";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "¡Buenas tardes!";
  } else {
    greeting = "¡Buenas noches!";
  }

  // Actualizar el texto del saludo
  greetingElement.textContent = `${greeting} Bienvenido a Casa Yasy S.A`;

  // Ocultar el loader después de 1.5 segundos
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1500); // Cambia el tiempo según lo que necesites
});
