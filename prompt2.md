# Prompt: Página de visualización 3D (UMAP) — **tema oscuro + colores fuertes distinguibles**, fullscreen, interactiva

**(datos hardcodeados dentro del código, 17.418 puntos, filtros excluyentes, puntos circulares de color sólido)**

## 🎯 Objetivo

Construir **una página web** de **presentación fullscreen** que muestre una **nube de 17.418 puntos 3D** (UMAP) de publicaciones de **think tanks** chilenos.
El gráfico debe **rotar suavemente** en forma continua, permitir **explorar/rotar/zoomear**, y **diferenciar por color sólido** cada think tank.
Al **pasar el mouse sobre un punto** se muestra un **tooltip** y **todos los puntos del mismo think tank** se **resaltan con halo** (el resto desaparece según filtros).
**Total global:** **17.418** (visible en la UI).
**Importante:** **Los datos estarán hardcodeados dentro del código** (nube JSONL y metadatos). **No pidas cargar archivos** ni muestres mensajes de error: **solo construye la página**.
**Utiliza todas las propiedades de D3.js, tailwindcss y three.js que necesites.**

---

## 🖥️ Estética y presentación

* **Fullscreen**, con **marco interior** sutil para centrar la escena.
* **Fondo oscuro** (grafito / negro azulado `#0f141b–#111827`) con gradiente difuso y **decoración espacial sutil** (estrellas/partículas discretas).
* **Tipografía**: Inter/Manrope/Montserrat, texto principal `#E6EAF2`, secundarios `rgba(230,234,242,.8)`.
* **Paleta (CLAVE)**: **24 colores fuertes, saturados y claramente distinguibles, NO lineales** (no escalas secuenciales ni pasteles).

  * Asignación **estable por *nombre*** de think tank.
  * **Relleno 100% sólido** (opacidad 1.0). Transparencias solo en **halos/overlays**.

### Paleta sugerida (24 tonos fuertes)

`#1F77B4`, `#FF7F0E`, `#2CA02C`, `#D62728`, `#9467BD`, `#8C564B`, `#E377C2`, `#7F7F7F`, `#BCBD22`, `#17BECF`, `#005AB5`, `#DC3220`, `#00AF54`, `#FF6F00`, `#008573`, `#B71C1C`, `#6A1B9A`, `#C51162`, `#1B5E20`, `#0D47A1`, `#E53935`, `#4E342E`, `#43A047`, `#00838F`.
**Borde**: mismo color oscurecido (≈ darker 0.6). **Halo**: `rgba(color, .35–.45)`.

---

## 🧩 Estructura de la página

1. **Header fijo** (10–12%):

   * Centrado: “**BERTopic UMAP 3D por Think Tank (2019–2023)**”.
   * Derecha: **“N total: 17.418”** (cápsula translúcida).

2. **Zona central** (≈70–75%):

   * **Lienzo 3D** (Three.js/WebGL) con grid fino y ejes tenues, **rotación automática sutil** (pausa si hay interacción; reanuda a los 3 s) y **OrbitControls** con inercia y límites de zoom/pan.
   * **Mouse over sobre cada punto**: tooltip + resaltado grupal (halo + escala ×1.6–2.0); click fija/libera grupo (modo *lock*).


3. **Panel lateral derecho** (ancho fijo; scroll):

   * **Titulo**: "Think Tank" centrado.
   * **Lista de 24 think tanks**: Filas individuales de cada think tank a lo largo del panel lateral hacia abajo.
   * ** dentro de cada indicador de think tank horizontal de este corresponde: borde izq 10% el color que corresponda, centro 40% logo, 50% nombre del think tank.
   * **Interactividad**: hover resalta (halo + tooltip), click filtra (excluyente). scrolleable. 

   
5. **Footer horizontal (12–15%)**:

    * Derecha: Botones **Segmentadores**: **Tipo de think tank** y sus valores; y **Orientación política** y sus valores (ver definiciones completas abajo).
    * Izquierda: **Reset vista** (cámara), **Reset filtros**.
    * Texto central: **“Demo XII Conferencia Internacional COES”**.

---

## 🔢 Datos hardcodeados (formato obligatorio JSONL) deja el espacio en el codigo para integrar los datos de esa forma idéntica

### Nube (JSONL) — **dentro del código**

**Una línea por punto, formato exacto** (mantener claves y orden):

