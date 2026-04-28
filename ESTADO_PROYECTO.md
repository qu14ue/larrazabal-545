# ESTADO DEL PROYECTO — Larrazabal 545 Landing Page
**AKPROP — Ariel Kuznicki Propiedades**
Última actualización: abril 2026

---

## 1. Estructura de archivos

```
larrazabal-landing/
├── index.html               # Landing page principal (4 230 líneas — HTML + CSS + JS en un solo archivo)
├── privacidad.html          # Política de privacidad (standalone, enlazada desde el footer)
├── ESTADO_PROYECTO.md       # Este archivo
└── assets/
    ├── logos/
    │   ├── akprop-blanco.png
    │   └── akprop-negro.png
    └── img/
        ├── hero/
        │   └── hero-living.jpg          # Imagen de fondo del Hero
        ├── 1200x628/                    # Imágenes horizontales (galería, lightbox)
        │   ├── balcon-terraza.jpg
        │   ├── balcon-terraza-02.jpg
        │   ├── bano-principal.jpg
        │   ├── bano-principal-2.jpg
        │   ├── cochera.jpg
        │   ├── cocina.jpg
        │   ├── dormitorio-01..05.jpg
        │   ├── exterior-01.jpg
        │   ├── living-01.jpg
        │   ├── living-02.jpg
        │   └── palier-planta-baja.jpg
        ├── 1200x1200/                   # Imágenes cuadradas (pilares, grid)
        │   ├── balcon-terraza-1200.jpg
        │   ├── balcon-terraza-02-1200.jpg
        │   ├── bano-01-1200.jpg
        │   ├── cochera-1200.jpg
        │   ├── cocina-01-1200.jpg
        │   ├── cocina-02-1200.jpg
        │   ├── cocina-muebles.jpg
        │   ├── exterior-1200.jpg
        │   ├── living01-1200.jpg
        │   ├── palier-01-1200.jpg
        │   └── septimo-piso.jpg
        ├── 870x1200/                    # Imágenes verticales (grid alternado)
        │   ├── bano-principal-04.jpg
        │   ├── cocina-03.jpg
        │   ├── contrafrente.jpg
        │   ├── exterior-02.jpg
        │   ├── living-03.jpg
        │   └── pasillo-01.jpg
        ├── staging/                     # Renders de amoblamiento virtual (AI staging)
        │   ├── premium-1.jpg
        │   ├── premium-2.jpg
        │   └── balcon-natural.jpg
        └── asesor/
            ├── ariel.png
            └── ariel-kuznicky-01.jpg
```

**Repositorio Git:** inicializado, rama `main`, con remote `origin` configurado.

---

## 2. Stack tecnológico

| Capa | Tecnología |
|---|---|
| Markup | HTML5 semántico (`<section>`, `<nav>`, `<footer>`, `<main>`) |
| Estilos | CSS vanilla (custom properties, Flexbox, Grid, clamp()) |
| Scripts | JavaScript vanilla ES2020+ (IIFE única, sin frameworks) |
| Fuentes | Google Fonts — **Fraunces** (serif display) + **Inter** (sans-serif) |
| Mapa | Google Maps embed (`<iframe>`) |
| Video | YouTube embed con lazy load (`data-src`) |
| SEO | Schema.org `RealEstateListing` (JSON-LD), Open Graph, Twitter Card |
| Legal | Ley 25.326 Argentina (Protección de Datos Personales) |
| Build | Sin build step — archivos servidos directamente (hosting estático) |
| Versión | Git, rama `main` |
| Deploy | Subdominio `larrazabal.akprop.com.ar` (HTTPS / TLS) |

---

## 3. Dependencias y librerías externas

Todo se carga desde CDNs externos. No hay `package.json` ni node_modules.

| Recurso | Proveedor | Propósito |
|---|---|---|
| `Fraunces` (variable font) | Google Fonts | Tipografía display / serif |
| `Inter` | Google Fonts | Tipografía de cuerpo |
| Google Maps embed | Google | Sección ubicación |
| YouTube embed | YouTube / Google | Video recorrido (`qwxtOoFD6RU`) |
| WhatsApp deeplink | Meta / WhatsApp | CTA flotante + formulario de contacto |

**Sin dependencias JS instaladas** (sin jQuery, sin React, sin Alpine, sin GSAP).

---

## 4. Convenciones de código

### HTML
- Atributos en orden: `id → class → type → name → href/src → aria-* → data-*`
- Indentación: 2 espacios
- Una sección por bloque `<section>`, con `data-screen-label="NN Nombre"` para tracking futuro
- IDs en camelCase (`ctaForm`, `navBurger`, `videoPoster`)
- Clases en BEM: `.bloque__elemento--modificador` (ej: `.hero__title`, `.pilar--soft`)

