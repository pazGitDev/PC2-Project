/**
 * Módulo de Seguridad y Sanitización (DevSecOps en Frontend)
 * Previene vulnerabilidades comunes del lado del cliente como Cross-Site Scripting (XSS)
 * e inyección de contenido malicioso en campos de entrada ciudadana.
 */

/**
 * Sanitiza una cadena de texto eliminando etiquetas HTML, scripts, atributos inline peligrosos y caracteres de control.
 * @param {string} input - Texto sin procesar ingresado por el usuario
 * @returns {string} Texto limpio y seguro
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';

  return input
    // Remueve etiquetas script completas y su contenido
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remueve etiquetas iframe, object, embed, style y enlaces javascript
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    // Remueve cualquier etiqueta HTML
    .replace(/<[^>]+>/g, '')
    // Remueve pseudoprotocolos peligrosos (javascript:, vbscript:, data:)
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    // Remueve eventos DOM tipo onload, onerror, onclick
    .replace(/on\w+\s*=/gi, '')
    // Normaliza espacios en blanco
    .trim();
}

/**
 * Valida si un texto es seguro y no excede los límites definidos
 * @param {string} text - Texto a validar
 * @param {number} min - Longitud mínima
 * @param {number} max - Longitud máxima
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateText(text, min = 3, max = 500) {
  const clean = sanitizeInput(text);
  if (!clean || clean.length < min) {
    return {
      valid: false,
      error: `Debe contener al menos ${min} caracteres válidos.`
    };
  }
  if (clean.length > max) {
    return {
      valid: false,
      error: `No debe superar los ${max} caracteres (actual: ${clean.length}).`
    };
  }
  return { valid: true };
}

/**
 * Genera un código de seguimiento ciudadano seguro y único
 * Ej: SJL-2026-8942
 */
export function generateTrackingCode() {
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `SJL-${year}-${randomPart}`;
}
