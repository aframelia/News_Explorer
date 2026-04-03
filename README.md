# 📰 UK News Explorer

A modern, accessible news dashboard built with **Next.js 14**, **TypeScript**, and **Tailwind CSS** — powered by The Guardian's Open Platform API.

[**Live Demo →**]([https://your-deployment-url.vercel.app](https://newsexplorer-9k6ndhbwj-aframelias-projects.vercel.app/)

![UK News Explorer screenshot](./news.png)

---

## ✨ Features

- 🗂️ **Browse by category** — UK, World, Tech, Culture, Sport, Business, Climate, Science
- 🔍 **Search articles** — keyword search across The Guardian's full archive
- 🌙 **Dark / light mode** — persisted via localStorage, respects system preference
- ♿ **Accessible** — semantic HTML, ARIA labels, keyboard navigation, skip links
- 📱 **Responsive** — mobile-first grid layout
- ⚡ **Fast** — server-side API calls, 5-minute revalidation cache
- 🔒 **Secure** — API key kept server-side via Next.js API routes

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety throughout |
| Tailwind CSS | Styling |
| The Guardian API | News data |
| Vercel | Deployment |

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/aframelia/uk-news-explorer.git
cd news-explorer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Get a free Guardian API key
Register at [open-platform.theguardian.com](https://open-platform.theguardian.com/access/)

### 4. Set up environment variables
```bash
cp .env.example .env.local
# Add your GUARDIAN_API_KEY to .env.local
```

### 5. Run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
  app/
    page.tsx              # Home page (client component)
    layout.tsx            # Root layout with font + metadata
    api/news/route.ts     # Server-side API route (keeps key secure)
  components/
    ArticleCard.tsx        # News card with image, title, excerpt
    CategoryNav.tsx        # Category filter buttons
    SearchBar.tsx          # Accessible search input
    LoadingSkeleton.tsx    # Animated loading placeholders
  types/
    guardian.ts            # TypeScript interfaces for API data
  lib/
    guardian.ts            # API fetch utility + helpers
```

---

## 🎯 What I Learned

- Next.js App Router architecture and server vs client components
- Keeping API keys secure using server-side API routes
- Building accessible UI components with proper ARIA attributes
- TypeScript interfaces for third-party API responses

---

## 📄 Licence

For educational/portfolio use. News content © The Guardian.
