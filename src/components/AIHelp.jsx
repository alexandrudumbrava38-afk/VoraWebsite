import React from 'react';

/**
 * AIHelp.jsx
 * Pagina finta di documentazione API con blocchi di codice scuri e testi
 * Spaziatura e stile minimale da piattaforma cloud.
 */

const sampleCurl = `curl -X POST https://api.vora.example/tasks \\\n  -H "Authorization: Bearer <API_KEY>" \\\n  -H "Content-Type: text/plain" \\\n  --data-binary @prompt.txt`;

const sampleJs = `const res = await fetch('https://api.vora.example/tasks', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + API_KEY,
    'Content-Type': 'text/plain'
  },
  body: promptText
});
const data = await res.json();`;

export default function AIHelp() {
  return (
    <div className="bg-[#F5F0F6] p-6 rounded-xl shadow-sm w-full">
      <h3 className="text-lg font-bold text-[#091540] mb-3">Documentazione API - Vora</h3>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 space-y-4">
        <p className="text-sm text-[#091540]">
          Endpoint per la creazione di task distribuiti. Invia il prompt come testo semplice o allega un file.
          Le risposte sono rese disponibili tramite URL pubblico una volta completati i task.
        </p>

        <div>
          <div className="text-xs font-semibold text-[#091540] mb-2">Esempio: curl</div>
          <pre className="rounded-md overflow-auto p-4 text-sm" style={{ backgroundColor: '#091540', color: '#F5F0F6' }}>
            <code>{sampleCurl}</code>
          </pre>
        </div>

        <div>
          <div className="text-xs font-semibold text-[#091540] mb-2">Esempio: JavaScript (fetch)</div>
          <pre className="rounded-md overflow-auto p-4 text-sm" style={{ backgroundColor: '#091540', color: '#F5F0F6' }}>
            <code>{sampleJs}</code>
          </pre>
        </div>

        <div className="text-sm text-gray-500">
          Parametri chiave:
          <ul className="list-disc ml-5 mt-2 text-gray-500">
            <li><span className="text-[#091540] font-medium">Authorization</span>: Bearer &lt;API_KEY&gt;</li>
            <li><span className="text-[#091540] font-medium">Content-Type</span>: text/plain (o multipart/form-data per file)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
