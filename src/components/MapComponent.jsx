import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { INITIAL_MAP_CONFIG, ZONAS_RIESGO } from '../data/zonasSJL';

// Solución definitiva para los iconos por defecto de Leaflet en Vite/Webpack
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default function MapComponent({
  selectedZone,
  onSelectZone,
  flyTarget,
  isPickingCoordinates,
  pickedCoordinates,
  onCoordinatePicked,
  activeFilter = 'TODOS'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const polygonsLayerRef = useRef(null);
  const searchMarkerRef = useRef(null);
  const pickedMarkerRef = useRef(null);

  // 1. Inicialización del mapa Leaflet
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Crear instancia de mapa
    const map = L.map(mapContainerRef.current, {
      center: INITIAL_MAP_CONFIG.center,
      zoom: INITIAL_MAP_CONFIG.zoom,
      minZoom: INITIAL_MAP_CONFIG.minZoom,
      maxZoom: INITIAL_MAP_CONFIG.maxZoom,
      zoomControl: false // Lo reposicionaremos a la esquina inferior derecha
    });

    // Control de zoom en posición cómoda para móviles y escritorio
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Capa base OpenStreetMap 100% gratuita y sin API Key
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors | SJL Ciudadano',
      maxZoom: 19
    }).addTo(map);

    // Grupo de capas para polígonos
    const polygonsGroup = L.layerGroup().addTo(map);
    polygonsLayerRef.current = polygonsGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Renderizado interactivo de los Polígonos de Riesgo
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = polygonsLayerRef.current;
    if (!map || !group) return;

    // Limpiar polígonos existentes
    group.clearLayers();

    // Filtrar según el filtro activo
    const filteredZones = ZONAS_RIESGO.filter((zone) => {
      if (activeFilter === 'TODOS') return true;
      if (activeFilter === 'Alto' && zone.nivelRiesgo === 'Alto') return true;
      if (activeFilter === 'Medio' && zone.nivelRiesgo === 'Medio') return true;
      if (activeFilter === 'Precaución' && zone.nivelRiesgo === 'Precaución') return true;
      return false;
    });

    filteredZones.forEach((zone) => {
      const isSelected = selectedZone && selectedZone.id === zone.id;

      const polygon = L.polygon(zone.coordenadas, {
        color: zone.color,
        weight: isSelected ? 4 : 2.5,
        opacity: 0.95,
        fillColor: zone.color,
        fillOpacity: isSelected ? 0.55 : 0.32,
        dashArray: isSelected ? null : '6, 6'
      });

      // Tooltip flotante con información clave
      const tooltipContent = `
        <div style="font-family: inherit; font-size: 13px; font-weight: 600; color: #0f172a;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
            <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${zone.color};"></span>
            <strong>${zone.nombre}</strong>
          </div>
          <div style="font-size: 11px; color: #475569; font-weight: 500;">
            Nivel: <span style="color: ${zone.color}; font-weight: 700;">${zone.nivelRiesgo}</span> &bull; ${zone.sector}
          </div>
        </div>
      `;

      polygon.bindTooltip(tooltipContent, {
        sticky: true,
        direction: 'top',
        className: 'custom-leaflet-tooltip'
      });

      // Efectos visuales de hover y selección
      polygon.on('mouseover', () => {
        polygon.setStyle({
          weight: 4,
          fillOpacity: 0.6
        });
      });

      polygon.on('mouseout', () => {
        if (!selectedZone || selectedZone.id !== zone.id) {
          polygon.setStyle({
            weight: 2.5,
            fillOpacity: 0.32
          });
        }
      });

      polygon.on('click', () => {
        if (onSelectZone) {
          onSelectZone(zone);
        }
      });

      polygon.addTo(group);
    });
  }, [selectedZone, activeFilter, onSelectZone]);

  // 3. Manejo de animación y desplazamiento suave (flyTo)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !flyTarget) return;

    const { targetCoords, zoomLevel, title, itemType, color } = flyTarget;

    if (targetCoords && targetCoords.length === 2) {
      map.flyTo(targetCoords, zoomLevel || 15, {
        duration: 1.5,
        easeLinearity: 0.25
      });

      // Quitar marcador de búsqueda anterior si existe
      if (searchMarkerRef.current) {
        map.removeLayer(searchMarkerRef.current);
        searchMarkerRef.current = null;
      }

      // Crear icono pulsante personalizado para el punto encontrado
      const pulseHtml = `
        <div class="search-pulse-pin">
          <div class="pulse-ring" style="border-color: ${color || '#3b82f6'};"></div>
          <div class="pulse-dot" style="background-color: ${color || '#3b82f6'};"></div>
        </div>
      `;

      const pulseIcon = L.divIcon({
        className: 'search-marker-container',
        html: pulseHtml,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker(targetCoords, { icon: pulseIcon }).addTo(map);
      marker.bindPopup(`<strong>${title}</strong><br/><small>${itemType === 'ZONA_RIESGO' ? 'Zona de Riesgo Identificada' : 'Punto de Referencia SJL'}</small>`).openPopup();
      searchMarkerRef.current = marker;
    }
  }, [flyTarget]);

  // 4. Modo captura de coordenadas por clic en el mapa (HU-04)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const container = map.getContainer();

    if (isPickingCoordinates) {
      container.style.cursor = 'crosshair';

      const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        if (onCoordinatePicked) {
          onCoordinatePicked({
            lat: Number(lat.toFixed(5)),
            lng: Number(lng.toFixed(5))
          });
        }
      };

      map.on('click', handleMapClick);

      return () => {
        container.style.cursor = '';
        map.off('click', handleMapClick);
      };
    } else {
      container.style.cursor = '';
    }
  }, [isPickingCoordinates, onCoordinatePicked]);

  // 5. Marcador de coordenada seleccionada por el usuario
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (pickedCoordinates && pickedCoordinates.lat && pickedCoordinates.lng) {
      if (pickedMarkerRef.current) {
        map.removeLayer(pickedMarkerRef.current);
      }

      const pinIcon = L.divIcon({
        className: 'custom-pick-icon',
        html: `
          <div style="background-color: #6366f1; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2px solid white; transform: translate(-50%, -100%);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [0, 0]
      });

      const marker = L.marker([pickedCoordinates.lat, pickedCoordinates.lng], {
        icon: pinIcon
      }).addTo(map);

      marker.bindPopup(`<strong>Punto Seleccionado</strong><br/>Lat: ${pickedCoordinates.lat}<br/>Lng: ${pickedCoordinates.lng}`).openPopup();
      pickedMarkerRef.current = marker;
    } else if (pickedMarkerRef.current) {
      map.removeLayer(pickedMarkerRef.current);
      pickedMarkerRef.current = null;
    }
  }, [pickedCoordinates]);

  return (
    <div className="map-wrapper">
      <div id="map-container" ref={mapContainerRef} className="map-view" />
      {isPickingCoordinates && (
        <div className="picking-banner animate-fade-in">
          <span>Haz clic en el mapa sobre la ubicación exacta que deseas sugerir</span>
        </div>
      )}
    </div>
  );
}
