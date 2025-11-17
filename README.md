# OyeColombia

Aplicación Angular para listar y reproducir emisoras de radio de Colombia.

## Tecnologías
- Angular 20
- RxJS
- Tailwind (via PostCSS)
- Docker + Nginx para despliegue estático

## Requisitos
- Node.js 18+ (recomendado 20, coincide con imagen del Dockerfile)
- npm (incluido con Node)
- (Opcional) Angular CLI global si quieres usar `ng` directamente

```sh
npm install -g @angular/cli
```

## Instalación
En la raíz del proyecto:
```sh
npm install
```
Esto instala dependencias una sola vez.

## Scripts principales
Puedes usar `ng` o los scripts definidos en `package.json`.

```sh
npm start        # equivale a ng serve (configuración development)
npm run build    # build (configuración por defecto production)
npm test         # tests unitarios con Karma/Jasmine
```

También puedes invocar directamente:
```sh
ng serve
ng build --configuration production
ng test
```

## Desarrollo
Levantar servidor con recarga en caliente:
```sh
npm start
```
Abrir: http://localhost:4200

Si ves errores 404 cargando assets (ej: `assets/data/stations.json`):
1. Verifica que exista en `src/assets/data/`.
2. Confirma que `angular.json` incluye `"src/assets"` dentro de `assets`.
3. Reinicia el servidor (`Ctrl+C` y `npm start`).

## Generar código (schematics)
Crear un componente:
```sh
ng generate component ruta/nombre-componente
```
Ejemplo:
```sh
ng generate component components/station-card-component
```

## Build de producción
Generar build optimizado (hashing + budgets):
```sh
ng build --configuration production
```
Los artefactos quedan en `dist/oye-colombia/browser/` (ruta usada por el Dockerfile).

Nota: El Dockerfile usa `npm run build --prod`. La bandera `--prod` es un alias histórico que activa la configuración de producción; mantenerlo no implica riesgo, pero puedes modernizar a `npm run build -- --configuration production` en el futuro si deseas.

## Pruebas
Ejecutar tests unitarios:
```sh
npm test
```
(No hay configuración de pruebas end-to-end en este proyecto actualmente, por eso se omite.)

## Docker (despliegue estático)
Construir la imagen multi-stage (Angular build + Nginx):
```sh
docker build -t oye-colombia:latest .
```
Ejecutar el contenedor:
```sh
docker run --rm -p 8080:80 oye-colombia:latest
```
Abrir: http://localhost:8080

La configuración de Nginx (`nginx.conf`) hace fallback a `index.html` para rutas internas (SPA) y aplica caché básica a assets estáticos.

## Estructura clave
- Entrada aplicación: `src/main.ts`
- Componente raíz: `src/app/app.ts`
- Componentes: `src/app/components/`
- Contratos / modelos: `src/app/contracts/`
- Datos locales: `src/assets/data/stations.json`
- Configuración Angular CLI: `angular.json`
- Configuración servidor estático: `nginx.conf`
- Docker multi-stage: `Dockerfile`

## Contribuir
PRs pequeños y enfocados son bienvenidos. Recomendaciones:
1. Crear rama descriptiva (`feat/x`, `fix/y`).
2. Ejecutar `npm test` antes de abrir el PR.
3. Mantener cambios mínimos (evitar formateos masivos no relacionados).

## Checklist rápida antes de abrir PR
- [ ] Compila: `ng build`
- [ ] Tests unitarios pasan: `npm test`
- [ ] Sin archivos grandes o sensibles añadidos
- [ ] README actualizado si aplica

## Licencia
(Si deseas definir una licencia, añade el archivo LICENSE. Actualmente no se especifica.)

---
Mantener este README conciso y libre de pasos innecesarios reduce fricción para contribuir.
