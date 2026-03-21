import React, { useEffect, useState } from 'react';

/**
 * HardwareStats.jsx
 * Mock component: mostra metriche (CPU, GPU, RAM) con barre percentuali.
 * Usa valori simulati aggiornati ogni 2s per dare l'idea di "in tempo reale".
 *
 * Palette: sfondo principale #F5F0F6, testo #091540, accento #F4F482
 */

export default function HardwareStats({ refreshInterval = 2000 }) {
  const [metrics, setMetrics] = useState({
    cpu: 34,
    gpu: 48,
    ram: 62,
  });

  useEffect(() => {
    const id = setInterval(() => {
      setMetrics((prev) => ({
        cpu: Math.max(2, Math.min(98, Math.round(prev.cpu + (Math.random() - 0.5) * 12))),
        gpu: Math.max(2, Math.min(98, Math.round(prev.gpu + (Math.random() - 0.5) * 14))),
        ram: Math.max(2, Math.min(98, Math.round(prev.ram + (Math.random() - 0.5) * 10))),
      }));
    }, refreshInterval);

    return () => clearInterval(id);
  }, [refreshInterval]);

  const bar = (label, value) => (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-[#091540]">{label}</div>
        <div className="text-xs text-gray-500">{value}%</div>
      </div>

      <div className="w-full h-3 bg-white border border-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${value}%`,
            backgroundColor: '#091540',
          }}
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax="100"
          role="progressbar"
        />
      </div>
    </div>
  );

  return (
    <div className="bg-[#F5F0F6] p-6 rounded-xl shadow-sm w-full">
      <h3 className="text-lg font-bold text-[#091540] mb-4">Hardware Stats</h3>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          {bar('CPU (nodi)', metrics.cpu)}
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          {bar('GPU (nodi)', metrics.gpu)}
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          {bar('RAM (nodi)', metrics.ram)}
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        Valori simulati a scopo dimostrativo. Intervallo aggiornamento: {refreshInterval / 1000}s
      </div>
    </div>
  );
}