```
{"Unnamed: 0":0,"x3":13.788649,"y3":8.373928,"z3":3.3979487,"ThinkTank":"LyD"}
{"Unnamed: 0":1,"x3":10.815318,"y3":5.170961,"z3":4.1502275,"ThinkTank":"LyD"}
{"Unnamed: 0":2,"x3":7.5959024,"y3":4.895122,"z3":4.196786,"ThinkTank":"LyD"}
{"Unnamed: 0":3,"x3":8.584189,"y3":5.0734735,"z3":3.9953017,"ThinkTank":"LyD"}
{"Unnamed: 0":17408,"x3":4.781302,"y3":4.9295745,"z3":6.00753,"ThinkTank":"FPP"}
{"Unnamed: 0":17409,"x3":4.782124,"y3":4.9285274,"z3":6.0079207,"ThinkTank":"FPP"}
{"Unnamed: 0":17410,"x3":4.8934183,"y3":5.2850413,"z3":6.2114964,"ThinkTank":"FPP"}
{"Unnamed: 0":17411,"x3":4.8900223,"y3":5.266716,"z3":6.2411084,"ThinkTank":"FPP"}
{"Unnamed: 0":17412,"x3":4.2453837,"y3":6.3656354,"z3":5.363099,"ThinkTank":"FPP"}
{"Unnamed: 0":17413,"x3":4.235105,"y3":6.37114,"z3":5.3630548,"ThinkTank":"FPP"}
/* … el usuario completa hasta 17.418 líneas … */
```

* `Unnamed: 0`: id entero.
* `x3`, `y3`, `z3`: coordenadas (float).
* `ThinkTank`: **nombre textual exacto** (clave para color, logo, totales y filtros).

### Metadatos (hardcodeados también)

  "logos": {
    "CDC": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/cdc.png",
    "CED": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/ced.png",
    "CEP": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/cep.svg",
    "CLAPES UC": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/clapesuc.webp",
    "Casa Común": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/casacomun.jpg",
    "Chile 21": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/chile21.svg",
    "Espacio Público": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/espaciopublico.png",
    "FPP": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/fpp.png",
    "Fundación Jaime Guzmán": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/fundacionjaimeguzman.png",
    "Fundación Sol": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/fundacionsol.png",
    "Horizontal": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/horizontal.svg",
    "Horizonte Ciudadano": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/horizonteciudadano.svg",
    "ICAL": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/ical.png",
    "IES": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/ies.webp",
    "Idea País": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/ideapais.png",
    "Ideas Republicanas": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/ideasrepublicanas.png",
    "Instituto Igualdad": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/institutoigualdad.png",
    "Instituto Libertad": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/institutolibertad.png",
    "Instituto Res Pública": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/institutorespublica.png",
    "LyD": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/lyd1536x1299.png",
    "Nodo XXI": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/nodoxxi.webp",
    "OPES": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/opes.webp",
    "Pivotes": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/pivotes.png",
    "Signos Uandes": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/signosuandes.svg"
  }
---

## 📐 Escalado espacial (evitar compresión)

* Escalar **linealmente** cada eje con `min/max` reales a **X,Y,Z ∈ [-150, 150]**, con **márgenes 10–15%** (la nube no debe quedar “aplastada”).
* Tamaño de puntos **independiente de distancia**: base **12–14 px**, límites **8–26 px**.

---

## 🔵 Puntos circulares, sólidos y legibles

* Renderizar como **discos redondos** (billboards o shader) con **relleno sólido**.
* **Borde**: 1–2 px (mismo color oscurecido).
* **Halo**: solo en resaltado (`rgba(color,.35–.45)`).
* En **hover/filtro activo**: escala ×**1.6–2.0**, halo más intenso.
* Si hay filtros activos, **solo** se muestran los puntos que cumplen; **los demás desaparecen** (no atenuados).

---

## 🧭 Interacciones y comportamiento

* **Hover**: tooltip inmediato (logo 24–28 px, nombre, id `Unnamed: 0`, coords `x3,y3,z3` con 2 decimales, total del TT) y **resaltado grupal** del mismo `ThinkTank`.
* **Click**: fijar/liberar grupo (modo *lock*). `Esc` o click vacío limpia fijaciones (respeta filtros).
* **Cámara**: rotación automática sutil (pausa al orbitar/zoomear; reanuda a los 3 s). OrbitControls con inercia y límites.

---

## 🧰 Filtros y leyenda (efecto **excluyente**)

* **Regla clave**: al activar **uno o más** filtros (por ThinkTank/Tipo/Orientación), **solo** permanecen visibles los puntos que **cumplen**.
* **Leyenda** interactiva (hover resalta, click filtra).
* Footer: **Reset vista** (cámara) y **Reset filtros**.

---

## 🧱 Definición de segmentaciones (hardcode en el código)

### A) **Tipo de think tank**

