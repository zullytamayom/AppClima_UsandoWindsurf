/**
 * Traduce el código meteorológico WMO enviado por Open-Meteo.
 * @param {number} codigo 
 * @returns {string} Descripción en español.
 */
export function traducirCodigoClima(codigo) {
  if (codigo === 0) return "Cielo despejado";
  if (codigo === 1 || codigo === 2 || codigo === 3) return "Parcialmente nublado";
  if (codigo === 45 || codigo === 48) return "Niebla o neblina";
  if (codigo >= 51 && codigo <= 55) return "Llovizna ligera a densa";
  if (codigo >= 61 && codigo <= 65) return "Lluvia leve a fuerte";
  if (codigo >= 71 && codigo <= 75) return "Nevada leve a fuerte";
  if (codigo === 77) return "Granizo";
  if (codigo >= 80 && codigo <= 82) return "Chubascos de lluvia";
  if (codigo === 95) return "Tormenta eléctrica ligera";
  if (codigo >= 96 && codigo <= 99) return "Tormenta eléctrica con granizo";
  
  return "Condiciones no especificadas";
}