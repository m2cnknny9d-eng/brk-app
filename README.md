# BRK Bayern Ehrenamtsapp 🚀

Eine moderne Apple Widgets-inspirierte App zur Verwaltung von Lehrgängen, Fortbildungen und deren Nachweise für Ehrenamtliche des BRK Bayern.

## ✨ Features

✅ **Lehrgangsübersicht** - Welche Kurse brauche ich? Wann laufen Nachweise ab?
✅ **Gruppenverwaltung** - Bereitschaft Nördlingen (öffentlich) + SEG Behandlung (Admin-only)
✅ **Lehrgänge** - Reanimation, Blaulichtfahrt, Funken, Sanitätswachdienst
✅ **Kurstermine** - Nächste Gelegenheiten für jeden Lehrgang
✅ **Admin-Panel** - Nur Admins können Daten eingeben/verwalten
✅ **Apple Widget Design** - Clean, modern, iOS-ähnlich
✅ **Dark Mode** - System-basiert
✅ **Responsive** - Perfekt auf Mobile & Desktop

## 🛠️ Tech Stack

- **Next.js 14** - React Framework
- **TypeScript** - Type Safety
- **TailwindCSS** - Styling mit BRK Farben
- **Prisma** - ORM für PostgreSQL
- **NextAuth.js** - Authentication
- **PostgreSQL** - Database

## 📋 Installation

### 1. Repository klonen
```bash
git clone https://github.com/deinname/brk-app.git
cd brk-app
```

### 2. Dependencies installieren
```bash
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env.local
```

Bearbeite `.env.local`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/brk_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="ein-sehr-sicheres-zufallstoken"
ADMIN_EMAIL="admin@brk-bayern.de"
ADMIN_PASSWORD="sicheres-passwort"
```

### 4. Database Migrations
```bash
npm run prisma:migrate
```

### 5. Test-Daten einfügen
```bash
npm run prisma:studio
# Oder SQL Script laden
```

### 6. Development Server
```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000)

## 🔑 Test-Zugänge

**Freiwilliger:**
- Email: `volunteer@brk.de`
- Passwort: `password123`

**Admin:**
- Email: `admin@brk.de`
- Passwort: `admin123`

## 🏗️ Projektstruktur

```
brk-app/
├── app/
│   ├── api/              # API Routes
│   ├── auth/             # Auth Pages
│   ├── dashboard/        # Main Dashboard
│   ├── admin/            # Admin Panel (später)
│   ├── layout.tsx        # Root Layout
│   └── page.tsx          # Home Page
├── components/           # React Components
├── lib/                  # Utilities
│   ├── auth.ts          # NextAuth Config
│   └── db.ts            # Prisma Client
├── types/               # TypeScript Types
├── prisma/              # Database Schema
│   └── schema.prisma
└── public/              # Static Files
```

## 📊 Database Schema

**Users**
- Email, Name, Password
- Admin Status, Role

**Groups**
- Bereitschaft Nördlingen (public)
- SEG Behandlung Nördlingen (admin-only)

**Trainings**
- Reanimation
- Unterweisung Blaulichtfahrt
- Funken
- Grundlagen Sanitätswachdienst

**UserTraining**
- Tracks: Completion Date, Expiry Date, Status
- Status: ACTIVE | EXPIRING_SOON | EXPIRED | NOT_STARTED

**CourseInstances**
- Start/End Date
- Location, Instructor
- Max Participants

## 🔒 Sicherheit

- JWT-basierte Sessions
- Bcrypt Password Hashing
- Admin-only Daten-Eingabe
- User Data Isolation

## 🚀 Deployment auf Vercel

```bash
# 1. Git init & push
git init
git add .
git commit -m "Initial: BRK Ehrenamtsapp"
git remote add origin https://github.com/deinname/brk-app.git
git push -u origin main

# 2. Mit Vercel CLI
npm i -g vercel
vercel

# 3. Vercel Dashboard - Environment Variablen
# DATABASE_URL, NEXTAUTH_SECRET, etc.

# 4. Database Migration
vercel env pull
npm run prisma:migrate
```

## 📝 Nächste Schritte

Die App ist jetzt bereit für:

1. **Admin Panel** - Trainings/Kurse/Benutzer verwalten
2. **Detail Pages** - Kursinformationen expandieren
3. **Benachrichtigungen** - E-Mail Reminders
4. **CSV Import** - Benutzer & Daten importieren
5. **Statistiken** - Admin-Übersichten

## 🤝 Feedback

Feedback & Feature-Wünsche direkt per E-Mail oder GitHub Issues.

## 📄 Lizenz

Entwickelt für BRK Bayern - 2024

---

**Viel Erfolg beim Ehrenamt!** ❤️
