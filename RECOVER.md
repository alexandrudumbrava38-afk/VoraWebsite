Guida rapida per recuperare file scomparsi

1) Controlla se il progetto è sotto git:
   git status

2) Vedi i commit recenti:
   git log --oneline

3) Usa il reflog per trovare recenti cambi di branch/reset:
   git reflog

4) Per recuperare un file da un commit:
   git checkout <commit> -- path/to/file

5) Per ripristinare lo stato del branch a prima di una operazione recente:
   git checkout HEAD@{1}

6) Se non hai git:
   - Controlla il Cestino del sistema operativo.
   - Controlla Time Machine (macOS) o snapshot (Windows).
   - Controlla l'estensione "Local History" di VS Code.

Se vuoi, copia qui l'output di 'git status' e 'git reflog' e ti dico il comando esatto da eseguire.
