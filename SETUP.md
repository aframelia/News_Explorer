# UK News Explorer — Setup Guide

## 1. Create the Next.js project
```bash
npx create-next-app@latest uk-news-explorer \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
cd uk-news-explorer
```

## 2. Get your free Guardian API key
- Go to: https://open-platform.theguardian.com/access/
- Click "Register developer key"
- Fill in your name, email, project description (e.g. "Personal news dashboard project")
- You'll receive your key by email within minutes

## 3. Create your .env.local file
```bash
# In the root of your project:
GUARDIAN_API_KEY=your_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 4. Copy the project files
Replace the contents of your project with the files provided.

## 5. Run the development server
```bash
npm run dev
```
Open http://localhost:3000

## 6. Deploy to Vercel
```bash
npm install -g vercel
vercel
```
Add your GUARDIAN_API_KEY as an environment variable in Vercel dashboard.

## Project Structure
```
src/
  app/
    page.tsx              # Home page
    layout.tsx            # Root layout
    globals.css           # Global styles
    api/
      news/
        route.ts          # API route (keeps key server-side)
  components/
    ArticleCard.tsx        # News card component
    CategoryNav.tsx        # Category filter navigation
    SearchBar.tsx          # Search input component
    ThemeToggle.tsx        # Dark/light mode toggle
    LoadingSkeleton.tsx    # Loading state
  types/
    guardian.ts            # TypeScript types for API response
  lib/
    guardian.ts            # API fetch utility
```
