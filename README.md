# 🍽️ Mise en Place

> *"Everything you need, right where you need it."*

A modern, installable Progressive Web App (PWA) for discovering, saving, and planning meals — powered by the [MealDB API](https://www.themealdb.com/api/). Built as a portfolio project demonstrating full API integration, PWA architecture, and personal curation features.

---

## ✨ Features

- 🔍 **Recipe Search** — Search meals by name with debounced input for a smooth experience
- 🗂️ **Browse & Filter** — Explore recipes by category, cuisine (area), or main ingredient
- 📖 **Recipe Detail** — Full ingredient lists, measurements, and step-by-step instructions
- 🎲 **Random Meal** — Discover something new with a single tap
- 📚 **My Cookbook** — Save your favourite recipes, persisted across sessions
- 🗓️ **Meal Planner** — Assign saved recipes to days of the week
- 📴 **Offline Support** — Previously viewed recipes are available without an internet connection
- 📱 **Installable** — Add to your home screen on mobile or desktop like a native app

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| PWA | vite-plugin-pwa |
| State Management | Zustand (with `persist` middleware) |
| Routing | React Router v6 |
| Data Fetching | Axios + TanStack React Query |
| API | [TheMealDB](https://www.themealdb.com/api/) (free V1) |
| Hosting | Vercel |

---

## 🎨 Design

**Colour Palette**

| Role | Name | Hex |
|---|---|---|
| Primary | Saffron Gold | `#F4A535` |
| Secondary | Deep Olive | `#3D5A3E` |
| Accent | Terracotta | `#C1603A` |
| Background | Warm Off-White | `#FAF7F2` |
| Text | Charcoal | `#1E1E1E` |

**Typography**
- Headings: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) — editorial, warm, cookbook-quality
- Body & UI: [DM Sans](https://fonts.google.com/specimen/DM+Sans) — clean, legible, modern

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/mise-en-place.git
cd mise-en-place
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**
```bash
cp .env.example .env
```

The default `.env` uses the free MealDB test key (`1`), which works out of the
box for development. No sign-up required.

```env
VITE_MEALDB_API_KEY=1
```

> **Note:** For production use, consider becoming a
> [MealDB supporter](https://www.themealdb.com) to obtain a dedicated API key
> and access to V2 endpoints with higher rate limits.

**4. Start the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server with hot reload |
| `npm run build` | Build optimised production bundle + generate Service Worker |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all source files |

> **Tip:** Always run `npm run build` and `npm run preview` before deploying
> to verify the Service Worker and PWA manifest are generated correctly.

---

## 📁 Project Structure

```
mise-en-place/
├── public/
│   ├── icons/                    # PWA icons (192×192, 512×512)
│   └── favicon.ico
├── src/
│   ├── api/
│   │   └── mealdb.js             # All Axios API call functions
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── recipe/
│   │   │   ├── RecipeCard.jsx    # Summary card for grid views
│   │   │   ├── RecipeDetail.jsx  # Full recipe view
│   │   │   └── IngredientList.jsx
│   │   └── ui/
│   │       ├── SkeletonCard.jsx  # Loading placeholder
│   │       ├── ErrorMessage.jsx
│   │       └── EmptyState.jsx
│   ├── hooks/
│   │   ├── useRecipeSearch.js
│   │   ├── useRecipeDetail.js
│   │   ├── useCategories.js
│   │   └── useFilteredMeals.js
│   ├── pages/
│   │   ├── Home.jsx              # Search + random meal feature
│   │   ├── Browse.jsx            # Category / cuisine / ingredient browsing
│   │   ├── RecipePage.jsx        # Full recipe detail route
│   │   ├── Cookbook.jsx          # Saved recipes (My Cookbook)
│   │   └── MealPlanner.jsx       # Weekly meal plan grid
│   ├── store/
│   │   └── cookbookStore.js      # Zustand store with persist middleware
│   ├── utils/
│   │   └── parseIngredients.js   # Utility to flatten MealDB ingredient fields
│   ├── App.jsx                   # Router config
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Tailwind directives + Google Fonts import
├── .env                          # Local environment variables (git-ignored)
├── .env.example                  # Safe template for other developers
├── vite.config.js                # Vite + vite-plugin-pwa configuration
├── tailwind.config.js            # Extended with brand design tokens
└── README.md
```

---

## 🌐 API Reference

This project uses the **free V1 tier** of [TheMealDB API](https://www.themealdb.com/api/).
No authentication is required beyond the test key.

| Feature | Endpoint |
|---|---|
| Search by name | `search.php?s={name}` |
| Search by first letter | `search.php?f={letter}` |
| Full recipe by ID | `lookup.php?i={id}` |
| Random meal | `random.php` |
| List all categories | `categories.php` |
| Filter by category | `filter.php?c={category}` |
| Filter by area (cuisine) | `filter.php?a={area}` |
| Filter by ingredient | `filter.php?i={ingredient}` |

**Base URL:** `https://www.themealdb.com/api/json/v1/1/`

---

## ☁️ Deployment

This app is configured for zero-setup deployment on [Vercel](https://vercel.com).

**Deploy in three steps:**

1. Push the repository to GitHub
2. Import the repo in the [Vercel dashboard](https://vercel.com/new)
3. Add the environment variable `VITE_MEALDB_API_KEY=1` in Vercel's project settings

Vercel will automatically detect Vite, run `npm run build`, and deploy.
The Service Worker is generated at build time and served correctly from the root path.

---

## 🗺️ Roadmap

Potential v2 features (out of scope for v1):

- [ ] MealDB V2 multi-ingredient filtering (requires supporter key)
- [ ] Shopping list generator from a week's meal plan
- [ ] Recipe scaling (adjust servings and recalculate ingredient amounts)
- [ ] Dark mode

---

## 📄 Licence

MIT © 2026 — free to use, adapt, and build upon.

---

## 🙏 Acknowledgements

- [TheMealDB](https://www.themealdb.com/) — for providing a free, well-structured recipe API
- [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) & [DM Sans](https://fonts.google.com/specimen/DM+Sans) — Google Fonts
- [Vite](https://vitejs.dev/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Zustand](https://zustand-demo.pmnd.rs/), [TanStack Query](https://tanstack.com/query)