### CSS
- Una propiedad por línea
- Orden de propiedades dentro de cada regla:
  1. Posicionamiento (`position`, `top`, `z-index`, `isolation`)
  2. Display / Box model (`display`, `flex-*`, `grid-*`, `width`, `height`, `padding`, `margin`, `overflow`)
  3. Tipografía (`font-*`, `line-height`, `letter-spacing`, `text-*`, `color`)
  4. Visual (`background`, `border`, `border-radius`, `box-shadow`, `opacity`, `cursor`)
  5. Transiciones / animaciones (`transition`, `animation`, `transform`)
- Custom properties (tokens) agrupadas semánticamente en `:root` — **no reordenar**
- Media queries mobile-first (min-width) salvo excepciones de altura (max-height)
- Breakpoints estándar: `640px`, `768px`, `900px`, `1024px`, `1440px`
- Secciones CSS delimitadas con: `/* ============================================================ N. NOMBRE */`

### JavaScript
- Una sola IIFE envolvente al final del `<body>`
- Subsecciones numeradas con comentarios `// N. Descripción`
- `const` por defecto, `let` solo cuando hay reasignación
- Sin `var`, sin `console.log` en producción
- Event listeners registrados con `{ passive: true }` donde aplica
- Validación de existencia antes de operar: `if (el) { ... }`

### Tokens de diseño (`:root`)
```css
--ink / --ink-2 / --ink-soft / --ink-muted   /* escala de grises */
--paper / --paper-alt / --paper-warm          /* fondos cálidos */
--line / --line-strong                        /* bordes */
--orange / --orange-soft                      /* color de marca */
--white / --success
--f-serif / --f-sans                          /* familias tipográficas */
--container: 1280px
--pad-x: 24px → 40px → 64px                  /* padding lateral responsivo */
--nav-h: 64px → 76px → 88px                  /* altura del navbar */
--radius / --radius-lg
--ease                                        /* cubic-bezier estándar */
--reveal-y: 24px                              /* desplazamiento de animación */
```

---

## 5. Arquitectura de secciones (index.html)

El archivo es un documento único. Las secciones CSS están numeradas; los `<section>` en HTML llevan `data-screen-label` equivalente.

| # | ID / clase | Nombre | Notas |
|---|---|---|---|
| 01 | `.hero` | Hero | Pantalla completa, imagen de fondo, word cycling en H1 |
| 02 | `.gancho` | Gancho | Copy de apertura, layout tipo Dirección C |
| 03 | `#video` | Video | YouTube embed con lazy load + poster |
| 04–08 | `.pilar` | Pilares | Componente reutilizable (palier, altura, terraza, barrio, precio) |
| 09 | `.staged` | Interior ambientado | Tríptico con renders de staging |
| 10 | `#galeria` | Galería | Grid de fotos + lightbox JS |
| 11 | `#ficha` | Ficha técnica | Tabla de datos de la propiedad |
| 12 | `#ubicacion` | Ubicación | Google Maps embed |
| 13 | `#asesor` | Asesor | Perfil de Ariel Kuznicki |
| 14 | `.testimonios` | Testimonios | Citas de clientes |
| 15 | `.cta-final` | CTA Final | Formulario → WhatsApp |
| 16 | `.footer` | Footer | Links, matrícula, política de privacidad |

**Componentes globales:**
- `.nav` — Navbar sticky con burger mobile y drawer
- `.wa-float` — Botón flotante de WhatsApp
- `#lbox` — Lightbox modal para galería
- `.reveal` — Clase genérica para animaciones on-scroll (IntersectionObserver)

---

## 6. Módulos JavaScript (IIFE única)

| # | Función | Descripción |
|---|---|---|
| 1 | Nav scroll | Agrega `.is-solid` al nav al scrollear >40px |
| 2 | Mobile drawer | Toggle del menú hamburguesa |
| 3 | Video lazy load | Mueve `data-src` a `src` del iframe al hacer click en el poster |
| 4 | Reveal on scroll | IntersectionObserver — agrega `.is-visible` al entrar al viewport |
| 5 | Galería lightbox | Abre modal con imagen, navegación por teclado y click |
| 6 | CTA Form → WhatsApp | Valida campos y abre `wa.me` con mensaje pre-armado |
| 7 | Word cycling | Rota palabras en el H1 del Hero con crossfade (3 s / 500 ms) |

