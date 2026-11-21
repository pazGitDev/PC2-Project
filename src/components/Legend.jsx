import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { ZONAS_RIESGO } from '../data/zonasSJL';

export default function Legend({ activeFilter, onFilterChange }) {
  const [collapsed, setCollapsed] = useState(false);

  const counts = {
    Alto: ZONAS_RIESGO.filter((z) => z.nivelRiesgo === 'Alto').length,
    Medio: ZONAS_RIESGO.filter((z) => z.nivelRiesgo === 'Medio').length,
    'Precaución': ZONAS_RIESGO.filter((z) => z.nivelRiesgo === 'Precaución').length,
    Total: ZONAS_RIESGO.length
  };

  const filterOptions = [
    { key: 'TODOS', label: 'Todas', count: counts.Total, color: '#475569' },
    { key: 'Alto', label: 'Alto', count: counts.Alto, color: '#ef4444' },
    { key: 'Medio', label: 'Medio', count: counts.Medio, color: '#f97316' },
    { key: 'Precaución', label: 'Precaución', count: counts.Precaución, color: '#eab308' }
  ];

  return (
    <div className="legend-card" role="region" aria-label="Leyenda de niveles de riesgo">
      <div 
        className="legend-header" 
        onClick={() => setCollapsed(!collapsed)}
        role="button"
        tabIndex={0}
      >
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span className="legend-title">Niveles de Peligrosidad</span>
        </div>
        <button className="legend-toggle-btn" aria-label="Alternar leyenda">
          {collapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {!collapsed && (
        <div className="legend-body">
          <p className="legend-hint">
            Filtrar zonas poligonales por nivel:
          </p>

          <div className="legend-filters-grid">
            {filterOptions.map((item) => {
              const isActive = activeFilter === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => onFilterChange(item.key)}
                  className={`legend-pill ${isActive ? 'active-pill' : ''}`}
                  style={{
                    borderColor: isActive ? item.color : '#e2e8f0',
                    backgroundColor: isActive ? `${item.color}15` : '#ffffff',
                    color: isActive ? item.color : '#334155'
                  }}
                >
                  <span
                    className="legend-dot"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="pill-label">{item.label}</span>
                  <span className="pill-count">({item.count})</span>
                </button>
              );
            })}
          </div>

          <div className="legend-footer-info">
            <Eye className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Haz clic en cualquier área resaltada para ver el reporte detallado</span>
          </div>
        </div>
      )}
    </div>
  );
}
