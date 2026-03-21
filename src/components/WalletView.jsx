import React from 'react';

/**
 * WalletView.jsx
 * Mostra bilancio VORA e una tabella minimale delle ultime transazioni.
 * Design minimale, border sottile e font compatto per le righe.
 */

const MOCK_TRANSACTIONS = [
  { id: 'TX-001', date: '2026-03-20 14:12', type: 'Task pagato', amount: '+120' },
  { id: 'TX-002', date: '2026-03-19 09:03', type: 'Token guadagnati', amount: '+50' },
  { id: 'TX-003', date: '2026-03-17 18:45', type: 'Task pagato', amount: '+200' },
];

export default function WalletView({ balance = 3840 }) {
  return (
    <div className="bg-[#F5F0F6] p-6 rounded-xl shadow-sm w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[#091540]">Wallet</h3>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-4">
        <div className="text-xs text-gray-500">Saldo totale</div>
        <div className="mt-2 flex items-baseline gap-3">
          <div className="text-4xl font-extrabold text-[#091540]">{Number(balance).toLocaleString()}</div>
          <div className="text-sm font-medium text-[#091540]">VORA</div>
        </div>
        <div className="mt-3 text-xs text-gray-500">Bilancio disponibile per pagamenti ai nodi.</div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-white">
            <tr>
              <th className="px-4 py-3 font-medium text-[#091540]">ID</th>
              <th className="px-4 py-3 font-medium text-[#091540]">Data</th>
              <th className="px-4 py-3 font-medium text-[#091540]">Tipo</th>
              <th className="px-4 py-3 font-medium text-[#091540] text-right">Importo</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_TRANSACTIONS.map((tx) => (
              <tr key={tx.id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-mono text-[#091540]">{tx.id}</td>
                <td className="px-4 py-3 text-gray-500">{tx.date}</td>
                <td className="px-4 py-3 text-[#091540]">{tx.type}</td>
                <td className="px-4 py-3 text-right font-semibold text-[#091540]">{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
