# OyeColombia

Aplicación Angular para listar y reproducir emisoras de radio de Colombia.

## Requisitos
- Node.js (versión compatible con Angular CLI instalada)
- Angular CLI (instalado globalmente): ng
- Docker (para construir y ejecutar la imagen)

## Instalación
Desde la raíz del proyecto:
```sh
npm install
```

(Instalación de dependencias necesaria una sola vez; los comandos de ejecución abajo usan `ng`.)

## Servidor de desarrollo
Iniciar servidor con recarga en caliente:
```sh
ng serve
```
Abrir: http://localhost:4200

Si obtienes 404 al cargar assets (por ejemplo `assets/data/stations.json`), verifica que el archivo exista en `src/assets/data/` y que `angular.json` incluya `"src/assets"` en la propiedad `assets`. Reinicia `ng serve` después de añadir archivos.

## Generar código
Crear un componente:
```sh
ng generate component ruta/nombre-componente
```

## Construcción (producción)
Generar build optimizado:
```sh
ng build --configuration production
```
Los archivos generados quedan en `dist/`.

## Tests
Ejecutar tests unitarios:
```sh
ng test
```

Ejecutar pruebas end-to-end:
```sh
ng e2e
```

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

## Notas
- Usar comandos `ng` para desarrollo y construcción.
- Reiniciar el servidor de desarrollo tras cambios en `angular.json` o al añadir nuevos archivos en `src/assets`.
- Contribuciones y mejoras bienvenidas.
