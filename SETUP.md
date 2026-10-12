# BRK App - Schnellstart Setup 🚀

## Option 1: Lokal entwickeln

### Schritt 1: Basis-Setup
```bash
cd /home/claude/brk-app

# Dependencies
npm install

# Environment Variablen
cp .env.example .env.local
```

### Schritt 2: PostgreSQL einrichten
Wenn PostgreSQL nicht läuft:

**Docker nutzen:**
```bash
docker run --name brk-db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=brk_db \
  -p 5432:5432 \
  -d postgres:15
```

**Oder lokal installiert:**
```bash
# PostgreSQL starten
sudo service postgresql start

# Datenbank erstellen
createdb brk_db
```

### Schritt 3: .env.local anpassen
```bash
nano .env.local
```

```env
DATABASE_URL="postgresql://user:password@localhost:5432/brk_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="dein-geheimes-token-hier-min-32-zeichen"
NODE_ENV="development"
```

### Schritt 4: Database Setup
```bash
# Migrations durchführen
npm run prisma:migrate

# Test-Daten laden (optional)
npx prisma db seed
# ODER manuell mit SQL
psql brk_db < prisma/seed.sql
```

### Schritt 5: Starten
```bash
npm run dev
```

Öffne: http://localhost:3000

**Test-Zugänge:**
- Admin: `admin@brk.de` / `admin123`
- Freiwilliger: `volunteer@brk.de` / `password123`

---

## Option 2: GitHub + Vercel Deployment

### Schritt 1: Git Repository
```bash
cd /home/claude/brk-app

# Initialisieren
git init
git add .
git commit -m "Initial: BRK Ehrenamtsapp"
```

### Schritt 2: Zu GitHub pushen
```bash
git remote add origin https://github.com/deinname/brk-app.git
git branch -M main
git push -u origin main
```

### Schritt 3: Vercel importieren
1. Gehe zu https://vercel.com
2. Klicke "Import Git Repository"
3. Wähle dein `brk-app` Repository
4. Configure Project:
   - Framework: Next.js
   - Root Directory: ./
   - Environment Variables eingeben:

```
DATABASE_URL = [deine-postgresql-url]
NEXTAUTH_SECRET = [min-32-zeichen-token]
ADMIN_EMAIL = admin@brk-bayern.de
ADMIN_PASSWORD = [sicheres-passwort]
```

### Schritt 4: Database vorbereiten
```bash
# PostgreSQL auf Vercel/Railway/AWS erstellen
# Dann Connection String kopieren → DATABASE_URL

# Migrations durchführen
vercel env pull
npm run prisma:migrate
```

### Schritt 5: Deploy
```bash
vercel deploy --prod
```

Oder automatisch bei jedem `git push main` 🚀

---

## Problembehebung

### Error: "connect ECONNREFUSED"
→ PostgreSQL läuft nicht

**Lösung:**
```bash
# Docker prüfen
docker ps | grep brk-db

# Oder lokal starten
sudo service postgresql start

# Test
psql brk_db -c "SELECT 1"
```

### Error: "Prisma Client not found"
→ Dependencies nicht installiert

**Lösung:**
```bash
npm install
npm run prisma:generate
```

### Error: "NEXTAUTH_SECRET not provided"
→ Environment Variable nicht gesetzt

**Lösung:**
```bash
# .env.local prüfen
cat .env.local | grep NEXTAUTH_SECRET

# Oder neu generieren
openssl rand -base64 32
# In .env.local einfügen
```

### Datenbank ist leer
→ Migrations nicht durchgeführt

**Lösung:**
```bash
npm run prisma:migrate

# Oder mit Test-Daten
psql brk_db < prisma/seed.sql
```

---

## Weitere Commands

```bash
# Development
npm run dev           # Start dev server

# Build & Production
npm run build        # Build für Produktion
npm start            # Start production server

# Database
npm run prisma:migrate    # Migrations durchführen
npm run prisma:studio     # GUI für Database
npm run prisma:generate   # Prisma Client generieren

# Linting
npm run lint         # ESLint prüfen
```

---

## Umgebungen konfigurieren

**Development (.env.local)**
- `NODE_ENV=development`
- Lokale PostgreSQL
- NEXTAUTH_URL=http://localhost:3000

**Production (Vercel)**
- `NODE_ENV=production`
- Cloud PostgreSQL (Railway, Render, AWS)
- NEXTAUTH_URL=https://deine-domain.com
- Stärkere Passwörter

---

## Sicherheits-Checkliste

- [ ] NEXTAUTH_SECRET ist min. 32 Zeichen
- [ ] DATABASE_URL zeigt auf Produktion
- [ ] Admin-Passwort ist sicher (min. 12 Zeichen)
- [ ] HTTPS aktiviert (Vercel macht das automatisch)
- [ ] Regelmäßige Backups der Database

---

## Support

Bei Fragen oder Problemen:
1. Schau ins README.md
2. Prüfe die .env.local
3. Sieh dir die Prisma Logs an

**Viel Erfolg!** 🚀❤️