* **De partido**: *Instituto Igualdad*, *Fundación Jaime Guzmán*, *CDC*, *Instituto Libertad*, *Horizontal*, *OPES*, *ICAL*, *Ideas Republicanas*.
* **Semi Difuntos**: *Casa Común*.
* **Transversal**: *LyD*, *FPP*, *CEP*, *Espacio Público*, *Instituto Res Pública*, *Fundación Sol*, *Pivotes*, *Nodo XXI*, *Chile 21*, *CED*, *Horizonte Ciudadano*, *IES*, *Idea País*.
* **Universidades**: *Signos Uandes*, *CLAPES UC*.

> Estas etiquetas deben ir en el objeto de metadatos: `tipo: "De partido" | "Semi Difuntos" | "Transversal" | "Universidades"`.

### B) **Orientación política**

* **Derecha**: *Signos Uandes*, *LyD*, *FPP*, *CEP*, *Fundación Jaime Guzmán*, *Instituto Res Pública*, *Pivotes*, *CLAPES UC*, *Instituto Libertad*, *Horizontal*, *IES*, *Ideas Republicanas*, *Idea País*.
* **Izquierda**: *Espacio Público*, *Instituto Igualdad*, *Fundación Sol*, *Nodo XXI*, *Chile 21*, *CED*, *Casa Común*, *CDC*, *Horizonte Ciudadano*, *OPES*, *ICAL*.

> Incluir en metadatos: `orientacion: "Derecha" | "Izquierda"`.

---

## 🚀 Implementación 3D y rendimiento

* **Three.js** con **InstancedMesh** o `THREE.Points` + shader de disco.
* Raycasting con tolerancia y **debounce** 8–12 ms.
* No recrear geometrías: actualizar **atributos/máscaras** en hover/filtros.
* Aplicar **clamping** de tamaño y, si fuese necesario, **LOD suave** para mantener FPS con 17.4k puntos.

---

## ♿ Accesibilidad

* Contraste AA en UI/tooltip.
* Panel lateral navegable con teclado; foco claro.
* Tooltip con `role="tooltip"`.

---

## ✅ Criterios de validación

* **Datos y metadatos hardcodeados** (JSONL + diccionario con `logoUrl`, `total`, `tipo`, `orientacion`).
* Puntos **circulares, sólidos y de color fuerte**; bordes oscuros y halos solo en resaltado.
* **Filtros excluyentes** funcionales (ThinkTank/Tipo/Orientación).
* **Tooltip** estable y sincronizado con hover.
* **Rotación sutil** de la nube, con pausa en interacción.
* **N total 17.418** visible y consistente.
* Escalado espacial amplio (rango `[-150,150]` por eje) con márgenes; la nube no se comprime.

---

## 🧱 Resumen del esquema de datos (hardcode)

* **Nube (JSONL en el código)** — una línea por punto, formato **estricto**:
  `{"Unnamed: 0":0,"x3":13.788649,"y3":8.373928,"z3":3.3979487,"ThinkTank":"LyD"}
{"Unnamed: 0":1,"x3":10.815318,"y3":5.170961,"z3":4.1502275,"ThinkTank":"LyD"}
{"Unnamed: 0":2,"x3":7.5959024,"y3":4.895122,"z3":4.196786,"ThinkTank":"LyD"}
{"Unnamed: 0":3,"x3":8.584189,"y3":5.0734735,"z3":3.9953017,"ThinkTank":"LyD"}
{"Unnamed: 0":4,"x3":12.627276,"y3":3.928907,"z3":3.8362484,"ThinkTank":"LyD"}
{"Unnamed: 0":5,"x3":7.113202,"y3":4.9472213,"z3":3.207822,"ThinkTank":"LyD"}
{"Unnamed: 0":6,"x3":5.1168675,"y3":6.161465,"z3":2.998015,"ThinkTank":"LyD"}
{"Unnamed: 0":7,"x3":6.861018,"y3":4.788496,"z3":4.566765,"ThinkTank":"LyD"}
{"Unnamed: 0":8,"x3":5.225471,"y3":6.2051663,"z3":4.673034,"ThinkTank":"LyD"}
{"Unnamed: 0":9,"x3":8.589773,"y3":5.0817523,"z3":4.001162,"ThinkTank":"LyD"}`

Dejame un placeholder para que yo me encargue de completar las 17.418 líneas.

* **Metadata embebida**:

  ```js
  const TT_META = {
    "LyD": { total: 2622, logoUrl: "<URL-logo>", tipo: "Transversal", orientacion: "Derecha" },
    "CEP": { total: 1998, logoUrl: "<URL-logo>", tipo: "Transversal", orientacion: "Derecha" },
    // … completar los 24 think tanks con {logoUrl, total, tipo, orientacion} …
  };
  ```

> **Todo queda dentro del código** (nube y metadatos). No solicitar archivos externos ni confirmaciones: construir la **página** siguiendo estas especificaciones.

Toma tu tiempo, y da tu mejor esfuerzo para realizar el mejor trabajo posible. ¡Gracias!