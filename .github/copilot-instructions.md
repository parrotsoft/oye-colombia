# Copilot Instructions — OyeColombia

Angular 20 app that lists and plays Colombian radio stations. Data is loaded from a local JSON file and streamed via native `<audio>`.

## Commands

```sh
npm start              # dev server at http://localhost:4200
npm run build          # production build → dist/oye-colombia/browser/
npm test               # unit tests with Karma/Jasmine (headless Chrome)
npm run format         # format all src files with Prettier
npm run format:check   # check formatting without writing
```

Run a single test file:
```sh
npx ng test --include='**/station-card-component.spec.ts'
```

## Architecture

- **Data source**: `src/assets/data/stations.json` — loaded at runtime via `HttpClient` in `App` (root component). No backend.
- **Models**: interfaces live in `src/app/contracts/` (e.g., `Station`).
- **Components**: `src/app/components/{name}-component/` — each folder contains `.ts`, `.html`, `.css`, and `.spec.ts`.
- **Routing**: defined in `app.routes.ts` but currently empty; `<router-outlet>` is commented out in `app.html`.
- **Styling**: Tailwind CSS v4 via PostCSS (`@import 'tailwindcss'` in `styles.css`). No `tailwind.config.js` — config lives in `postcss.config` / `.postcssrc.json`.

## Key Conventions

**Zoneless Angular**: The app uses `provideZonelessChangeDetection()` — there is no NgZone. Change detection must be triggered explicitly (e.g., `cdr.detectChanges()`) or via signals/async pipe. Tests must also include `provideZonelessChangeDetection()` in `TestBed.configureTestingModule`.

**Standalone components**: All components use `standalone` style (Angular 20 default). Import what you need in the component's `imports: []` array; no `NgModule`.

**Signal inputs**: Use `input<T>()` from `@angular/core` for component inputs, not the `@Input()` decorator.

**Signals for state**: Use `signal()` for reactive component state instead of plain properties where reactivity is needed.

**Component naming**: Folder and file use the full `{name}-component` suffix (e.g., `station-card-component/station-card-component.ts`), selector is `app-{name}-component`.

**`.m3u8` streams are filtered out** in `app.html` — HLS is not supported by the native `<audio>` element in most browsers; don't add those streams.

**Prettier config** (in `package.json`): `printWidth: 100`, `singleQuote: true`, Angular parser for `.html` files.

## Deployment

- **GitHub Pages**: push to `master` triggers `.github/workflows/deploy.yml`, which builds and deploys to `oyecolombia.com`.
- **Docker**: multi-stage build — Node 20 Alpine builder → `nginx:stable-alpine` runner. Serves `dist/oye-colombia/browser/` as static files.
  ```sh
  docker build -t oye-colombia:latest .
  docker run --rm -p 8080:80 oye-colombia:latest
  ```
