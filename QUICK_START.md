# 🚀 BRK App - Quick Start (5 Minuten!)

## Was brauchst du?
- [ ] GitHub Account (kostenlosen erstellen auf github.com)
- [ ] Vercel Account (kostenlosen erstellen auf vercel.com)
- [ ] Railway Account (kostenlosen erstellen auf railway.app)

---

## ⏱️ Schritt-für-Schritt (5 Min)

### **Schritt 1: GitHub Push** (2 Min)

Kopiere diese Befehle **genau so** ins Terminal:

```bash
cd /home/claude/brk-app

git remote add origin https://github.com/DEINUSERNAME/brk-app.git

git push -u origin main
```

**Wichtig:** 
- Ersetze `DEINUSERNAME` mit deinem echten GitHub Username
- Du wirst nach GitHub Username & Token gefragt

**Dein GitHub Token:**
1. Gehe zu: https://github.com/settings/tokens
2. Klick: "Generate new token"
3. Name: `brk-app`
4. Checkboxes: Klick `repo` ankreuzen
5. Unten: "Generate token"
6. Kopiere den Token → Ins Terminal einfügen

---

### **Schritt 2: Railway PostgreSQL** (1 Min)

1. **Öffne:** https://railway.app
2. **Melde an oder registriere**
3. **"New Project"** → **"Provision PostgreSQL"**
4. **Warten** bis erstellt (30 Sekunden)
5. **Klick auf** "PostgreSQL"
6. **Gehe zu:** "Variables" Tab
7. **Kopiere** den Wert von `DATABASE_URL`
8. **Speichern!** (irgendwo für Schritt 3)

---

### **Schritt 3: Vercel Deployment** (2 Min)

1. **Öffne:** https://vercel.com
2. **"Import Git Repository"**
3. **Wähle:** `brk-app` (dein eben gepushtes Repo)
4. **Klick:** "Import"
5. **Warte** bis zu "Environment Variables" Screen
6. **Füge drei Variables ein:**

```
DATABASE_URL = [KOPIERT VON RAILWAY]

NEXTAUTH_SECRET = [GENERIERE UNTEN]

NEXTAUTH_URL = https://[dein-vercel-app].vercel.app
```

**NEXTAUTH_SECRET generieren:**
Terminal öffnen und eingeben:
```bash
openssl rand -base64 32
```
→ Kopiere den Output

7. **"Deploy"** Klick!
8. **Warten** 3-5 Min...

✅ **FERTIG!** Deine App läuft auf: `https://brk-app-xyz.vercel.app`

---

## 🗄️ Database Setup (1 Min)

Wenn die App deployed ist:

```bash
cd /home/claude/brk-app

# Environment Variablen von Vercel laden
vercel env pull

# Datenbank initialisieren
npm run prisma:migrate

# Test-Daten laden
psql $DATABASE_URL < prisma/seed.sql
```

---

## ✅ Test-Login

Öffne deine App und melde dich an:

**Admin:**
- Email: `admin@brk.de`
- Password: `admin123`

**Freiwilliger:**
- Email: `volunteer@brk.de`
- Password: `password123`

---

## 🎉 Fertig!

Deine App läuft jetzt live! 

### Was du tun kannst:
1. **Admin Panel ansehen** (Admin Login)
   - Einladungen für SEG erstellen
   - Benutzer verwalten
   
2. **Freiwilliger Dashboard** (Freiwilliger Login)
   - Lehrgänge ansehen
   - Status prüfen
   
3. **SEG Invite testen** (Als Admin)
   - Invite erstellen
   - Mit neuem User Link akzeptieren

---

## 🔗 Weitere Features

### Admin Panel nutzen:
1. Login als `admin@brk.de`
2. Klick "Admin Panel" im Sidebar
3. Neue Email eingeben (z.B. `neu@example.com`)
4. Gruppe: "SEG Behandlung Nördlingen"
5. "Einladung erstellen"
6. Link kopieren & teilen

### User akzeptiert Invite:
1. Klick auf den Link
2. Falls nicht angemeldet: Anmelden
3. "Akzeptieren"
4. Hat jetzt Zugang zu SEG! ✅

---

## ⚡ Updates pushen

Später wenn du die App änderst:

```bash
cd /home/claude/brk-app

git add .
git commit -m "Feature: [was du geändert hast]"
git push origin main
```

Vercel baut automatisch neu & deployed! 🚀

---

## 🆘 Häufige Fehler

| Fehler | Lösung |
|--------|--------|
| "Permission denied" | GitHub Token richtig eingeben |
| "DATABASE_URL missing" | In Vercel Environment Variables prüfen |
| "Prisma error" | `npm run prisma:migrate` nochmal laufen |
| "500 Server Error" | `vercel logs` im Terminal eingeben |

---

## 📞 Du brauchst Hilfe?

Schreib mir einfach! Ich helfe bei:
- Deployment Problemen
- Environment Variables
- Database Issues
- Feature Requests
- Bugs

---

**Viel Erfolg!** ❤️🚀

Bei Fragen → Frag einfach!
