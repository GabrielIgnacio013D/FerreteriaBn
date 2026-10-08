# Ferretería BN

## Integrantes
- Gabriel Fuentes (ga.fuentess@duocuc.cl)

## Caso
Ferretería BN

## Descripción del caso
Aplicación web para gestionar e iniciar sesión en la tienda Ferretería BN.
La interfaz permite la autenticación de usuarios mediante un formulario de login y facilita la navegación hacia las distintas secciones de gestión del sistema (catálogo, inventario y menú principal). En esta etapa, el proyecto incluye soporte para persistencia de datos local (CRUD) mediante `localStorage` y estado compartido con `Context API`.

## Estructura del proyecto
```text
src/
├── assets/
├── components/
│   ├── atoms/
│   │   ├── BotonSubmit.jsx
│   │   └── InputTexto.jsx
│   ├── molecules/
│   │   └── FormularioLogin.jsx
│   ├── organisms/
│   │   └── TarjetaLogin.jsx
│   └── templates/
├── context/
│   └── ProductosContext.jsx
├── data/
│   └── productos.json
├── pages/
│   ├── Login.jsx
│   └── MenuPrincipal.jsx
├── services/
│   └── productoService.js
├── App.css
├── App.jsx
├── index.css
└── main.jsx



## Cómo instalar, ejecutar y probar

### Instalar
```bash
npm install
```

### Ejecutar
```bash
npm run dev
```

### Pruebas unitarias (Vitest + Testing Library)
```bash
npm run test -- --run
```

### Cobertura
```bash
npm run coverage
```