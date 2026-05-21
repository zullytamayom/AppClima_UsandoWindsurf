import { traducirCodigoClima } from '../utils/weatherTranslator.js';

/**
 * Obtiene el clima actual de una ciudad realizando el flujo completo de Open-Meteo.
 * @param {string} nombreCiudad 
 * @returns {Promise<Object>}
 */
export async function obtenerClimaPorCiudad(nombreCiudad) {
  try {
    if (!nombreCiudad || typeof nombreCiudad !== 'string' || nombreCiudad.trim() === '') {
      throw new Error("El nombre de la ciudad es inválido o no fue proporcionado.");
    }

    const ciudadLimpia = nombreCiudad.trim();

    // 1. Geocoding API
    const urlGeocoding = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ciudadLimpia)}&count=1&language=es`;
    const respuestaGeo = await fetch(urlGeocoding);

    if (!respuestaGeo.ok) {
      throw new Error(`Error en el servidor de geocodificación (Código HTTP: ${respuestaGeo.status}).`);
    }

    const datosGeo = await respuestaGeo.json();

    if (!datosGeo.results || datosGeo.results.length === 0) {
      throw new Error(`No se encontraron coordenadas para "${ciudadLimpia}". Asegúrate de escribirlo correctamente.`);
    }

    const { latitude, longitude, name: ciudadOficial, country } = datosGeo.results[0];

    // 2. Weather Forecast API
    const urlWeather = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
    const respuestaClima = await fetch(urlWeather);

    if (!respuestaClima.ok) {
      throw new Error(`Error al solicitar los datos meteorológicos (Código HTTP: ${respuestaClima.status}).`);
    }

    const datosClima = await respuestaClima.json();

    if (!datosClima.current_weather) {
      throw new Error("La API no retornó datos del clima actual para estas coordenadas.");
    }

    const { temperature, weathercode } = datosClima.current_weather;

    return {
      exitoso: true,
      ciudad: `${ciudadOficial}, ${country}`,
      temperatura_celsius: temperature,
      descripcion: traducirCodigoClima(weathercode)
    };

  } catch (error) {
    console.error(`[WeatherApp Error]: ${error.message}`);
    return {
      exitoso: false,
      error: error.message
    };
  }
}