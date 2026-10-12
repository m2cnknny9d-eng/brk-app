# 🎯 BRK App - Komplette Mac Anleitung

**Von Download bis Live-App - ~20 Min**

---

# 📥 TEIL 1: APP RUNTERLADEN (2 Min)

## SCHRITT 1: ZIP Datei herunterladen

Öffne diesen Link auf deinem Mac:
```
https://github.com/m2cnknny9d-eng/brk-app/archive/refs/heads/main.zip
```

Datei wird heruntergeladen: `brk-app-main.zip`

---

## SCHRITT 2: ZIP entpacken

1. Gehe zu **Downloads** Ordner
2. Doppelklick auf `brk-app-main.zip`
3. **Warten** (kurz)
4. Ordner `brk-app-main` erscheint

✅ **APP HERUNTERGELADEN!**

---

# 🔑 TEIL 2: GITHUB SETUP (5 Min)

## SCHRITT 3: GitHub Token generieren

Öffne:
```
https://github.com/settings/tokens/new
```

Ausfüllen:
- **Note:** `brk-app-token-2` ⭐
- **Expiration:** `90 days`

Scrollen & ankreuzen:
- ☑️ `repo`
- ☑️ `workflow`

Klick: `Generate token`

**KOPIEREN:** Den grünen Token!

---

## SCHRITT 4: GitHub Repo erstellen

Öffne:
```
https://github.com/new
```

Ausfüllen:
- **Name:** `brk-app`
- **Description:** `BRK Bayern Ehrenamtsapp`
- **Visibility:** `Private`

**WICHTIG:** Keine Checkboxes ankreuzen!

Klick: `Create repository`

✅ **REPO ERSTELLT!**

---

# 💻 TEIL 3: TERMINAL (5 Min)

## SCHRITT 5: Terminal öffnen

Drücke: `Command (⌘) + Leertaste`

Gib ein: `terminal`

Drücke: `Enter`

✅ **TERMINAL OFFEN!**

---

## SCHRITT 6: Zum richtigen Ordner gehen

Gib ein:
```
cd ~/Downloads/brk-app-main
```

Drücke: `Enter`

---

## SCHRITT 7: Git initialisieren

```
git init
```

Drücke: `Enter`

---

## SCHRITT 8: Git konfigurieren

```
git config user.email "deine@email.com"
```

Drücke: `Enter`

```
git config user.name "Dein Name"
```

Drücke: `Enter`

---

## SCHRITT 9: Remote hinzufügen

```
git remote add origin https://github.com/m2cnknny9d-eng/brk-app.git
```

Drücke: `Enter`

---

## SCHRITT 10: Alles committen

```
git add .
```

Drücke: `Enter`

```
git commit -m "Initial: BRK Ehrenamtsapp"
```

Drücke: `Enter`

---

## SCHRITT 11: Zu GitHub pushen

```
git push -u origin main
```

Drücke: `Enter`

**Du wirst gefragt:**

**Username:**
```
m2cnknny9d-eng
```
Drücke: `Enter`

**Password:**
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
(Dein TOKEN von Schritt 3!)

Drücke: `Enter`

---

## SCHRITT 12: Überprüfen

Warte 1-2 Minuten bis:
```
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

✅ **AUF GITHUB HOCHGELADEN!**

---

# 🌐 TEIL 4: VERCEL DEPLOY (8 Min)

## SCHRITT 13: Vercel öffnen

Öffne:
```
https://vercel.com
```

Melde an (kostenlos) oder registriere

---

## SCHRITT 14: Repository importieren

Klick: `Import Git Repository`

Du siehst deine Repos

**Wähle:** `brk-app`

---

## SCHRITT 15: Railway DB erstellen

Öffne neuen Tab:
```
https://railway.app
```

Melde an (kostenlos)

Klick: `New Project`

Wähle: `Provision PostgreSQL`

**Warten** (30 Sekunden)

Klick auf: `PostgreSQL`

Gehe zu: `Variables`

**KOPIERE:** Den Wert von `DATABASE_URL`

```
postgresql://user:password@host:5432/railway
```

---

## SCHRITT 16: Environment Variables in Vercel

Gehe zurück zu Vercel (Import Screen)

Scroll down bis: `Environment Variables`

**Füge ein:**

### Variable 1:
- Name: `DATABASE_URL`
- Value: [DEIN DATABASE_URL VON RAILWAY]
- Klick: `Add`

### Variable 2:
- Name: `NEXTAUTH_SECRET`
- Value: `brk-app-secret-key-12345678901234567890`
- Klick: `Add`

### Variable 3:
- Name: `NEXTAUTH_URL`
- Value: Automatisch gefüllt - LEER LASSEN!

---

## SCHRITT 17: DEPLOY!

**Großer Button:** `Deploy`

Klick drauf!

**Warten** (3-5 Min)

Du siehst:
```
Deployment Complete!
```

Und deine URL:
```
https://brk-app-xyz.vercel.app
```

✅ **APP LÄUFT LIVE!**

---

# 🧪 TEIL 5: TESTEN (1 Min)

## SCHRITT 18: Login testen

Öffne deine App-URL:
```
https://brk-app-xyz.vercel.app
```

Melde dich an:
```
Email: admin@brk.de
Password: admin123
```

Du siehst das **Dashboard** mit:
- ✅ Lehrgänge
- ✅ Status
- ✅ Nächste Kurse
- ✅ Admin Panel

✅ **ALLES FUNKTIONIERT!**

---

## SCHRITT 19: Admin Panel testen

Im Sidebar: Klick `📋 Einladungen`

Du siehst das Admin Panel:
- ✅ Form zum Einladungen erstellen
- ✅ Liste bestehender Invites
- ✅ Delete Button

✅ **ADMIN FUNKTIONIERT!**

---

## SCHRITT 20: Einladung testen

Im Admin Panel:
1. Email eingeben: `test@example.com`
2. Gruppe: `SEG Behandlung Nördlingen`
3. Klick: `Einladung erstellen`

Du siehst einen Link!

Das ist der Invite-Link für SEG-Zugang! ✅

---

# 📊 SUMMARY:

| Phase | Dauer |
|-------|-------|
| 1. Download | 2 Min |
| 2. GitHub | 3 Min |
| 3. Terminal | 5 Min |
| 4. Vercel | 8 Min |
| 5. Test | 1 Min |
| **GESAMT** | **~20 Min** |

---

# ✅ FERTIG!

Deine App läuft jetzt:
- ✅ Live im Internet
- ✅ Mit Datenbank
- ✅ Mit Authentication
- ✅ Mit Invite-System
- ✅ Mit Admin Panel

---

# 🎉 WAS DU JETZT MACHEN KANNST:

1. **Freunde einladen:**
   - Gib ihnen die Invite-Links
   - Sie klicken → Zugang zu SEG!

2. **Code ändern:**
   - Ändere Dateien lokal
   - `git add .`
   - `git commit -m "Feature: ..."`
   - `git push origin main`
   - Vercel deployed automatisch!

3. **Daten hinzufügen:**
   - Mehr Lehrgänge
   - Mehr Gruppen
   - Mehr Kurstermine

---

# ❓ PROBLEME?

Sag mir welcher Schritt nicht klappt und ich helfe! 🚀

---

**Du schaffst das!** ❤️🚀
