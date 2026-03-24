# Requerimientos — Template "Bienestar / Spa"

> **Este documento es un prompt técnico para una IA.** Contiene todos los requerimientos para generar una landing page completa, lista para producción. Seguí las instrucciones de cada sección al pie de la letra.

---

## 1. Resumen del Proyecto

| Campo | Valor |
|---|---|
| **Tipo** | Landing page (single page) para un Spa & Centro de Bienestar ficticio |
| **Nombre ficticio** | **Serenitá Spa & Bienestar** |
| **Objetivo principal** | Que el visitante **reserve un turno** para un tratamiento vía WhatsApp |
| **Objetivo secundario** | Que el visitante envíe una consulta formal por email (formulario de contacto) |
| **Idioma** | Español rioplatense (Argentina). Usar "vos" en vez de "tú". Ej: "Reservá", "Elegí", "Relajate" |
| **Tono del copy** | Cálido, sereno, profesional. Transmitir calma y confianza. Evitar lenguaje agresivo de venta |

---

## 2. Stack Tecnológico (OBLIGATORIO)

| Tecnología | Detalle |
|---|---|
| **HTML** | HTML5 semántico (`<header>`, `<section>`, `<footer>`, etc.) |
| **CSS** | Tailwind CSS vía CDN (`https://cdn.tailwindcss.com`). NO instalar Tailwind vía npm. Cargar el script en el `<head>` |
| **CSS Custom** | Archivo separado `css/styles.css` para animaciones, keyframes y estilos no cubiertos por Tailwind |
| **JavaScript** | Vanilla JS en archivo separado `js/main.js`. NO usar frameworks (React, Vue, etc.). NO usar jQuery |
| **Fuente** | Google Fonts, cargar vía `<link>`. Fuente sugerida: **"Playfair Display"** para títulos + **"Lato"** para cuerpo. Estas fuentes transmiten elegancia y legibilidad |
| **Imágenes** | URLs de Unsplash con temática spa/bienestar/zen. Cada `<img>` debe tener `alt` descriptivo, `loading="lazy"` y `decoding="async"` |
| **Iconos** | SVG inline (Heroicons style). NO usar font-awesome ni librerías de iconos externas |

### Estructura de archivos

```
bienestar-spa/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    └── (vacío, las imágenes se cargan desde Unsplash)
```

---

## 3. Configuración de Tailwind

Definir en `<script>` dentro del `<head>`, inmediatamente después de cargar el CDN de Tailwind:

```javascript
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                spa: {
                    cream: '#FAF6F1',       // fondo principal (light mode)
                    dark: '#2D2A26',         // textos principales
                    gold: '#B8956A',         // acento principal (dorado cálido)
                    'gold-hover': '#A07B52', // hover del acento
                    sage: '#8FAE8B',         // acento secundario (verde salvia)
                    stone: '#E8E0D6',        // bordes y fondos suaves
                    charcoal: '#1A1814',     // fondo dark mode
                }
            },
            fontFamily: {
                heading: ['Playfair Display', 'Georgia', 'serif'],
                body: ['Lato', 'system-ui', 'sans-serif'],
            },
        }
    }
}
```

### Paleta de colores — Guía de uso

| Color | Variable | Uso |
|---|---|---|
| `#FAF6F1` | `spa-cream` | Fondo principal (light mode) |
| `#2D2A26` | `spa-dark` | Texto principal |
| `#B8956A` | `spa-gold` | CTAs, acentos, bordes destacados |
| `#A07B52` | `spa-gold-hover` | Hover de CTAs |
| `#8FAE8B` | `spa-sage` | Badges, iconos, acentos secundarios |
| `#E8E0D6` | `spa-stone` | Bordes, fondos de cards, separadores |
| `#1A1814` | `spa-charcoal` | Fondo dark mode |

---

## 4. Dark Mode

Implementar toggle de tema claro/oscuro:

