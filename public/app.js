// Importamos la función que construiste y validaste en tu checklist
import { obtenerClimaPorCiudad } from './services/weatherService.js';

const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const resultContainer = document.getElementById('result-container');
const errorContainer = document.getElementById('error-container');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita que la página se recargue

  const ciudadBuscada = cityInput.value;
  
  // Limpiamos estados anteriores
  resultContainer.classList.add('hidden');
  errorContainer.classList.add('hidden');

  // Cambiamos temporalmente el botón a estado de carga
  const btn = form.querySelector('button');
  const originalBtnText = btn.textContent;
  btn.textContent = "Buscando...";
  btn.disabled = true;

  // Ejecutamos tu servicio de clima
  const resultado = await obtenerClimaPorCiudad(ciudadBuscada);

  // Restauramos el botón
  btn.textContent = originalBtnText;
  btn.disabled = false;

  if (resultado.exitoso) {
    // Inyectamos el HTML de los resultados de forma dinámica
    resultContainer.innerHTML = `
      <p class="res-city">${resultado.ciudad}</p>
      <span class="res-temp">${resultado.temperatura_celsius}°C</span>
      <p class="res-desc">${resultado.descripcion}</p>
    `;
    resultContainer.classList.remove('hidden');
  } else {
    // Si falla el checklist de errores, mostramos el mensaje controlado
    errorContainer.innerHTML = `
      <strong>¡Ups! Algo salió mal:</strong><br>${resultado.error}
    `;
    errorContainer.classList.remove('hidden');
  }
});