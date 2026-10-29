# Progresión · página del prompt

Página pública para compartir gratis el prompt con el que se construyó la app de gimnasio "Progresión".
React + TypeScript + Vite. Sin base de datos, sin usuarios, sin analítica.

## Cambiar el texto del prompt

Edita `src/content/prompt.md`. La página lo muestra con formato y el botón copia ese archivo tal cual.
Reglas del formato: los renglones en MAYÚSCULAS se muestran como títulos, los que empiezan con `- ` como lista.

En GitHub: abre el archivo, pulsa el lápiz, edita y pulsa "Commit changes". Vercel publica la nueva versión solo en 1-2 minutos.

## Probar en tu computadora (opcional)

```bash
npm install
npm run dev
npm test
```

## Publicar

1. Sube esta carpeta a un repositorio de GitHub.
2. En Vercel: Add New, Project, importa el repositorio y pulsa Deploy. No necesita variables de entorno.

## Imagen al compartir el enlace

`public/og.png` es la vista previa en redes. Algunas redes piden la dirección completa de la imagen:
cuando tengas tu dirección de Vercel, cambia en `index.html` las dos líneas `content="/og.png"` por
`content="https://TU-DIRECCION.vercel.app/og.png"`.
