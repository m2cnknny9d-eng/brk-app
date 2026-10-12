# 🚀 BRK App - Deployment Guide

## 📋 Schritt 1: GitHub Repository erstellen

1. **Gehe zu:** https://github.com/new
2. **Repository Name:** `brk-app`
3. **Beschreibung:** "BRK Bayern Ehrenamtsapp - Verwalte Lehrgänge & Fortbildungen"
4. **Public/Private:** Private (nur für dich)
5. **Nicht initialisieren** (Checkbox NICHT aktivieren)
6. **Klick:** "Create repository"

---

## 🔗 Schritt 2: Git Push zu GitHub

```bash
cd /home/claude/brk-app

# Remote hinzufügen
git remote add origin https://github.com/DEINUSERNAME/brk-app.git

# Zu GitHub pushen
git push -u origin main
```

**Wichtig:** Ersetze `DEINUSERNAME` mit deinem GitHub Username!

Danach solltest du die App auf GitHub sehen:
`https://github.com/DEINUSERNAME/brk-app`

---

## 🌍 Schritt 3: Vercel Deployment

### 3.1 PostgreSQL Datenbank erstellen

Du brauchst eine Cloud-Datenbank. Wähle eine Option:

#### Option A: **Railway** (empfohlen - kostenlos)
1. Gehe zu: https://railway.app
2. "New Project" → "Provision PostgreSQL"
3. Warte ~1 Minute
4. Klick auf "PostgreSQL"
5. Gehe zu "Variables"
6. Kopiere den Wert von `DATABASE_URL`

#### Option B: **Render** 
1. Gehe zu: https://render.com
2. "New" → "PostgreSQL"
3. Name: `brk-db`
4. Warte auf Erstellung
5. Kopiere die Connection String

#### Option C: **AWS RDS** oder **Supabase**
Siehe jeweilige Dokumentation

### 3.2 Vercel Project erstellen

1. **Gehe zu:** https://vercel.com
2. **"Import Git Repository"**
3. **Wähle:** `brk-app`
4. **Framework:** Next.js wird automatisch erkannt ✅

### 3.3 Environment Variablen in Vercel

Klick auf "Environment Variables" und füge folgende ein:

```
DATABASE_URL = [deine-postgresql-url-von-railway/render]
NEXTAUTH_SECRET = [GENERIERE UNTEN]
NEXTAUTH_URL = [wird automatisch gefüllt]
NODE_ENV = production
```

#### NEXTAUTH_SECRET generieren:
Öffne Terminal und führe aus:
```bash
openssl rand -base64 32
```

Kopiere den Output (z.B. `abc123def456...`) → Füge in Vercel ein

### 3.4 Deploy Button klicken
```
"Deploy"
```

Warte ~3-5 Minuten...

✅ **Deine App läuft dann auf:** `https://brk-app-xyz.vercel.app`

---

## 📊 Schritt 4: Datenbank Setup

Wenn deine App deployed ist:

### 4.1 Prisma Migrations durchführen

```bash
# Im Terminal im brk-app Verzeichnis:
cd /home/claude/brk-app

# Vercel Env ziehen
vercel env pull

# Migrations durchführen
npm run prisma:migrate
```

### 4.2 Test-Daten laden (Optional)

```bash
# SQL Script laden
psql [DEINE_DATABASE_URL] < prisma/seed.sql
```

Oder manuell mit:
```bash
npm run prisma:studio
# Dann manuell Daten eingeben
```

---

## ✅ Test-Zugänge

**Nach dem Setup sind folgende Accounts aktiv:**

### Admin Account
- Email: `admin@brk.de`
- Passwort: `admin123`
- Zugang: ✅ Alle Gruppen + Admin Panel

### Freiwilliger Account
- Email: `volunteer@brk.de`
- Passwort: `password123`
- Zugang: ✅ Bereitschaft Nördlingen

### SEG Account (über Invite)
- Nur per Einladung vom Admin erreichbar
- Admin erstellt Link → Freiwilliger akzeptiert

---

## 🔐 SEG Invite-System

### Invite erstellen (als Admin)

1. **Login:** admin@brk.de
2. **Klick:** "Admin Panel" (im Sidebar)
3. **Email eingeben:** z.B. `benutzer@example.com`
4. **Gruppe:** "SEG Behandlung Nördlingen"
5. **Klick:** "Einladung erstellen"

Ein Link wird angezeigt:
```
https://deine-app.vercel.app/invites/[invite-id]
```

### Invite per Email senden

Kopiere den Link und sende ihn dem Benutzer. Der Benutzer:
1. Klickt auf den Link
2. Wird zur Login-Seite weitergeleitet (falls nicht angemeldet)
3. Bestätigt die Einladung
4. Hat jetzt Zugang zu "SEG Behandlung Nördlingen"

---

## 🐛 Troubleshooting

### Fehler: "DATABASE_URL is missing"
→ Environment Variable nicht in Vercel gesetzt

**Lösung:**
```bash
# Lokal testen
cat .env.local | grep DATABASE_URL

# In Vercel Settings überprüfen
# Vercel Dashboard → Settings → Environment Variables
```

### Fehler: "Prisma migration failed"
→ Database Connection fehlgeschlagen

**Lösung:**
```bash
# Datenbank-URL testen
psql [DEINE_DATABASE_URL] -c "SELECT 1"

# Oder neue DB erstellen auf Railway
```

### App zeigt "500 Internal Server Error"
→ Backend-Fehler

**Lösung:**
```bash
# Logs ansehen
vercel logs [app-name]

# Oder lokal testen
npm run dev
```

---

## 🔄 Automatisches Deployment

Nach dem initialen Setup:

Jedes Mal wenn du `git push main` machst:
1. Vercel erkennt den Push
2. Baut die App neu
3. Deployed automatisch
4. ~2-3 Minuten später ist die neue Version live

---

## 📱 Weitere Schritte

Nach dem Deployment:

- [ ] Admin Login testen
- [ ] Freiwilliger Login testen
- [ ] Eine Invite erstellen & testen
- [ ] Custom Domain hinzufügen (optional)
- [ ] SSL Zertifikat aktivieren (Vercel macht das automatisch)

---

## 💡 Custom Domain (Optional)

Wenn du eine eigene Domain hast:

1. **Vercel Dashboard → Projekt → Settings**
2. **Domains** → "Add Domain"
3. **Deine Domain eingeben:** z.B. `brk-app.de`
4. **DNS Records kopieren** (von deinem Domain-Anbieter)
5. **Bei Domain-Anbieter eintragen** (1-2 Tage zum propagieren)

---

## 📞 Support

Bei Problemen:
1. Schau ins README.md
2. Versuche lokal zu debuggen
3. Sieh dir Vercel Logs an
4. Railway/Render Logs prüfen

---

**Alles klar? Los geht's!** 🚀❤️

Fragen? Antworte einfach und ich helfe weiter!
