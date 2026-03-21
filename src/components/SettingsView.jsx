import React, { useState } from 'react';

/**
 * SettingsView.jsx
 * Form minimale stile Vercel per Nome / Email / Chiave API
 * Campo API nascosto con toggle show/hide.
 */

export default function SettingsView({ initial = { name: 'Mario Rossi', email: 'mario@example.com', apiKey: '' } }) {
  const [name, setName] = useState(initial.name || '');
  const [email, setEmail] = useState(initial.email || '');
  const [apiKey, setApiKey] = useState(initial.apiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    // Mock save - in real app call API
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
  };

  return (
    <div className="bg-[#F5F0F6] p-6 rounded-xl shadow-sm w-full">
      <h3 className="text-lg font-bold text-[#091540] mb-4">Settings</h3>

      <form onSubmit={handleSave} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#091540] mb-1">Nome</label>
          <input
            className="w-full px-4 py-2 border border-gray-200 rounded-md bg-white text-[#091540] focus:outline-none focus:ring-2 focus:ring-[#F4F482]/40"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#091540] mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-200 rounded-md bg-white text-[#091540] focus:outline-none focus:ring-2 focus:ring-[#F4F482]/40"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#091540] mb-1">Chiave API Vora</label>
          <div className="flex gap-2 items-center">
            <input
              type={showKey ? 'text' : 'password'}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-md bg-white text-[#091540] focus:outline-none focus:ring-2 focus:ring-[#F4F482]/40"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowKey((s) => !s)}
              className="px-3 py-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-[#091540]"
            >
              {showKey ? 'Nascondi' : 'Mostra'}
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#F4F482] text-[#091540] font-semibold px-5 py-2 rounded-md hover:opacity-90 disabled:opacity-50"
          >
            {saving ? 'Salvataggio...' : 'Salva impostazioni'}
          </button>
        </div>
      </form>
    </div>
  );
}
