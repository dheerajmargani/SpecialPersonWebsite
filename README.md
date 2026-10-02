# 🌌 A Little Universe

A premium, cinematic, emotionally meaningful personal website created for **Gouru Dwarakamai (Dwaraka)**.

---

## Tech Stack

- **React.js** + **Vite**
- **Framer Motion** — cinematic animations
- **Lucide React** — minimal icons
- **Vanilla CSS** — complete design control

---

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Adding Music 🎵

1. Place your MP3 files in `public/music/`
2. Name them exactly:
   - `track-01.mp3`
   - `track-02.mp3`
   - `track-03.mp3`
   - `track-04.mp3`
3. The music player will automatically work once files are present.

To change song titles/artists, edit `src/data/content.js` → `playlist` array.

---

## Customizing the Content

**All editable content is in one file: [`src/data/content.js`](src/data/content.js)**

| Variable | What to edit |
|---|---|
| `CONFIG.name` | Short name displayed in greetings |
| `CONFIG.fullName` | Full name on the opening screen |
| `CONFIG.from` | Your name (signature) |
| `universeCards` | The 4 personality cards |
| `littleThings` | The 5 "little things I notice" lines |
| `playlist` | Song titles, artists, durations |
| `moments` | The 5 timeline memories |
| `letterContent` | The letter body text |

---

## Sections

| # | Section | ID |
|---|---|---|
| 01 | Cinematic Opening | — |
| 02 | Hey, Dwaraka | `#hey` |
| 03 | Your Little Universe | `#universe` |
| 04 | Little Things I Notice | `#little-things` |
| 05 | If You Were a Playlist | `#playlist` |
| 06 | Little Moments | `#moments` |
| 07 | Things I Don't Always Say | `#things` |
| 08 | What You Mean to Me | `#what-you-mean` |
| 09 | My Promise | `#promise` |
| 10 | A Letter for You | `#letter` |
| 11 | Final Screen | `#final` |

---

## Deploy to Vercel

```bash
npm run build
```

Then drag the `dist/` folder to [vercel.com/new](https://vercel.com/new), or connect your GitHub repo.

---

## Design System

| Token | Value |
|---|---|
| Background deep | `#05050A` |
| Background mid | `#090A12` |
| Accent (lavender) | `#C8A2FF` |
| Soft accent (pink) | `#F2B6D2` |
| Font — Headings | Playfair Display |
| Font — Body | Inter |
| Font — Signature | Caveat |

---

*Made with care. Not a template. A universe.*