- **Light mode (por defecto):** fondo `spa-cream`, textos `spa-dark`
- **Dark mode:** fondo `spa-charcoal`, textos blancos/grises claros
- El toggle se controla con la clase `dark` en el `<html>`
- Guardar preferencia en `localStorage`
- Respetar `prefers-color-scheme` del sistema como valor inicial
- Botón de toggle visible en el header (ícono sol/luna)

---

## 5. Estructura de Secciones (en orden)

### 5.1 — Header (Navbar)

| Propiedad | Valor |
|---|---|
| **Posición** | `fixed top-0`, con `backdrop-blur` y fondo semitransparente |
| **Logo** | Texto: "Serenitá" en `font-heading` con acento `spa-gold` en el acento de la á. No usar imagen de logo |
| **Links de navegación** | Servicios · Galería · Reseñas · Contacto |
| **CTA en header** | Botón "Reservar turno" con fondo `spa-gold`, texto blanco, `rounded-full` |
| **Toggle dark mode** | Ícono sol/luna a la izquierda del CTA |
| **Mobile** | Hamburguesa que abre un menú **fullscreen overlay** (no dropdown). Z-index alto, fondo sólido, links centrados con font-size grande. Animación suave de fade-in |

### 5.2 — Hero

| Propiedad | Valor |
|---|---|
| **Layout** | Imagen de fondo a pantalla completa con overlay oscuro semitransparente. Texto centrado sobre la imagen |
| **Imagen de fondo** | Unsplash: ambiente zen, piedras apiladas, agua, naturaleza o sala de masajes. **Ejemplo URL:** `https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80` |
| **Título (H1)** | "Tu momento de calma empieza acá" |
| **Subtítulo** | "Tratamientos profesionales de relajación, belleza y bienestar en el corazón de [Ciudad]." |
| **CTA principal** | Botón "Reservar mi turno" → enlace a WhatsApp (ver sección 10 para formato del link). Color `spa-gold`, con animación de pulso suave (glow) |
| **CTA secundario** | Link de texto "Ver servicios ↓" que haga scroll suave a la sección de servicios |
| **Efecto** | Parallax suave en la imagen de fondo al hacer scroll. Texto con animación fade-in al cargar |
| **Altura** | `min-h-screen` |

### 5.3 — Barra de Confianza

| Propiedad | Valor |
|---|---|
| **Ubicación** | Inmediatamente debajo del hero |
| **Contenido** | 3 ítems en fila horizontal centrados con íconos: "🕐 Turnos en el día" · "⭐ +200 reseñas positivas" · "🌿 Productos naturales y orgánicos" |
| **Estilo** | Fondo suave `spa-stone`/`spa-cream`, texto `spa-dark`, padding vertical reducido. Los íconos pueden ser SVG inline o emojis |

### 5.4 — Servicios (con duración y precio)

| Propiedad | Valor |
|---|---|
| **Título (H2)** | "Nuestros tratamientos" |
| **Subtítulo** | "Cada sesión es una experiencia personalizada para vos." |
| **Layout** | Grid responsive: 1 columna en mobile, 2 en tablet, 3 en desktop |
| **Card de servicio** | Cada card tiene: imagen (Unsplash), nombre, descripción breve (1-2 líneas), duración (ej: "60 min"), precio (ej: "$15.000"), y botón "Reservar" que lleva a WhatsApp con mensaje pre-armado incluyendo el nombre del servicio |
| **Hover** | Card con transición suave: elevación de sombra + borde `spa-gold` sutil |
| **Animación** | Cada card aparece con fade-in al hacer scroll (intersection observer) |

**Servicios ficticios a incluir (6 cards):**

