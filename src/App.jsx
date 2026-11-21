import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import MapComponent from './components/MapComponent';
import ZoneDetailPanel from './components/ZoneDetailPanel';
import Legend from './components/Legend';
import CitizenContributionModal from './components/CitizenContributionModal';
import Toast from './components/Toast';
import { INITIAL_MAP_CONFIG, ZONAS_RIESGO } from './data/zonasSJL';
import { getContributions } from './utils/storage';
import './App.css';

export default function App() {
  const [selectedZone, setSelectedZone] = useState(null);
  const [flyTarget, setFlyTarget] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('observacion');
  const [modalPreselectedZone, setModalPreselectedZone] = useState(null);
  const [isPickingCoordinates, setIsPickingCoordinates] = useState(false);
  const [pickedCoordinates, setPickedCoordinates] = useState(null);
  const [activeFilter, setActiveFilter] = useState('TODOS');
  const [toast, setToast] = useState(null);
  const [contributionsCount, setContributionsCount] = useState(0);

  // Inicializar contador de aportes desde localStorage
  useEffect(() => {
    const list = getContributions();
    setContributionsCount(list.length);
  }, []);

  // Temporizador para auto-ocultar toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 6000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Selección de ubicación desde el Buscador (HU-02)
  const handleSelectLocation = (item) => {
    setFlyTarget({
      targetCoords: item.targetCoords,
      zoomLevel: item.zoomLevel || 15,
      title: item.title,
      itemType: item.itemType,
      color: item.color || '#3b82f6'
    });

    if (item.itemType === 'ZONA_RIESGO') {
      const fullZone = ZONAS_RIESGO.find((z) => z.id === item.id) || item;
      setSelectedZone(fullZone);
    } else {
      setSelectedZone(null);
    }
  };

  // Selección de polígono en el mapa (HU-03)
  const handleSelectZoneFromMap = useCallback((zone) => {
    setSelectedZone(zone);
    setFlyTarget({
      targetCoords: zone.centro,
      zoomLevel: 15,
      title: zone.nombre,
      itemType: 'ZONA_RIESGO',
      color: zone.color
    });
  }, []);

  // Botón Recentrar SJL
  const handleResetView = () => {
    setSelectedZone(null);
    setFlyTarget({
      targetCoords: INITIAL_MAP_CONFIG.center,
      zoomLevel: INITIAL_MAP_CONFIG.zoom,
      title: 'San Juan de Lurigancho',
      itemType: 'VISTA_GENERAL',
      color: '#4f46e5'
    });
  };

  // Apertura de modal desde panel de detalle de zona
  const handleReportFromZone = (zone) => {
    setModalPreselectedZone(zone);
    setModalTab('observacion');
    setIsModalOpen(true);
  };

  // Apertura de modal desde Navbar
  const handleOpenReportModal = (tab = 'observacion') => {
    setModalPreselectedZone(null);
    setModalTab(tab);
    setIsModalOpen(true);
  };

  const handleOpenHistoryModal = () => {
    setModalPreselectedZone(null);
    setModalTab('historial');
    setIsModalOpen(true);
  };

  // Flujo de captura de coordenadas en mapa (HU-04)
  const handleStartPicking = () => {
    setIsPickingCoordinates(true);
    setToast({
      type: 'info',
      message: 'Modo captura activado: Haz clic en el mapa sobre la ubicación a sugerir.'
    });
  };

  const handleCoordinatePicked = ({ lat, lng }) => {
    setPickedCoordinates({ lat, lng });
    setIsPickingCoordinates(false);
    setIsModalOpen(true);
    setModalTab('sugerencia');
    setToast({
      type: 'success',
      message: `Punto capturado con éxito: Lat ${lat}, Lng ${lng}`
    });
  };

  return (
    <div className="app-layout">
      {/* 1. Barra de Navegación Superior */}
      <Navbar
        onOpenReport={() => handleOpenReportModal('observacion')}
        onOpenHistory={handleOpenHistoryModal}
        contributionsCount={contributionsCount}
        onResetView={handleResetView}
      />

      {/* 2. Contenedor Principal del Mapa */}
      <main className="map-main-stage">
        {/* Barra de búsqueda flotante con autocompletado en tiempo real (HU-02) */}
        <SearchBar onSelectLocation={handleSelectLocation} />

        {/* Componente del Mapa Leaflet centrado en SJL (HU-01, HU-03) */}
        <MapComponent
          selectedZone={selectedZone}
          onSelectZone={handleSelectZoneFromMap}
          flyTarget={flyTarget}
          isPickingCoordinates={isPickingCoordinates}
          pickedCoordinates={pickedCoordinates}
          onCoordinatePicked={handleCoordinatePicked}
          activeFilter={activeFilter}
        />

        {/* Leyenda interactiva flotante con filtros de riesgo */}
        <Legend
          activeFilter={activeFilter}
          onFilterChange={(filter) => setActiveFilter(filter)}
        />

        {/* Panel lateral con ficha informativa detallada al tocar un polígono (HU-03) */}
        {selectedZone && (
          <ZoneDetailPanel
            zone={selectedZone}
            onClose={() => setSelectedZone(null)}
            onReportObservation={handleReportFromZone}
          />
        )}

        {/* Toast de notificaciones de éxito / validación */}
        <Toast toast={toast} onClose={() => setToast(null)} />
      </main>

      {/* 3. Modal de Aporte Ciudadano y Mociones (HU-04) */}
      <CitizenContributionModal
        isOpen={isModalOpen}
        initialTab={modalTab}
        preselectedZone={modalPreselectedZone}
        onClose={() => setIsModalOpen(false)}
        onStartPickingCoordinates={handleStartPicking}
        pickedCoordinates={pickedCoordinates}
        onClearPickedCoordinates={() => setPickedCoordinates(null)}
        onSuccessToast={(msg) => setToast(msg)}
        onRefreshContributions={(count) => setContributionsCount(count)}
      />
    </div>
  );
}
