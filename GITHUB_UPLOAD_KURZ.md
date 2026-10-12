# ⚡ GitHub Upload - Kurz Version (3 Min)

## 🎯 Schnell erklärt

Die App ist fertig, du musst sie nur noch auf GitHub hochladen.

---

## 📋 Was du brauchst

1. GitHub Account: ✅ **m2cnknny9d-eng** (du hast ihn)
2. GitHub Token: ❓ Musst generieren (1 Min)

---

## 🔑 Token generieren (1 Min)

Öffne: https://github.com/settings/tokens/new

Ausfüllen:
```
Note: brk-app-token
Expiration: 90 days
Checkboxes: repo ✅ + workflow ✅
```

Klick "Generate" → **Token kopieren!**

---

## 💻 Auf GitHub erstellen (30 Sekunden)

Öffne: https://github.com/new

```
Repository name: brk-app
Description: BRK Bayern Ehrenamtsapp
Visibility: Private
```

Klick "Create repository" → NICHT initialisieren

---

## 🚀 Terminal (Terminal / PowerShell öffnen)

```bash
cd /home/claude/brk-app

git remote add origin https://github.com/m2cnknny9d-eng/brk-app.git

git push -u origin main
```

**Was du eingibst:**
- Username: `m2cnknny9d-eng`
- Password: (dein GitHub Token von oben)

---

## ✅ Fertig!

Schau auf GitHub: https://github.com/m2cnknny9d-eng/brk-app

Alles drin? ✅ Dann weiter zu Vercel!

---

## ❓ Nicht sicher?

Lese: `GITHUB_UPLOAD.md` (detaillierte Version)

---

**Viel Erfolg!** 🚀
