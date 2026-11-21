import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, AlertTriangle, Train, Building2, Navigation } from 'lucide-react';
import { ZONAS_RIESGO, PUNTOS_REFERENCIA } from '../data/zonasSJL';

export default function SearchBar({ onSelectLocation }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchContainerRef = useRef(null);

  // Normalizar texto para búsqueda sin tildes ni mayúsculas
  const normalize = (text) =>
    (text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const normalizedQuery = normalize(query.trim());

  // Filtrar zonas de riesgo
  const matchedZones = normalizedQuery
    ? ZONAS_RIESGO.filter(
        (z) =>
          normalize(z.nombre).includes(normalizedQuery) ||
          normalize(z.sector).includes(normalizedQuery) ||
          normalize(z.tipoIncidencia).includes(normalizedQuery)
      ).map((z) => ({
        ...z,
        itemType: 'ZONA_RIESGO',
        title: z.nombre,
        subtitle: `${z.sector} • ${z.nivelRiesgo}`,
        targetCoords: z.centro,
        zoomLevel: 15
      }))
    : [];

  // Filtrar puntos de referencia
  const matchedReferences = normalizedQuery
    ? PUNTOS_REFERENCIA.filter(
        (r) =>
          normalize(r.nombre).includes(normalizedQuery) ||
          normalize(r.categoria).includes(normalizedQuery) ||
          normalize(r.descripcion).includes(normalizedQuery)
      ).map((r) => ({
        ...r,
        itemType: 'PUNTO_REFERENCIA',
        title: r.nombre,
        subtitle: `${r.categoria} • ${r.tipo}`,
        targetCoords: r.coordenadas,
        zoomLevel: 16
      }))
    : [];

  const combinedResults = [...matchedZones, ...matchedReferences];

  // Cerrar al hacer clic fuera del componente
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Manejar teclado: flechas, Enter y Escape
  const handleKeyDown = (e) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < combinedResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : combinedResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && combinedResults[activeIndex]) {
        handleSelectItem(combinedResults[activeIndex]);
      } else if (combinedResults.length > 0) {
        handleSelectItem(combinedResults[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelectItem = (item) => {
    setQuery(item.title);
    setIsOpen(false);
    setActiveIndex(-1);
    if (onSelectLocation) {
      onSelectLocation(item);
    }
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const getItemIcon = (item) => {
    if (item.itemType === 'ZONA_RIESGO') {
      return (
        <span
          className="result-icon-badge"
          style={{ backgroundColor: `${item.color}20`, color: item.color }}
        >
          <AlertTriangle className="w-4 h-4" />
        </span>
      );
    }
    if (item.categoria === 'Estación Metro') {
      return (
        <span className="result-icon-badge bg-emerald-100 text-emerald-700">
          <Train className="w-4 h-4" />
        </span>
      );
    }
    return (
      <span className="result-icon-badge bg-blue-100 text-blue-700">
        <MapPin className="w-4 h-4" />
      </span>
    );
  };

  return (
    <div className="search-bar-wrapper" ref={searchContainerRef}>
      <div className="search-input-box">
        <Search className="search-icon-left" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => {
            if (query.trim().length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Buscar avenida, estación, paradero o zona de riesgo en SJL..."
          className="search-input"
          aria-label="Buscar en San Juan de Lurigancho"
        />
        {query && (
          <button
            onClick={handleClear}
            className="search-clear-btn"
            title="Limpiar búsqueda"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Menú de resultados desplegable */}
      {isOpen && query.trim().length > 0 && (
        <div className="search-dropdown-menu">
          {combinedResults.length > 0 ? (
            <div className="search-results-list">
              {combinedResults.map((item, index) => {
                const isSelected = index === activeIndex;
                return (
                  <div
                    key={`${item.itemType}-${item.id}`}
                    onClick={() => handleSelectItem(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`search-result-item ${isSelected ? 'active-item' : ''}`}
                    role="button"
                    tabIndex={0}
                  >
                    {getItemIcon(item)}
                    <div className="result-content">
                      <div className="result-title-row">
                        <span className="result-title">{item.title}</span>
                        {item.itemType === 'ZONA_RIESGO' ? (
                          <span
                            className="result-tag"
                            style={{
                              backgroundColor: `${item.color}18`,
                              color: item.color,
                              borderColor: `${item.color}40`
                            }}
                          >
                            {item.nivelRiesgo}
                          </span>
                        ) : (
                          <span className="result-tag tag-reference">
                            {item.categoria}
                          </span>
                        )}
                      </div>
                      <p className="result-subtitle">{item.subtitle}</p>
                    </div>
                    <Navigation className="result-arrow-icon" />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="search-no-results">
              <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="no-results-title">No se encontraron coincidencias en SJL</p>
              <p className="no-results-desc">
                No hay resultados para "<strong>{query}</strong>". Intenta buscar nombres como:{' '}
                <em>Bayóvar, Zárate, Próceres, Huáscar, Canto Grande o Puente Nuevo</em>.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