| Servicio | Duración | Precio | Imagen temática |
|---|---|---|---|
| Masaje Descontracturante | 60 min | $18.000 | Masajista trabajando en espalda |
| Limpieza Facial Profunda | 45 min | $12.000 | Tratamiento facial con cremas |
| Circuito de Aguas | 90 min | $22.000 | Piscina con vapor termal |
| Reflexología Podal | 40 min | $10.000 | Masaje de pies con piedras |
| Day Spa Completo | 120 min | $35.000 | Persona relajada con toalla |
| Masaje con Piedras Calientes | 75 min | $20.000 | Piedras volcánicas en espalda |

### 5.5 — Galería

| Propiedad | Valor |
|---|---|
| **Título (H2)** | "Conocé nuestro espacio" |
| **Layout** | Grid tipo masonry o grid asimétrico. 6-8 fotos de Unsplash con temática spa: sala de masajes, velas, productos, toallas, ambiente del lugar |
| **Interacción** | Al hacer click en una foto se abre un lightbox (modal con la imagen grande + botón de cerrar). Implementar con JS Vanilla |
| **Animación** | Fade-in escalonado al scrollear (cada foto aparece con un delay incremental de 100ms) |
| **Hover** | Leve zoom (`scale-105`) con transición suave |

### 5.6 — Reseñas / Testimonios

| Propiedad | Valor |
|---|---|
| **Título (H2)** | "Lo que dicen nuestros clientes" |
| **Layout** | Carousel/slider horizontal con flechas de navegación izquierda/derecha. 1 testimonio visible a la vez en mobile, 2 en tablet, 3 en desktop |
| **Card de reseña** | Nombre del cliente, estrellas (⭐ SVG), texto del testimonio, servicio que contrató |
| **Estilo** | Fondo suave, bordes `spa-stone`, icono de comillas decorativo |
| **Autoplay** | Rotación automática cada 5 segundos, se pausa al hover o touch |

**Reseñas ficticias (5 mínimo):**

| Cliente | Estrellas | Servicio | Testimonio |
|---|---|---|---|
| Valentina M. | ⭐⭐⭐⭐⭐ | Day Spa Completo | "Fue la mejor experiencia de relajación que tuve. El lugar es hermoso y el trato es impecable." |
| Luciano R. | ⭐⭐⭐⭐⭐ | Masaje Descontracturante | "Llegué con un dolor terrible de espalda y salí como nuevo. 100% recomendable." |
| Camila S. | ⭐⭐⭐⭐⭐ | Limpieza Facial | "Mi piel quedó increíble. Las chicas son muy profesionales y te hacen sentir super cómoda." |
| Martín G. | ⭐⭐⭐⭐ | Circuito de Aguas | "Un oasis en la ciudad. Ideal para desconectar después de una semana intensa." |
| Sofía L. | ⭐⭐⭐⭐⭐ | Reflexología Podal | "No sabía lo que era la reflexología hasta que probé acá. Salí flotando." |

### 5.7 — Formulario de Contacto (Email)

| Propiedad | Valor |
|---|---|
| **Título (H2)** | "¿Tenés alguna consulta?" |
| **Subtítulo** | "Escribinos y te respondemos a la brevedad." |
| **Campos** | Nombre completo (text, required) · Email (email, required) · Teléfono (tel, optional) · Servicio de interés (select con opciones de los servicios) · Mensaje (textarea, required) |
| **Botón** | "Enviar consulta" con fondo `spa-gold` |
| **Validación** | Validación HTML5 nativa. Campos required marcados con asterisco visual |
| **Nota importante** | El formulario **NO necesita backend**. Al hacer submit, simplemente mostrar un mensaje de confirmación ("¡Gracias! Nos ponemos en contacto pronto.") usando JS. Esto es una demo visual |
| **Layout** | Formulario a la izquierda, a la derecha información de contacto: dirección, teléfono, email, horarios de atención, mapa embebido de Google Maps (usar un iframe con una ubicación genérica). En mobile todo apilado |

### 5.8 — CTA Final (cierre)