---

## 7. Problemas resueltos

### Hero — Posicionamiento vertical en distintos dispositivos
**Causa raíz:** `.hero` usa `display: flex; flex-direction: column; justify-content: flex-end`. En viewports altos, el contenido se va al fondo.

**Solución:** Tres capas de media queries en cascade:
```css
/* Base — desktop */
.hero { justify-content: flex-end; }

/* Mobile portrait ≤767px */
@media (max-width: 767px) { .hero { justify-content: center; padding-top: var(--nav-h); } }

/* Tablet (iPad Mini → iPad Pro 12.9") */
@media (min-width: 768px) and (max-width: 1366px) { .hero { justify-content: center; padding-top: var(--nav-h); } }

/* Landscape / pantallas cortas ≤600px alto */
@media (max-height: 600px) { .hero { justify-content: flex-start; min-height: auto; padding-top: calc(var(--nav-h) + 40px); } }
```

### Video — Click en poster no funcionaba
**Causa:** Faltaba `id="videoFrame"` en el iframe → `getElementById()` devolvía `null` → condición `if (poster && frame)` nunca era true.
**Fix:** Se agregó el `id`. También se corrigió el atributo `allow` (tenía saltos de línea), se reemplazó el `?si=...` de YouTube por `?autoplay=1&rel=0`, y se eliminó la regla CSS `#videoFrame { display: none }` que ocultaba permanentemente el iframe.

### Video — iframe se renderizaba sobre el poster
**Causa:** El iframe aparece después en el DOM → stacking context natural lo ponía encima.
**Fix:** `z-index: 1` en `.video__poster`.

### Refactor CSS — Custom properties reordenadas incorrectamente
**Causa:** El script de refactor Python detectaba comentarios dentro de `:root {}` y los concatenaba con la propiedad siguiente, asignándoles sort key 999.
**Fix:** Se detectan bloques donde todas las props son custom (`--*`) y se omite el reordenamiento.

### Refactor CSS — Reglas `@media` perdían indentación interna
**Causa:** El script usaba `.strip()` en el CSS interno formateado, eliminando espacios.
**Fix:** Cambio a `.lstrip('\n')` para solo remover newlines iniciales.

### Refactor HTML — Atributos multi-línea con indentación incorrecta
**Causa:** El script usaba 2 espacios hardcodeados en vez de detectar la indentación del tag.
**Fix:** Se calcula el indent real leyendo la línea donde empieza el tag.

### Refactor JS — Doble punto y coma (`;;`) tras limpieza de console.log
**Causa:** El regex `console\.info\([^\n]+\)` matcheaba el `)` interior de `console.info(window.console)`, dejando el `;` final como carácter suelto.
**Fix:** Regex extendido para capturar la línea completa incluyendo el `;` final y el newline.

---

## 8. Problemas pendientes / Tareas abiertas

| Prioridad | Tarea | Detalle |
|---|---|---|
| Alta | Conectar formulario a Tokko CRM | El form actual abre WhatsApp. Integrar con la API de Tokko Broker para registrar leads automáticamente. |
| Alta | Definir GTM Container ID | El HTML tiene el placeholder `GTM-XXXXXXX`. Reemplazar con el ID real del contenedor de Google Tag Manager. |
| Media | Definir imagen OG definitiva | `og:image` apunta a `hero-living.jpg`. Evaluar si se usará una imagen optimizada 1200×628px específica. |
| Media | Eliminar watermarks "AI" de renders | Los archivos en `assets/img/staging/` tienen watermarks visibles de la herramienta de staging. Reemplazar con versiones limpias. |
| Media | QA visual completo | Revisión en dispositivos reales: iPhone XR/14, iPad Air, iPad Pro, escritorio. |
| Baja | Accesibilidad — skip link | Agregar `<a href="#main" class="skip-link">` para usuarios de teclado. |
| Baja | `<meta name="theme-color">` | Agregar para color de barra de status en mobile. |
| Baja | Lazy loading nativo en imágenes | Revisar y completar `loading="lazy"` en imágenes fuera del viewport inicial. |

---

## 9. Notas de despliegue

- **URL de producción:** `https://larrazabal.akprop.com.ar/`
- **Protocolo:** HTTPS con TLS (requerido por CSP y mixed-content)
- **Sin proceso de build:** los archivos se suben directamente al hosting estático
- **Caché recomendada:** imágenes (`/assets/`) con `Cache-Control: max-age=31536000, immutable`; HTML con `no-cache` o ETag
- **robots:** `index.html` → indexable; `privacidad.html` → `noindex, follow`
