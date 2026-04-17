# OyeColombia

Aplicación Angular para listar y reproducir emisoras de radio de Colombia.

## Tecnologías
- Angular 20
- RxJS
- Tailwind (via PostCSS)
- Docker + Nginx para despliegue estático

## Requisitos
- Node.js (versión compatible con Angular CLI instalada)
- Angular CLI (instalado globalmente): ng
- Docker (para construir y ejecutar la imagen)

## Instalación
En la raíz del proyecto:
```sh
npm install
```

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

## Docker
### Estructura del Dockerfile
Se usa multi-stage build:
1. Stage `builder`: instala dependencias y genera el build de producción (`dist/oye-colombia/browser`).
2. Stage `runner`: imagen base `nginx` que sirve los archivos estáticos.

### Construir imagen
```sh
docker build -t oye-colombia:latest .
```

Si ves error de permisos ("permission denied" al conectar con `/var/run/docker.sock`), añade tu usuario al grupo docker:
```sh
sudo usermod -aG docker $USER
# Cierra sesión y vuelve a entrar (o reinicia) para aplicar el cambio.
```
Verifica:
```sh
groups $USER
```
Debe incluir `docker`.

### Ejecutar contenedor
Modo foreground (Ctrl+C para parar):
```sh
docker run --rm -p 8080:80 oye-colombia:latest
```
Abrir: http://localhost:8080

Modo detach:
```sh
docker run -d --name oye-colombia -p 8080:80 oye-colombia:latest
```
Logs:
```sh
docker logs -f oye-colombia
```
Parar y eliminar:
```sh
docker stop oye-colombia && docker rm oye-colombia
```

### Reconstruir tras cambios
Si modificas código fuente:
```sh
docker build --no-cache -t oye-colombia:latest .
```

## Archivos importantes
- App principal: `src/app/app.ts`
- Componentes: `src/app/components/`
- Contratos / modelos: `src/app/contracts/`
- Datos locales: `src/assets/data/stations.json`
- Configuración del CLI: `angular.json`
- Configuración de Nginx (contenedor): `nginx.conf`
- Dockerfile multi-stage: `Dockerfile`

## Checklist rápida antes de abrir PR
- [ ] Compila: `ng build`
- [ ] Tests unitarios pasan: `npm test`
- [ ] Sin archivos grandes o sensibles añadidos
- [ ] README actualizado si aplica

## Licencia
(Si deseas definir una licencia, añade el archivo LICENSE. Actualmente no se especifica.)

---
Mantener este README conciso y libre de pasos innecesarios reduce fricción para contribuir.
