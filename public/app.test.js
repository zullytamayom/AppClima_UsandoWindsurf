import { jest } from '@jest/globals';

const obtenerClimaPorCiudad = jest.fn();

jest.unstable_mockModule('./services/weatherService.js', () => ({
  obtenerClimaPorCiudad
}));

describe('app', () => {
  beforeEach(() => {
    jest.resetModules();
    obtenerClimaPorCiudad.mockReset();

    document.body.innerHTML = `
      <form id="weather-form">
        <input id="city-input" />
        <button type="submit">Buscar</button>
      </form>
      <div id="result-container" class="hidden"></div>
      <div id="error-container" class="hidden"></div>
    `;
  });

  test('renderiza correctamente el nombre de la ciudad y la temperatura recibidos', async () => {
    obtenerClimaPorCiudad.mockResolvedValue({
      exitoso: true,
      ciudad: 'Bogotá, Colombia',
      temperatura_celsius: 18,
      descripcion: 'Cielo despejado'
    });

    await import('./app.js');

    document.getElementById('city-input').value = 'Bogotá';
    document.getElementById('weather-form').dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );

    await Promise.resolve();

    expect(obtenerClimaPorCiudad).toHaveBeenCalledWith('Bogotá');
    expect(document.querySelector('.res-city').textContent).toBe('Bogotá, Colombia');
    expect(document.querySelector('.res-temp').textContent).toBe('18°C');
    expect(document.getElementById('result-container').classList.contains('hidden')).toBe(false);
  });
});
