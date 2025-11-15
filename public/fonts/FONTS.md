### Cómo usar fuentes de Fontshare en Next.js

>  A continuación encontrarás una guía corta y clara para agregar una fuente personalizada de Fontshare (como Supreme) en un proyecto Next.js

### Descargar la fuente desde Fontshare

- Ingresa a Fontshare, busca la fuente "Supreme" y descárgala en formato "Web".

- Eso generará un zip con una carpeta fonts (archivos .woff2 y .woff) y otra css (con archivos CSS de ejemplo).

### Estructura de carpetas

- Dentro de tu proyecto Next.js, ubica la carpeta public/.

- Crea la estructura: public/fonts/supreme/fonts/

- Copia de la descarga solo los archivos ".woff2" y ".woff" de los pesos/estilos que vayas a usar a esa carpeta.



    Por ejemplo, solo:

        Supreme-Regular.woff2,

        Supreme-Bold.woff2,

        Supreme-Medium.woff2,

        etc.


### Agrega las reglas @font-face

- Dirígete a la carpeta /app/ y crea o edita el archivo fonts.css.
- Escribe los siguientes imports (ajusta si decides otro nombre o ubicación):

```css
@font-face {
    font-family: 'Supreme';
    src: url('/fonts/supreme/fonts/Supreme-Regular.woff2') format('woff2'),
         url('/fonts/supreme/fonts/Supreme-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Supreme';
    src: url('/fonts/supreme/fonts/Supreme-Medium.woff2') format('woff2'),
         url('/fonts/supreme/fonts/Supreme-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Supreme';
    src: url('/fonts/supreme/fonts/Supreme-Bold.woff2') format('woff2'),
         url('/fonts/supreme/fonts/Supreme-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
}
```

###  Importa fonts.css en Next.js
En tu archivo principal de layout (/app/layout.js o /app/layout.tsx), importa el css de fuentes:

```
import './fonts.css';
import './globals.css';
```

### Aplica la fuente
En tu CSS global (ej: globals.css o donde prefieras):

```
body {
  font-family: 'Supreme', sans-serif;
}
```

Con Tailwind, puedes cambiar el grosor con clases como:

    font-normal (400)

    font-medium (500)

    font-bold (700)

Ejemplo:
``` html
<h1 className="font-bold">Título en Supreme Bold</h1>
<p className="font-normal">Texto en Supreme Regular</p>
```

Errores frecuentes

- Rutas mal escritas: recuerda que debes usar siempre /fonts/tu-carpeta/archivo.woff2. No uses rutas relativas.

- No copiar todos los archivos: solo necesitas los pesos/estilos que quieras usar; no hace falta copiar todos, pero si usas un peso que no agregaste, no se mostrará correctamente.

