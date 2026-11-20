# Portfolio Awal
- Vite + React (JavaScript), hosted di GitHub Pages lewat GitHub Actions (`.github/workflows/deploy.yml`, build ke `dist`)
- Bahasa konten: English; tema gelap astronomi, minimalis
- Jangan tampilkan nomor HP di halaman publik
- Sumber konten: CV_Awal.pdf

## Lokal
```
npm install
npm run dev      # http://localhost:5173
npm run build    # hasil di dist/
npm run preview  # cek hasil build
```

## Aset (public/assets/)
- `milky-way.jpg` — latar hero (kredit sumber di footer)
- `card-front.png`, `card-back.png` — muka kartu 3D, rasio 2:3 (mis. 1000×1500)
- `CV_Awal.pdf` — versi publik tanpa nomor HP (lihat `.gitignore`)
- `favicon.svg`

Kartu 3D: komponen Lanyard dari React Bits (`src/components/Lanyard`), model `src/assets/lanyard/card.glb`.
