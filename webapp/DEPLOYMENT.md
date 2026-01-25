# Deployment Guide - Vercel

## Förutsättningar

- Vercel-konto (gratis på [vercel.com](https://vercel.com))
- Git repository (GitHub, GitLab, eller Bitbucket)

## Metod 1: Deploy via Git (Rekommenderas)

### Steg 1: Pusha till Git

```bash
cd webapp
git add .
git commit -m "Initial webapp deployment"
git push origin main
```

### Steg 2: Anslut till Vercel

1. Gå till [vercel.com](https://vercel.com)
2. Klicka "New Project"
3. Importera ditt Git repository
4. Välj `webapp` som root directory
5. Vercel detecterar automatiskt Next.js

### Steg 3: Konfigurera Environment Variables

I Vercel Dashboard:
1. Gå till **Settings** → **Environment Variables**
2. Lägg till följande variabler (från din `.env.local`):

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_value
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_value
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_value
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_value
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_value
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_value
NEXT_PUBLIC_FIREBASE_APP_ID=your_value
```

3. Klicka **Save**

### Steg 4: Deploy

Klicka "Deploy" - Vercel bygger och deplojar appen automatiskt!

Din app blir tillgänglig på: `https://your-project.vercel.app`

## Metod 2: Deploy via CLI

### Steg 1: Installera Vercel CLI

```bash
npm i -g vercel
```

### Steg 2: Logga in

```bash
vercel login
```

### Steg 3: Deploy

```bash
cd webapp
vercel
```

Följ instruktionerna i terminalen.

För produktion:
```bash
vercel --prod
```

### Steg 4: Lägg till Environment Variables

```bash
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
vercel env add NEXT_PUBLIC_FIREBASE_DATABASE_URL
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
```

Eller i bulk via Vercel Dashboard (enklare).

## Automatiska Deployments

När du använder Git-integrationen:
- **Varje push till `main`** → Deployas automatiskt till produktion
- **Pull requests** → Preview deployments skapas automatiskt

## Custom Domain

### Lägg till egen domän

1. Gå till Vercel Dashboard → **Settings** → **Domains**
2. Lägg till din domän (t.ex. `chokladpengar.se`)
3. Uppdatera DNS-records hos din domänleverantör:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Vänta på DNS-propagering (kan ta upp till 48h)

## PWA på Custom Domain

När du använder egen domän:
1. HTTPS aktiveras automatiskt (Let's Encrypt)
2. PWA fungerar direkt (kräver HTTPS)
3. Användare kan installera appen på hemskärmen

## Monitoring

### Analytics

Vercel erbjuder gratis analytics:
1. Gå till **Analytics** i Vercel Dashboard
2. Se sidvisningar, laddningstider, etc.

### Logs

Se deployment logs:
1. Gå till **Deployments**
2. Klicka på en deployment
3. Se "Build Logs" och "Function Logs"

## Kostnad

### Vercel Gratis Plan (Hobby)

✅ **Perfekt för Chokladpengar!**

Inkluderar:
- Unlimited deployments
- 100 GB bandwidth/månad
- Automatic HTTPS
- Preview deployments
- Web Analytics

**Gränser:**
- Max 100 GB bandwidth (mer än tillräckligt för 1000+ användare)
- Max 100 GB-hours compute time
- Max 6000 mins build time/månad

### När behöver du uppgradera?

Endast om du får:
- 10,000+ användare/månad
- Eller vill ha Teams-funktioner

**Kostnad då:** $20/månad (Pro plan)

## Troubleshooting

### Build Failed

```bash
# Testa build lokalt först
cd webapp
npm run build
```

Om det fungerar lokalt men inte på Vercel:
- Kontrollera Node version (se `package.json` → `engines`)
- Se till att alla dependencies finns i `package.json`

### Environment Variables fungerar inte

- Se till att variablerna börjar med `NEXT_PUBLIC_`
- Kontrollera stavning
- Efter att ha lagt till env vars, gör en ny deployment:
  ```bash
  vercel --prod
  ```

### PWA installeras inte

- HTTPS krävs (Vercel har detta automatiskt)
- Kontrollera att `/manifest.json` är tillgänglig
- Testa i Chrome DevTools → Application → Manifest

## Best Practices

1. **Git workflow:**
   - Utveckla på `develop` branch
   - Merga till `main` för produktion
   - Preview deployments för varje PR

2. **Environment Variables:**
   - Använd olika Firebase-projekt för dev/prod
   - Ha separata env vars för preview vs production

3. **Performance:**
   - Vercel CDN cachar automatiskt
   - Images optimeras automatiskt med Next.js

4. **Security:**
   - Lägg ALDRIG till `.env.local` i Git
   - Använd Vercel's environment variables

## Post-Deployment Checklist

✅ Testa appen på olika enheter
✅ Verifiera att Firebase-anslutning fungerar
✅ Installera PWA på mobil och testa
✅ Kontrollera att notifikationer fungerar
✅ Testa create/login flow
✅ Verifiera att fonder uppdateras (Firebase Functions)

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Support](https://vercel.com/support)

---

**Du är redo! 🚀**

Din Chokladpengar-app körs nu i molnet och är tillgänglig för din familj!


