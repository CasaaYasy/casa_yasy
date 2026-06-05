// Esperar a que la página cargue completamente
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  // Ocultar el loader después de 1.5 segundos
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1500); // Cambia el tiempo (en milisegundos) según lo que necesites
});