| Propiedad | Valor |
|---|---|
| **Layout** | Sección full-width con imagen de fondo (zen/naturaleza) + overlay oscuro. Texto centrado |
| **Título** | "Regalate un momento de paz" |
| **Subtítulo** | "Reservá tu turno hoy y empezá a sentirte mejor." |
| **CTA** | Botón grande "Reservar mi turno" → WhatsApp. Con animación de pulso (`cta-pulse`). Color `spa-gold` |
| **Estilo** | Debe generar impacto visual. Usar la misma técnica de parallax que el hero |

### 5.9 — Footer

| Propiedad | Valor |
|---|---|
| **Fondo** | `spa-dark` o `spa-charcoal` |
| **Contenido** | Logo "Serenitá" · Dirección ficticia · Horarios (Lun-Sáb 9:00-20:00) · Links a redes sociales (Instagram, WhatsApp) como íconos SVG · Copyright "© 2025 Serenitá Spa & Bienestar" |
| **Layout** | 3 columnas en desktop (info, links, redes), apilado en mobile |

### 5.10 — Botón Flotante de WhatsApp

| Propiedad | Valor |
|---|---|
| **Posición** | `fixed bottom-6 right-6`, siempre visible |
| **Ícono** | SVG del logo de WhatsApp, blanco sobre fondo `#25D366` |
| **Tamaño** | `w-14 h-14`, `rounded-full`, con `shadow-lg` |
| **Animación** | Pulso suave (`box-shadow` que "respira") |
| **Link** | Abre WhatsApp con mensaje genérico pre-armado (ver sección 10) |
| **Z-index** | Alto (`z-50`) para que esté siempre sobre el contenido |

---

## 6. Animaciones y Efectos Únicos

Esta plantilla debe tener su **propio estilo visual**, diferente a otras plantillas. Implementar los siguientes efectos:

