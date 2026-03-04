# Marco & Beatrice Zukunftsdashboard (PWA)

## Dateien
- `index.html` (die App)
- `manifest.json`
- `sw.js`
- `icon.svg`
- `apple-touch-icon.png`

## GitHub Pages (iPad / iPhone Installation)

iOS/iPadOS installiert PWAs über Safari **manuell**: Teilen → „Zum Home-Bildschirm“. citeturn0search4  
Damit es sauber als App startet, brauchst du mindestens ein Web App Manifest und am besten einen Service Worker. citeturn0search0

### 1) Repository anlegen
1. GitHub → New repository (z.B. `zukunftsdashboard`)
2. Dateien hochladen:
   - **Wichtig:** Benenne `Marco-und-Beatrice-Zukunftsdashboard-App-v2.8.html` um in **`index.html`**
   - Lege `manifest.json`, `sw.js`, `icon.svg`, `apple-touch-icon.png` daneben ins Root-Verzeichnis.

### 2) GitHub Pages aktivieren
1. Repo → **Settings** → **Pages**
2. **Source**: „Deploy from a branch“
3. Branch: `main` / Folder: `/ (root)`
4. Speichern → Pages-URL wird angezeigt.

### 3) iPad Installation
1. Öffne die Pages-URL in **Safari** (nicht Chrome).
2. Share-Symbol → **Zum Home-Bildschirm**.
3. App startet anschließend im „Standalone“-Modus.

### 4) Typische Fehler (und Fix)
- **Service Worker lädt nicht**: Pfade müssen relativ sein und im gleichen Scope liegen. citeturn0search13turn0search24
- **Start URL falsch**: nutze relative `start_url` (z.B. `./`). citeturn0search15turn0search3
- **iOS Icon**: `apple-touch-icon.png` (180×180) hinterlegen. citeturn0search18turn0search14
