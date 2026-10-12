# 📤 BRK App auf GitHub hochladen

## 📋 Vorbereitung

Du brauchst:
- ✅ GitHub Account (hast du: m2cnknny9d-eng)
- ✅ Git installiert
- ✅ GitHub Personal Access Token

---

## 🔑 Schritt 1: GitHub Token generieren

1. **Öffne:** https://github.com/settings/tokens
2. **Klick:** "Generate new token" (rechts oben)
3. **Wähle:** "Generate new token (classic)"
4. **Ausfüllen:**
   - Note: `brk-app-token`
   - Expiration: `90 days`
5. **Checkboxes ankreuzen:**
   - ✅ `repo` (alle Sub-Optionen)
   - ✅ `workflow`
6. **Klick:** "Generate token"
7. **WICHTIG:** Kopiere den Token sofort (Du kannst ihn nicht nochmal sehen!)
   ```
   ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

---

## 📱 Schritt 2: Repository auf GitHub erstellen

1. **Öffne:** https://github.com/new
2. **Ausfüllen:**
   - Repository name: `brk-app`
   - Description: `BRK Bayern Ehrenamtsapp`
   - Visibility: `Private` (nur du sehen)
3. **Wichtig:** NICHT initialisieren (keine Checkboxes!)
4. **Klick:** "Create repository"

Du siehst dann eine Seite mit Befehlen. Das ist genau was du brauchst!

---

## 💻 Schritt 3: Auf deinem Computer

**Öffne Terminal/PowerShell und führe folgende Befehle aus:**

### 3.1 Ins Verzeichnis gehen
```bash
cd /home/claude/brk-app
```

Oder wenn das Verzeichnis woanders ist:
```bash
cd [path-zu-brk-app]
```

### 3.2 Git konfigurieren (nur beim ersten Mal nötig)
```bash
git config --global user.email "deine@email.com"
git config --global user.name "Dein Name"
```

### 3.3 Remote hinzufügen
```bash
git remote add origin https://github.com/m2cnknny9d-eng/brk-app.git
```

### 3.4 Zu GitHub pushen
```bash
git push -u origin main
```

**Du wirst gefragt nach:**

**Username:** (Gib ein)
```
m2cnknny9d-eng
```

**Password:** (Gib dein GitHub Token ein, nicht dein Passwort!)
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## ✅ Fertig!

Wenn du kein Error siehst, ist es erfolgreich! 🎉

**Prüfe:** https://github.com/m2cnknny9d-eng/brk-app

Du solltest sehen:
- ✅ Alle Dateien
- ✅ `main` branch
- ✅ Commits aufgelistet

---

## 🔐 Alternative: SSH Key (besser)

Wenn du öfter mit Git arbeitest, nutze lieber SSH:

### 1. SSH Key generieren
```bash
ssh-keygen -t ed25519 -C "deine@email.com"
```

(Enter drücken bei allen Fragen)

### 2. Public Key kopieren
**Auf macOS:**
```bash
cat ~/.ssh/id_ed25519.pub | pbcopy
```

**Auf Linux:**
```bash
cat ~/.ssh/id_ed25519.pub
```
(Manuell kopieren)

**Auf Windows (PowerShell):**
```bash
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | Set-Clipboard
```

### 3. Key zu GitHub hinzufügen
1. Gehe zu: https://github.com/settings/ssh/new
2. Title: `brk-app-key`
3. Key: (Einfügen)
4. "Add SSH key"

### 4. Remote URL ändern
```bash
git remote set-url origin git@github.com:m2cnknny9d-eng/brk-app.git

git push -u origin main
```

Jetzt ohne Password jedes Mal! ✅

---

## ❌ Fehler beheben

| Fehler | Lösung |
|--------|--------|
| "fatal: unable to access" | Internetverbindung prüfen |
| "Authentication failed" | Token/Passwort falsch, nochmal versuchen |
| "Repository not found" | URL falsch oder Repo nicht erstellt |
| "Permission denied" | SSH Key nicht korrekt hinzugefügt |
| "Everything up-to-date" | Bereits gepusht ✅ |

---

## 🎯 Nach dem Upload

Deine GitHub Seite: 
```
https://github.com/m2cnknny9d-eng/brk-app
```

Jetzt kannst du:
1. ✅ Code verwalten
2. ✅ Mit Vercel deployen
3. ✅ Issues & Pull Requests nutzen
4. ✅ Mit anderen arbeiten

---

## 📝 Git Commands für später

```bash
# Änderungen hinzufügen
git add .

# Commit mit Nachricht
git commit -m "Feature: Beschreibung"

# Zu GitHub pushen
git push origin main

# Änderungen vom Server holen
git pull origin main
```

---

**Alles klar?** 🚀

Bei Fragen → Antworte einfach!