| Efecto | Detalle | Implementación |
|---|---|---|
| **Fade-in on scroll** | Elementos aparecen suavemente al entrar al viewport | Intersection Observer en `main.js`. Clase `.fade-in-up` con `opacity: 0; translateY(20px)` → `opacity: 1; translateY(0)` |
| **Parallax suave** | Imágenes de fondo del hero y CTA final se mueven más lento que el scroll | CSS `background-attachment: fixed` o JS con `transform: translateY()` en evento scroll (usar `requestAnimationFrame` y `passive: true`) |
| **Lightbox galería** | Click en foto → modal fullscreen con imagen grande | JS Vanilla. Overlay oscuro + imagen centrada + botón X para cerrar. Transición de opacidad |
| **Carousel testimonios** | Deslizamiento horizontal con flechas e indicadores (dots) | JS Vanilla. Translate horizontal con transición CSS. Sin librerías externas |
| **Hover en cards** | Cards de servicios se elevan y muestran borde dorado | Tailwind: `hover:shadow-lg hover:border-spa-gold/30 transition-all duration-300` |
| **Botón CTA pulse** | Resplandor dorado que "respira" alrededor del botón | Keyframe CSS: `box-shadow` que va de `0 0 0 0 rgba(184,149,106,0.5)` a `0 0 0 12px rgba(184,149,106,0)` |
| **Textura de grano** | Textura sutil tipo papel/grano sobre toda la página | `body::before` con pseudo-elemento usando una imagen de ruido SVG con `opacity: 0.03` y `pointer-events: none` |
| **Scroll suave (smooth)** | Todos los links internos (#) hacen scroll suave | CSS: `html { scroll-behavior: smooth }` y class `scroll-smooth` en `<html>` |

---

## 7. Responsive Design

| Breakpoint | Comportamiento |
|---|---|
| **< 640px (mobile)** | Todo apilado en una columna. Menú hamburguesa fullscreen. Cards de servicio una debajo de otra. Carousel de testimonios 1 visible. Formulario apilado. Galería en grid de 2 columnas |
| **640px - 768px (tablet)** | Servicios en grid de 2 columnas. Testimonios 2 visibles. Formulario y contacto lado a lado |
| **768px+ (desktop)** | Servicios en grid de 3 columnas. Testimonios 3 visibles. Todos los links de nav visibles. Hero con más padding |

---

## 8. SEO

| Elemento | Requisito |
|---|---|
| **`<title>`** | "Serenitá Spa & Bienestar — Reservá tu turno" |
| **`<meta description>`** | "Tratamientos de masajes, faciales y bienestar en [Ciudad]. Reservá tu turno online y regalate un momento de calma. Turnos disponibles hoy." |
| **`<meta og:title>`** | Igual que title |
| **`<meta og:description>`** | Igual que description |
| **`<meta og:type>`** | "website" |
| **`<meta og:locale>`** | "es_AR" |
| **H1 único** | Solo uno en toda la página (en el hero) |
| **Jerarquía** | H1 → H2 por sección → H3 si es necesario dentro de sección |
| **Alt en imágenes** | Todas con `alt` descriptivo en español |
| **Semántica** | Usar `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` |

---

## 9. Accesibilidad

| Requisito | Detalle |
|---|---|
| **Contraste** | Todos los textos cumplen WCAG AA mínimo |
| **Aria labels** | Botones sin texto visible (hamburguesa, toggle, scroll) con `aria-label` descriptivo |
| **Focus visible** | Todos los elementos interactivos tienen `focus:ring` visible |
| **Scroll pasivo** | Eventos de scroll con `{ passive: true }` |
| **Keyboard nav** | Modal/lightbox se puede cerrar con tecla Escape |

---

## 10. Links de WhatsApp

Todos los botones que dicen "Reservar turno" o "Reservar" deben usar este formato:

### CTA General (hero, CTA final, flotante):
```
https://wa.me/5491100000000?text=Hola%20Serenitá!%20Quiero%20reservar%20un%20turno.%20%C2%BFQué%20horarios%20tienen%20disponibles%3F
```

### CTA por servicio específico (cards de servicios):
```
https://wa.me/5491100000000?text=Hola!%20Quiero%20reservar%20un%20turno%20para%20[NOMBRE_DEL_SERVICIO].%20%C2%BFTienen%20disponibilidad%3F
```

> **Nota:** El número `5491100000000` es placeholder. En producción se reemplaza con el número real del cliente.

---

## 11. Performance

| Requisito | Detalle |
|---|---|
| **Imágenes** | Todas con `loading="lazy"` y `decoding="async"`. Usar parámetro `?w=800&q=80` en URLs de Unsplash para optimizar tamaño |
| **Fonts** | Cargar con `display=swap` para evitar FOIT |
| **JS** | Archivo `main.js` con `defer` en el `<script>` |
| **CSS** | Archivo `styles.css` enlazado en el `<head>` antes del body |
| **No librerías externas** | Solo Tailwind CDN + Google Fonts. Nada más |

---

## 12. Checklist Final de Validación

Antes de considerar el resultado como terminado, la IA debe verificar:

- [ ] La página carga sin errores en consola
- [ ] Dark mode funciona correctamente y se guarda en localStorage
- [ ] Menú mobile se abre y cierra correctamente en pantallas chicas
- [ ] Todos los links de WhatsApp tienen el formato correcto
- [ ] Las 6 cards de servicios se ven bien en mobile, tablet y desktop
- [ ] La galería lightbox abre y cierra correctamente
- [ ] El carousel de testimonios rota automáticamente y se puede navegar con flechas
- [ ] El formulario de contacto valida campos y muestra mensaje de confirmación
- [ ] Las animaciones fade-in se activan al hacer scroll
- [ ] El botón flotante de WhatsApp está siempre visible
- [ ] Todas las imágenes de Unsplash cargan correctamente
- [ ] Los textos están en español rioplatense (vos, reservá, elegí)
- [ ] El HTML es semántico y pasa validación básica
- [ ] El diseño no se rompe en ningún breakpoint (320px a 1920px)
- [ ] Los colores del dark mode son coherentes y legibles
