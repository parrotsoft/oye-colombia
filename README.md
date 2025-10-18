# OyeColombia

Aplicación Angular para listar y reproducir emisoras de radio de Colombia.

## Requisitos
- Node.js (versión compatible con Angular CLI instalada)
- Angular CLI (instalado globalmente): ng

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

## Archivos importantes
- App principal: `src/app/app.ts`
- Componentes: `src/app/components/`
- Contratos / modelos: `src/app/contracts/`
- Datos locales: `src/assets/data/stations.json`
- Configuración del CLI: `angular.json`

## Notas
- Usar comandos `ng` para desarrollo y construcción.
- Reiniciar el servidor de desarrollo tras cambios en `angular.json` o al añadir nuevos archivos en `src/assets`.
- Contribuciones y mejoras bienvenidas.
