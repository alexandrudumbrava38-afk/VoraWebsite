import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";

export default function RichiedenteView() {
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  
  const [promptText, setPromptText] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Stati per la visualizzazione Modale
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalLoading, setModalLoading] = useState(false);

  const textareaRef = useRef(null);

  useEffect(() => {
    fetchTasks();
    const subscription = supabase
      .channel("tasks-updates")
      .on("postgres_changes", { event: "*", schema: "public", table: "tasks" }, (payload) => {
        fetchTasks();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function fetchTasks() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    try {
      setLoadingTasks(true);
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("richiedente_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (e) {
      console.error(e);
      setError("Errore nel caricamento dei task");
    } finally {
      setLoadingTasks(false);
    }
  }

  // Auto-resize Textarea
  const handleTextareaChange = (e) => {
    setPromptText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Funzione unificata di invio: priorità al file se presente, altrimenti crea un .txt dal prompt
  async function handleSubmit() {
    if (!promptText.trim() && !file) return;
    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Utente non loggato");

      let publicUrl = null;

      if (file) {
        const path = `${Date.now()}_${file.name}`;
        const { error: upErr } = await supabase.storage.from("task_files").upload(path, file);
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from("task_files").getPublicUrl(path);
        publicUrl = pub.publicUrl;
      } else if (promptText.trim()) {
        const blob = new Blob([promptText], { type: "text/plain" });
        const path = `${Date.now()}_prompt.txt`;
        const { error: upErr } = await supabase.storage.from("task_files").upload(path, blob);
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from("task_files").getPublicUrl(path);
        publicUrl = pub.publicUrl;
      }

      if (publicUrl) {
        const { error: dbErr } = await supabase.from("tasks").insert([{ 
          richiedente_id: user.id,
          file_url: publicUrl,
          status: "pending",
          reward: 10
        }]);
        if (dbErr) throw dbErr;
      }

      setPromptText("");
      setFile(null);
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
    } catch (err) {
      alert("Errore: " + err.message);
    } finally {
      setUploading(false);
    }
  }

  // Apri Modale
  async function apriRisultato(url) {
    setIsModalOpen(true);
    setModalLoading(true);
    try {
      const response = await fetch(url);
      const text = await response.text();
      setModalContent(text);
    } catch (e) {
      setModalContent("Errore di caricamento del file di testo.");
    } finally {
      setModalLoading(false);
    }
  }

  // Estrai il nome dal file URL
  const getFileName = (url) => {
    if (!url) return "Sconosciuto";
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start w-full relative">
      
      {/* SEZIONE SINISTRA: Creazione Task unificata */}
      <div className="w-full lg:w-2/3 bg-[#F5F0F6] rounded-xl p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#091540]">Creazione Task</h2>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-sm font-semibold text-[#091540]">Scrivi il prompt</label>
          <textarea
            ref={textareaRef}
            rows={1}
            value={promptText}
            onChange={handleTextareaChange}
            placeholder="Es: Scrivi un breve riassunto tecnico su computing distribuito..."
            className="w-full p-4 rounded-xl bg-white text-[#091540] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#091540]/30 resize-none overflow-y-auto max-h-64 min-h-[60px]"
          />

          <label className="text-sm font-semibold text-[#091540]">Allega dataset (opzionale)</label>
          <div className="flex items-center gap-4">
            <label className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-[#091540] cursor-pointer hover:bg-[#F4F482]/10">
              Seleziona file
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
            </label>
            <div className="text-sm text-[#091540] truncate max-w-[60%]">{file ? file.name : "Nessun file selezionato"}</div>
            <div className="ml-auto">
              <button
                onClick={handleSubmit}
                disabled={uploading || (!promptText.trim() && !file)}
                className="bg-[#F4F482] text-[#091540] font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Invia
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500">I contenuti inviati verranno trasformati in file e distribuiti ai nodi.</p>
        </div>
      </div>

      {/* SEZIONE DESTRA: TASK (stile minimale, padding uniforme, card w-full) */}
      <div className="w-full lg:w-1/3 bg-[#F5F0F6] rounded-xl p-4 shadow-sm flex flex-col max-h-[600px]">
        <h2 className="text-lg font-bold text-[#091540] mb-4">I tuoi Task AI</h2>

        <div className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden w-full">
          {loadingTasks && <p className="text-sm text-[#091540]">Caricamento...</p>}

          {tasks.map(task => (
            <div key={task.id} className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col gap-2">
              {/* Nome file (font mono) */}
              <div className="font-mono text-sm text-[#091540] font-semibold truncate w-full" title={getFileName(task.file_url)}>
                {getFileName(task.file_url)}
              </div>

              <div className="text-xs text-gray-400">{new Date(task.created_at).toLocaleString()}</div>

              <div className="flex items-center justify-between mt-2 w-full">
                <span className={`text-xs font-semibold uppercase ${task.status === 'completed' ? 'text-green-600' : 'text-orange-400'}`}>
                  {task.status}
                </span>

                {task.status === 'completed' && task.result_url && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => apriRisultato(task.result_url)}
                      className="text-xs px-2 py-1 rounded-md font-medium"
                      style={{ backgroundColor: 'rgba(9,21,64,0.04)', color: '#091540' }}
                    >
                      Visualizza
                    </button>
                    <a
                      href={task.result_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs px-2 py-1 rounded-md font-medium"
                      style={{ backgroundColor: '#F4F482', color: '#091540' }}
                    >
                      Scarica
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL PER LEGGERE IL TESTO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(9, 21, 64, 0.8)" }}>
          <div className="bg-[#F5F0F6] w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden">
            <div className="p-4 bg-[#091540] text-white flex justify-between items-center">
              <h3 className="font-bold text-lg text-[#F4F482]">Risultato AI Vora</h3>
              <button onClick={() => setIsModalOpen(false)} className="font-bold text-xl hover:text-red-400">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto whitespace-pre-wrap font-mono text-sm text-[#091540] bg-white m-4 rounded-xl border border-gray-200">
              {modalLoading ? "Caricamento in corso..." : modalContent}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}