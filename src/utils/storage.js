/**
 * Utilidades para almacenamiento local (localStorage) de aportes ciudadanos
 * Incluye validación de estructura para prevenir anomalías o datos corruptos.
 */

const STORAGE_KEY = 'mapa_seguro_sjl_aportes_v1';

export function getContributions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.error('Error al leer el historial de aportes de localStorage:', err);
    return [];
  }
}

export function saveContribution(item) {
  try {
    const current = getContributions();
    const updated = [item, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Error al guardar el aporte en localStorage:', err);
    return false;
  }
}

export function removeContribution(id) {
  try {
    const current = getContributions();
    const filtered = current.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Error al eliminar aporte:', err);
    return false;
  }
}

export function clearAllContributions() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    console.error('Error al limpiar historial:', err);
    return false;
  }
}
