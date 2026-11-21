import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  MapPin, 
  AlertTriangle, 
  FileEdit, 
  History, 
  Crosshair, 
  CheckCircle2, 
  Trash2, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { ZONAS_RIESGO } from '../data/zonasSJL';
import { sanitizeInput, validateText, generateTrackingCode } from '../utils/security';
import { saveContribution, getContributions, removeContribution } from '../utils/storage';

export default function CitizenContributionModal({
  isOpen,
  initialTab = 'observacion', // 'observacion' | 'sugerencia' | 'historial'
  preselectedZone = null,
  onClose,
  onStartPickingCoordinates,
  pickedCoordinates,
  onClearPickedCoordinates,
  onSuccessToast,
  onRefreshContributions
}) {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Formulario 1: Observación sobre zona existente
  const [obsZoneId, setObsZoneId] = useState('');
  const [obsMotionType, setObsMotionType] = useState('reducir'); // 'reducir' | 'retirar' | 'actualizar'
  const [obsJustification, setObsJustification] = useState('');

  // Formulario 2: Sugerencia de nueva zona
  const [sugName, setSugName] = useState('');
  const [sugSector, setSugSector] = useState('');
  const [sugRiskLevel, setSugRiskLevel] = useState('Alto');
  const [sugIncidentType, setSugIncidentType] = useState('Robo al paso');
  const [sugCriticalTime, setSugCriticalTime] = useState('');
  const [sugJustification, setSugJustification] = useState('');

  // Historial de aportes
  const [contributionsList, setContributionsList] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      loadHistory();
      if (preselectedZone) {
        setObsZoneId(preselectedZone.id);
        setActiveTab('observacion');
      } else if (!obsZoneId && ZONAS_RIESGO.length > 0) {
        setObsZoneId(ZONAS_RIESGO[0].id);
      }
    }
  }, [isOpen, initialTab, preselectedZone]);

  const loadHistory = () => {
    const list = getContributions();
    setContributionsList(list);
    if (onRefreshContributions) onRefreshContributions(list.length);
  };

  if (!isOpen) return null;

  // Manejo de envío: Observación sobre zona existente
  const handleSubmitObservation = (e) => {
    e.preventDefault();
    setFormErrors({});

    const selectedZoneObj = ZONAS_RIESGO.find((z) => z.id === obsZoneId);
    if (!selectedZoneObj) {
      setFormErrors({ obsZone: 'Debes seleccionar una zona registrada.' });
      return;
    }

    const valJust = validateText(obsJustification, 10, 500);
    if (!valJust.valid) {
      setFormErrors({ obsJustification: valJust.error });
      return;
    }

    const sanitizedJust = sanitizeInput(obsJustification);
    const code = generateTrackingCode();

    const motionLabels = {
      reducir: 'Moción para reducir nivel de peligrosidad',
      retirar: 'Moción para retirar zona del mapa de riesgo',
      actualizar: 'Actualización de incidencias u horarios'
    };

    const newRecord = {
      id: `obs-${Date.now()}`,
      tipoAporte: 'OBSERVACION_EXISTENTE',
      codigoTramite: code,
      zonaId: selectedZoneObj.id,
      zonaNombre: selectedZoneObj.nombre,
      sector: selectedZoneObj.sector,
      mocion: motionLabels[obsMotionType] || obsMotionType,
      justificacion: sanitizedJust,
      estado: 'En revisión comunitaria',
      fechaCreacion: new Date().toLocaleString('es-PE', {
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    };

    const saved = saveContribution(newRecord);
    if (saved) {
      loadHistory();
      setObsJustification('');
      if (onSuccessToast) {
        onSuccessToast({
          type: 'success',
          message: `Observación sobre "${selectedZoneObj.nombre}" registrada correctamente.`,
          code
        });
      }
      setActiveTab('historial');
    }
  };

  // Manejo de envío: Sugerencia de nueva zona
  const handleSubmitSuggestion = (e) => {
    e.preventDefault();
    setFormErrors({});

    const valName = validateText(sugName, 4, 100);
    if (!valName.valid) {
      setFormErrors({ sugName: valName.error });
      return;
    }

    const valJust = validateText(sugJustification, 10, 500);
    if (!valJust.valid) {
      setFormErrors({ sugJustification: valJust.error });
      return;
    }

    const sanitizedName = sanitizeInput(sugName);
    const sanitizedSector = sanitizeInput(sugSector) || 'San Juan de Lurigancho';
    const sanitizedTime = sanitizeInput(sugCriticalTime) || 'Horario variable';
    const sanitizedJust = sanitizeInput(sugJustification);
    const code = generateTrackingCode();

    const newRecord = {
      id: `sug-${Date.now()}`,
      tipoAporte: 'NUEVA_ZONA_SUGERIDA',
      codigoTramite: code,
      zonaNombre: sanitizedName,
      sector: sanitizedSector,
      nivelRiesgo: sugRiskLevel,
      tipoIncidencia: sugIncidentType,
      horarioCritico: sanitizedTime,
      coordenadas: pickedCoordinates ? [pickedCoordinates.lat, pickedCoordinates.lng] : null,
      justificacion: sanitizedJust,
      estado: 'En evaluación vecinal',
      fechaCreacion: new Date().toLocaleString('es-PE', {
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    };

    const saved = saveContribution(newRecord);
    if (saved) {
      loadHistory();
      setSugName('');
      setSugSector('');
      setSugCriticalTime('');
      setSugJustification('');
      if (onClearPickedCoordinates) onClearPickedCoordinates();
      if (onSuccessToast) {
        onSuccessToast({
          type: 'success',
          message: `Sugerencia de zona "${sanitizedName}" enviada con éxito.`,
          code
        });
      }
      setActiveTab('historial');
    }
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('¿Deseas retirar este aporte de tu historial local?')) {
      removeContribution(id);
      loadHistory();
    }
  };

  return (
    <div className="modal-backdrop animate-fade-in" role="dialog" aria-modal="true">
      <div className="modal-card animate-scale-up">
        {/* Cabecera del Modal */}
        <div className="modal-header">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="modal-title">Participación y Aporte Ciudadano</h2>
              <p className="modal-subtitle">
                Sistema transparente y abierto para vecinos de San Juan de Lurigancho
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="modal-close-btn"
            title="Cerrar ventana"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pestañas de Navegación Modal */}
        <div className="modal-tabs">
          <button
            onClick={() => setActiveTab('observacion')}
            className={`modal-tab-btn ${activeTab === 'observacion' ? 'active-tab' : ''}`}
          >
            <FileEdit className="w-4 h-4" />
            <span>1. Observación de Zona</span>
          </button>
          <button
            onClick={() => setActiveTab('sugerencia')}
            className={`modal-tab-btn ${activeTab === 'sugerencia' ? 'active-tab' : ''}`}
          >
            <MapPin className="w-4 h-4" />
            <span>2. Sugerir Nueva Zona</span>
          </button>
          <button
            onClick={() => setActiveTab('historial')}
            className={`modal-tab-btn ${activeTab === 'historial' ? 'active-tab' : ''}`}
          >
            <History className="w-4 h-4" />
            <span>Mis Aportes ({contributionsList.length})</span>
          </button>
        </div>

        {/* Contenido según pestaña activa */}
        <div className="modal-body">
          {/* TAB 1: Observación sobre zona existente */}
          {activeTab === 'observacion' && (
            <form onSubmit={handleSubmitObservation} className="form-layout">
              <div className="form-info-banner">
                <AlertCircle className="w-4 h-4 shrink-0 text-indigo-600" />
                <p className="text-xs text-indigo-900 leading-relaxed">
                  ¿Consideras que una zona ya no es peligrosa o que su nivel de riesgo ha cambiado gracias a mayor patrullaje vecinal? Presenta tu moción fundamentada.
                </p>
              </div>

              {/* Selector de Zona */}
              <div className="form-group">
                <label className="form-label" htmlFor="obs-zone-select">
                  Zona de riesgo a observar *
                </label>
                <select
                  id="obs-zone-select"
                  value={obsZoneId}
                  onChange={(e) => setObsZoneId(e.target.value)}
                  className="form-input form-select"
                  required
                >
                  {ZONAS_RIESGO.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.nombre} ({z.nivelRiesgo} • {z.sector})
                    </option>
                  ))}
                </select>
                {formErrors.obsZone && (
                  <p className="form-error">{formErrors.obsZone}</p>
                )}
              </div>

              {/* Tipo de Moción */}
              <div className="form-group">
                <label className="form-label">Propósito de la moción *</label>
                <div className="radio-grid">
                  <label className="radio-card">
                    <input
                      type="radio"
                      name="motionType"
                      value="reducir"
                      checked={obsMotionType === 'reducir'}
                      onChange={() => setObsMotionType('reducir')}
                    />
                    <div>
                      <span className="font-semibold block text-slate-800 text-xs">
                        Reducir nivel de riesgo
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Mejora en seguridad e iluminación comprobada.
                      </span>
                    </div>
                  </label>

                  <label className="radio-card">
                    <input
                      type="radio"
                      name="motionType"
                      value="retirar"
                      checked={obsMotionType === 'retirar'}
                      onChange={() => setObsMotionType('retirar')}
                    />
                    <div>
                      <span className="font-semibold block text-slate-800 text-xs">
                        Retirar del mapa de riesgo
                      </span>
                      <span className="text-[11px] text-slate-500">
                        La zona ya no representa peligro para los vecinos.
                      </span>
                    </div>
                  </label>

                  <label className="radio-card">
                    <input
                      type="radio"
                      name="motionType"
                      value="actualizar"
                      checked={obsMotionType === 'actualizar'}
                      onChange={() => setObsMotionType('actualizar')}
                    />
                    <div>
                      <span className="font-semibold block text-slate-800 text-xs">
                        Actualizar información
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Nuevas modalidades delictivas u horarios críticos.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Justificación Obligatoria */}
              <div className="form-group">
                <label className="form-label" htmlFor="obs-justification">
                  Justificación obligatoria de la observación *
                </label>
                <textarea
                  id="obs-justification"
                  rows={4}
                  value={obsJustification}
                  onChange={(e) => setObsJustification(e.target.value)}
                  placeholder="Explica detalladamente las razones vecinales, mejoras visibles (cámaras, alarmas, presencia PNP) o motivos del cambio solicitado..."
                  className={`form-input ${formErrors.obsJustification ? 'input-error' : ''}`}
                  maxLength={500}
                  required
                />
                <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
                  <span>Mínimo 10 caracteres. Texto sanitizado automáticamente contra XSS.</span>
                  <span>{obsJustification.length} / 500</span>
                </div>
                {formErrors.obsJustification && (
                  <p className="form-error">{formErrors.obsJustification}</p>
                )}
              </div>

              <div className="form-actions">
                <button type="button" onClick={onClose} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  <Send className="w-4 h-4" />
                  <span>Enviar Moción Ciudadana</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Sugerencia de nueva zona de riesgo */}
          {activeTab === 'sugerencia' && (
            <form onSubmit={handleSubmitSuggestion} className="form-layout">
              <div className="form-info-banner bg-amber-50 border-amber-200">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  ¿Identificaste un punto crítico en SJL que no se encuentra mapeado? Ingresa la ubicación y detalles para alertar a la comunidad vecinal.
                </p>
              </div>

              {/* Nombre y Sector */}
              <div className="grid-2-cols">
                <div className="form-group">
                  <label className="form-label" htmlFor="sug-name">
                    Nombre de la calle, avenida o referencia *
                  </label>
                  <input
                    id="sug-name"
                    type="text"
                    value={sugName}
                    onChange={(e) => setSugName(e.target.value)}
                    placeholder="Ej. Av. Fernando Wiesse cdra. 35"
                    className={`form-input ${formErrors.sugName ? 'input-error' : ''}`}
                    required
                  />
                  {formErrors.sugName && (
                    <p className="form-error">{formErrors.sugName}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="sug-sector">
                    Sector o Urbanización en SJL
                  </label>
                  <input
                    id="sug-sector"
                    type="text"
                    value={sugSector}
                    onChange={(e) => setSugSector(e.target.value)}
                    placeholder="Ej. Mariscal Cáceres, Huáscar, Canto Rey..."
                    className="form-input"
                  />
                </div>
              </div>

              {/* Captura de Coordenadas en Mapa */}
              <div className="form-group">
                <label className="form-label">Coordenadas geográficas en el mapa</label>
                <div className="coord-picker-box">
                  <button
                    type="button"
                    onClick={() => {
                      if (onStartPickingCoordinates) {
                        onStartPickingCoordinates();
                      }
                      onClose(); // Cierra temporalmente para permitir clic en mapa
                    }}
                    className="btn btn-outline text-xs"
                    title="Activar puntero en el mapa"
                  >
                    <Crosshair className="w-4 h-4 text-indigo-600" />
                    <span>Hacer clic en el mapa para capturar punto</span>
                  </button>

                  <div className="coord-display">
                    {pickedCoordinates ? (
                      <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                        Lat: {pickedCoordinates.lat}, Lng: {pickedCoordinates.lng}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 italic">
                        (Opcional) Ningún punto seleccionado aún en el mapa
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Nivel de Riesgo y Modalidad */}
              <div className="grid-2-cols">
                <div className="form-group">
                  <label className="form-label" htmlFor="sug-risk">
                    Nivel de riesgo estimado *
                  </label>
                  <select
                    id="sug-risk"
                    value={sugRiskLevel}
                    onChange={(e) => setSugRiskLevel(e.target.value)}
                    className="form-input form-select"
                  >
                    <option value="Alto">Riesgo Alto (Peligro crítico)</option>
                    <option value="Medio">Riesgo Medio (Frecuencia recurrente)</option>
                    <option value="Precaución">Precaución (Horario focalizado)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="sug-incident">
                    Tipo de incidencia principal *
                  </label>
                  <select
                    id="sug-incident"
                    value={sugIncidentType}
                    onChange={(e) => setSugIncidentType(e.target.value)}
                    className="form-input form-select"
                  >
                    <option value="Robo al paso en motocicleta">Robo al paso en motocicleta</option>
                    <option value="Arrebato de celulares en paradero">Arrebato de celulares en paradero</option>
                    <option value="Asalto a transporte público / mototaxis">Asalto a transporte público / mototaxis</option>
                    <option value="Microcomercialización de sustancias">Microcomercialización de sustancias</option>
                    <option value="Cobro de cupos / Extorsión vecinal">Cobro de cupos / Extorsión vecinal</option>
                    <option value="Escasa iluminación y punto ciego">Escasa iluminación y punto ciego</option>
                  </select>
                </div>
              </div>

              {/* Horario Crítico */}
              <div className="form-group">
                <label className="form-label" htmlFor="sug-time">
                  Horario de mayor incidencia aproximado
                </label>
                <input
                  id="sug-time"
                  type="text"
                  value={sugCriticalTime}
                  onChange={(e) => setSugCriticalTime(e.target.value)}
                  placeholder="Ej. Noches a partir de las 20:00 hrs o madrugadas"
                  className="form-input"
                />
              </div>

              {/* Justificación */}
              <div className="form-group">
                <label className="form-label" htmlFor="sug-justification">
                  Justificación y hechos observados *
                </label>
                <textarea
                  id="sug-justification"
                  rows={3}
                  value={sugJustification}
                  onChange={(e) => setSugJustification(e.target.value)}
                  placeholder="Describe los hechos que motivan la sugerencia de esta nueva zona de riesgo..."
                  className={`form-input ${formErrors.sugJustification ? 'input-error' : ''}`}
                  maxLength={500}
                  required
                />
                <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
                  <span>Mínimo 10 caracteres. Sanitizado contra scripts maliciosos.</span>
                  <span>{sugJustification.length} / 500</span>
                </div>
                {formErrors.sugJustification && (
                  <p className="form-error">{formErrors.sugJustification}</p>
                )}
              </div>

              <div className="form-actions">
                <button type="button" onClick={onClose} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  <Send className="w-4 h-4" />
                  <span>Registrar Sugerencia Vecinal</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: Historial de aportes del usuario en LocalStorage */}
          {activeTab === 'historial' && (
            <div className="history-container">
              {contributionsList.length > 0 ? (
                <div className="history-list">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-xs font-semibold text-slate-600">
                      Total aportes registrados en este navegador: {contributionsList.length}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Guardado seguro en cliente (LocalStorage)
                    </span>
                  </div>

                  {contributionsList.map((item) => (
                    <div key={item.id} className="history-card">
                      <div className="history-card-header">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="history-badge">
                              {item.tipoAporte === 'OBSERVACION_EXISTENTE'
                                ? 'Moción de Zona'
                                : 'Nueva Zona Sugerida'}
                            </span>
                            <span className="status-pill">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
                              {item.estado}
                            </span>
                          </div>
                          <h4 className="history-card-title mt-1.5">
                            {item.zonaNombre}
                          </h4>
                        </div>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="history-delete-btn"
                          title="Eliminar de mi historial local"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="history-card-meta">
                        <span>Código: <strong>{item.codigoTramite}</strong></span>
                        &bull;
                        <span>Sector: {item.sector}</span>
                        &bull;
                        <span>Fecha: {item.fechaCreacion}</span>
                      </div>

                      {item.mocion && (
                        <p className="text-xs font-medium text-indigo-700 bg-indigo-50/70 p-2 rounded mt-2">
                          Propósito: {item.mocion}
                        </p>
                      )}

                      {item.nivelRiesgo && (
                        <p className="text-xs text-slate-600 mt-2">
                          Riesgo estimado: <strong>{item.nivelRiesgo}</strong> &bull; Incidencia: <em>{item.tipoIncidencia}</em>
                        </p>
                      )}

                      <p className="history-justification mt-2">
                        "{item.justificacion}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-history-state">
                  <History className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="font-semibold text-slate-700 text-sm">
                    No has registrado aportes todavía
                  </p>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 mb-4">
                    Tus mociones u observaciones de zonas se guardarán en este dispositivo para que puedas consultarlas en cualquier momento.
                  </p>
                  <button
                    onClick={() => setActiveTab('sugerencia')}
                    className="btn btn-outline text-xs"
                  >
                    Crear mi primer aporte vecinal
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
