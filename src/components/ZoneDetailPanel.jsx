import React from 'react';
import { 
  AlertTriangle, 
  Clock, 
  ShieldAlert, 
  FileText, 
  LifeBuoy, 
  X, 
  MessageSquarePlus, 
  MapPin,
  ChevronRight
} from 'lucide-react';

export default function ZoneDetailPanel({ zone, onClose, onReportObservation }) {
  if (!zone) return null;

  return (
    <aside className="zone-detail-panel animate-slide-left" aria-label="Detalle de zona de riesgo">
      {/* Cabecera del Panel */}
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <span 
            className="panel-risk-dot" 
            style={{ backgroundColor: zone.color }}
          />
          <span className="panel-category-tag">Ficha de Zona Crítica</span>
        </div>
        <button
          onClick={onClose}
          className="panel-close-btn"
          title="Cerrar ficha informativa"
          aria-label="Cerrar panel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="panel-body">
        {/* Título y Sector */}
        <div className="mb-4">
          <h2 className="panel-title">{zone.nombre}</h2>
          <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>Sector: <strong>{zone.sector}</strong></span>
          </div>
        </div>

        {/* Nivel de Riesgo Badge */}
        <div 
          className="risk-banner mb-4"
          style={{
            backgroundColor: `${zone.color}15`,
            borderColor: `${zone.color}40`,
            color: zone.color
          }}
        >
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <div className="flex-1">
            <span className="text-xs uppercase tracking-wider font-bold block">Clasificación Comunitaria</span>
            <span className="text-base font-extrabold">{zone.nivelRiesgo}</span>
          </div>
        </div>

        {/* Incidencia Principal */}
        <div className="panel-section">
          <div className="section-label">
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            <span>Modalidad delictiva principal</span>
          </div>
          <p className="section-text font-semibold text-slate-800">
            {zone.tipoIncidencia}
          </p>
        </div>

        {/* Horario Crítico */}
        <div className="panel-section">
          <div className="section-label">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Horario de mayor incidencia</span>
          </div>
          <div className="critical-time-box">
            {zone.horarioCritico}
          </div>
        </div>

        {/* Justificación Detallada */}
        <div className="panel-section">
          <div className="section-label">
            <FileText className="w-4 h-4 text-indigo-500" />
            <span>Fundamentación y causas</span>
          </div>
          <p className="section-text leading-relaxed text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200/70">
            {zone.justificacion}
          </p>
        </div>

        {/* Recomendación de Autocuidado */}
        {zone.recomendacion && (
          <div className="panel-section">
            <div className="section-label">
              <LifeBuoy className="w-4 h-4 text-emerald-600" />
              <span>Medida preventiva para vecinos</span>
            </div>
            <p className="section-text text-emerald-900 bg-emerald-50/80 p-3 rounded-lg border border-emerald-200/70 text-xs leading-relaxed">
              {zone.recomendacion}
            </p>
          </div>
        )}

        {/* Botón de Acción para HU-04 */}
        <div className="panel-footer-action mt-6 pt-4 border-t border-slate-200">
          <button
            onClick={() => onReportObservation(zone)}
            className="btn btn-primary w-full justify-center"
            title="Presentar moción para reducir o retirar esta zona"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Emitir observación sobre esta zona</span>
            <ChevronRight className="w-4 h-4 ml-auto" />
          </button>
          <p className="text-[11px] text-slate-400 text-center mt-2">
            Tu opinión vecinal ayuda a recalificar las áreas monitoreadas.
          </p>
        </div>
      </div>
    </aside>
  );
}
