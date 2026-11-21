import React from 'react';
import { ShieldAlert, PlusCircle, BookmarkCheck, PhoneCall, RotateCcw } from 'lucide-react';

export default function Navbar({ onOpenReport, onOpenHistory, contributionsCount, onResetView }) {
  return (
    <header className="app-header">
      <div className="header-container">
        {/* Marca y Título */}
        <div className="brand-group">
          <div className="brand-icon-wrapper">
            <ShieldAlert className="brand-icon" />
          </div>
          <div>
            <div className="brand-title-row">
              <h1 className="brand-title">Mapa Seguro SJL</h1>
              <span className="badge-citizen">Modo Ciudadano</span>
            </div>
            <p className="brand-subtitle">
              San Juan de Lurigancho &bull; Plataforma Colaborativa de Prevención
            </p>
          </div>
        </div>

        {/* Números de emergencia informativos y botones de acción */}
        <div className="header-actions">
          <div className="emergency-pill hidden-md">
            <PhoneCall className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>
              <strong>105</strong> PNP &bull; <strong>(01) 315-1515</strong> Serenazgo SJL
            </span>
          </div>

          <button
            onClick={onResetView}
            className="btn btn-secondary"
            title="Volver a la vista general de San Juan de Lurigancho"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden-sm">Recentrar SJL</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="btn btn-outline"
            title="Consultar aportes registrados en este dispositivo"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>Mis Aportes</span>
            {contributionsCount > 0 && (
              <span className="counter-badge">{contributionsCount}</span>
            )}
          </button>

          <button
            onClick={() => onOpenReport()}
            className="btn btn-primary"
            title="Enviar una sugerencia o moción de zona"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Aporte Ciudadano</span>
          </button>
        </div>
      </div>
    </header>
  );
}
