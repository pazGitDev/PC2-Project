import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const { type = 'info', message, code } = toast;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-500',
    warning: 'border-amber-500',
    info: 'border-blue-500'
  };

  return (
    <div className={`toast-container animate-slide-up border-l-4 ${borderColors[type] || 'border-blue-500'}`}>
      <div className="flex items-start gap-3">
        {icons[type] || icons.info}
        <div className="flex-1 pr-2">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{message}</p>
          {code && (
            <p className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-1 inline-block">
              Código de trámite: <strong>{code}</strong>
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
          aria-label="Cerrar notificación"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
