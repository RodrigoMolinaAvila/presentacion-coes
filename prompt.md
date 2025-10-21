Prompt para generar la visualización
Objetivo

Construir una visualización de presentación que opere como “diapositivas” (siguiente/anterior) donde:

En la parte inferior central siempre se muestra un histograma del total mensual de publicaciones de todos los think tanks (2019–2023).

Al presionar “Siguiente” (o flecha →), aparece el logo del think tank en la zona superior central, y en el centro aparece su histograma mensual.

En el histograma inferior (total), se ilumina en cada barra la contribución mensual del think tank activo (una subbarra/overlay proporcional al aporte de ese think tank dentro del total de ese mes).

Debe mostrarse N total (suma) cercano a cada histograma: del think tank activo y del total.

La visualización es responsive, sin scroll, con tema oscuro y paleta Pastel.

Entregable

todos los archivos necesarios para ejecutar la visualización en un navegador moderno (HTML, CSS, JS).

Cargar D3 v7 desde CDN y Tailwind desde CDN (modo JIT).

Hardcodear los datos provistos (ver sección “Datos”) En este punto puedes crear un archivo .json si te es mas efectivo procesar los datos de esa forma.

Sin dependencias externas salvo imágenes de logos (URLs provistas).

Layout / estilo (Tailwind)

Contenedor principal: min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 antialiased.

“Lienzo” de presentación: w-[min(1100px,95vw)] rounded-3xl bg-white/5 backdrop-blur border border-white/10 shadow-2xl p-4 md:p-6.

Regla φ (proporción áurea): disposición vertical aprox. 62% para zona central (logo + histograma TT) y 38% para el histograma inferior del total.

Grid: grid grid-rows-[62%_38%] gap-6 en desktop; en móvil: grid-rows-[60%_40%].

Tipografía: sans del sistema. Etiquetas y ejes en text-slate-300.

Paleta: usar d3.schemePastel1 para colores por think tank (asignación estable por índice). Base del total en slate-400/40; overlay (aporte TT) con color Pastel del TT (borde más saturado).

Botonera mínima:

button#prev, button#next: rounded-xl px-4 py-2 bg-gradient-to-r from-indigo-400 to-violet-500 text-white font-semibold shadow hover:translate-y-[-1px] transition.

Indicador de progreso: “TT i/n” en text-xs md:text-sm (arriba a la derecha).

Atajos: ← y → (anterior/siguiente); R para reiniciar animaciones de la diapositiva actual.

Estructura del DOM
<div id="app" class="...">
  <div id="deck" class="w-[min(1100px,95vw)] rounded-3xl ...">
    <div id="stage" class="grid grid-rows-[62%_38%] h-[min(620px,75vh)]">
      <!-- Fila 1: logo + histograma think tank -->
      <div id="pane-tt" class="relative flex flex-col items-center justify-start gap-3">
        <img id="tt-logo" alt="" class="h-16 md:h-20 object-contain drop-shadow-lg opacity-0"/>
        <div id="tt-chart" class="w-full h-full"></div>
        <div id="tt-total" class="absolute right-3 top-3 text-xs md:text-sm bg-white/10 border border-white/20 rounded-lg px-2 py-1">
          N total TT: <span id="tt-sum"></span>
        </div>
      </div>
      <!-- Fila 2: histograma total -->
      <div id="pane-total" class="relative">
        <div id="total-chart" class="w-full h-full"></div>
        <div id="total-sum" class="absolute right-3 top-3 text-xs md:text-sm bg-white/10 border border-white/20 rounded-lg px-2 py-1">
          N total global: <span id="global-sum"></span>
        </div>
      </div>
    </div>
  </div>
  <div class="flex items-center gap-3">
    <button id="prev" class="...">Anterior</button>
    <button id="next" class="...">Siguiente</button>
    <span id="progress" class="text-slate-300 text-xs md:text-sm"></span>
  </div>
</div>

Comportamiento / interacción

Inicial: se renderiza el histograma del total en el panel inferior. El panel superior queda vacío hasta que el usuario presiona Siguiente.

Siguiente:

Se establece el think tank activo (TTᵢ).

Logo (imagen remota) aparece con opacity 0→1 y leve translate-y (duración 300 ms).

En el panel central, se renderiza/actualiza el histograma mensual de TTᵢ con animación secuencial de barras (total 900 ms).

En el panel inferior, el histograma global permanece, pero se actualiza el overlay que representa el aporte mensual de TTᵢ (transición suave 600 ms en altura/color).

Se actualizan los N totales (TTᵢ y global).

Anterior: retrocede al TT anterior con las mismas animaciones.

Teclas: ← y → mapean a Anterior/Siguiente. Tecla R reinicia la animación de la diapositiva activa (replay).

Progreso: “TT i/n” (excluye la lámina 0 donde solo está el total).

Especificación D3 (detallada)

Escalas y ejes comunes

Dominio temporal X: 2019-01 → 2023-12. Usar d3.scaleTime().

Dominio Y (total): 0 → 1.08 × max(overall.n); nice().

Dominio Y (TT): 0 → 1.08 × max(tt.n); nice().

Ancho de barra: barW = 0.7 × step donde step = x(timeMonth.offset(m,1)) - x(m), mínimo 6 px.

Ejes con ticks anuales; etiquetas rotadas -60°, text-slate-300.

Histograma del total (panel inferior)

Capa base “bars-base”: rectángulos por mes, fill="rgba(148,163,184,0.35)" (slate-400/40).

Capa “bars-overlay”: para el think tank activo, rectángulos por mes con la misma X y ancho, height = y(0) - y(ttᵢ.n) (clipeados para no exceder la base). Color = schemePastel1[colorIndex] con stroke más saturado (usar d3.color(c).darker(0.6) para borde). Transición en y/height de 600 ms con easeCubic.

Etiqueta N total global arriba-derecha (formato d3.format(",")).

Histograma del TT (panel central)

Barras con entrada secuencial: retraso por barra delay = 900 / meses. Transición y: H → y(n) y height: 0 → H - y(n), easeCubicOut.

Color de barras = schemePastel1[colorIndex] con gradiente vertical suave (puede declararse defs con linearGradient).

Línea superior opcional (suave): d3.line().curve(d3.curveMonotoneX) con stroke = borde del color.

Etiqueta “N total TT: X” en la tarjeta superior derecha del panel.

Accesibilidad: <svg role="img" aria-label="Histograma mensual TT ...">.

Asignación de color por TT

Usar d3.schemePastel1 (9 colores). Asignación fija por índice (rotar si >9). Ej.:

0 CDC, 1 CED, 2 CEP, 3 CLAPES UC, 4 Casa Común, 5 Chile 21, 6 Espacio Público, 7 FPP, 8 FJG, 0 Fundación Sol, 1 Horizontal, … (continuar rotando).

Gestión de logos

Pre-cargar logos (new Image().src = url) antes de animar cada TT.

Aceptar .png/.webp/.jpg/.svg. Para SVG, se puede usar <img> sin problema.

alt = nombre del think tank; alto fijo h-16 md:h-20.

Arquitectura JS (funciones)

initScalesAndAxes(container, domainX, domainY) → {svg, g, x, y, height, width}

renderTotalBase(overallSeries) crea barras base una sola vez.

updateTotalOverlay(ttSeries, color) actualiza la capa overlay con transiciones.

renderTTChart(tt) crea/actualiza el histograma central con animación secuencial.

setLogo(tt) establece la imagen y animación de opacidad/desplazamiento.

nextSlide() / prevSlide() manejan índice, progreso y disparan render/updates.

sum(series) devuelve Σ n.

normalizeSeries(series, fullMonths) llena meses faltantes con n=0.

keybindings() añade listeners de teclado.

replay() reanima la lámina actual (barras del TT + overlay).

Rendimiento

Mantener el SVG del total persistente y solo actualizar la capa overlay.

Reusar escalas; recalcular solo Y del TT al cambiar de TT.

Accesibilidad

Roles ARIA en los SVG; descripciones; contraste suficiente.

Datos (hardcodeados en el JS)

Importante: normalizar todas las series al mismo conjunto de meses 2019-01 … 2023-12 (rellenar 0 donde no hay dato).
A continuación: 1) serie global overallSeries (ya normalizada) y 2) THINK_TANKS con logoUrl, total y series.

// --- Serie global (todos los think tanks) ---
const overallSeries = [
  { date: '2019-01', n: 179 }, { date: '2019-02', n: 80 }, { date: '2019-03', n: 266 },
  { date: '2019-04', n: 271 }, { date: '2019-05', n: 285 }, { date: '2019-06', n: 285 },
  { date: '2019-07', n: 222 }, { date: '2019-08', n: 263 }, { date: '2019-09', n: 246 },
  { date: '2019-10', n: 318 }, { date: '2019-11', n: 281 }, { date: '2019-12', n: 332 },
  { date: '2020-01', n: 328 }, { date: '2020-02', n: 122 }, { date: '2020-03', n: 312 },
  { date: '2020-04', n: 387 }, { date: '2020-05', n: 375 }, { date: '2020-06', n: 336 },
  { date: '2020-07', n: 374 }, { date: '2020-08', n: 378 }, { date: '2020-09', n: 356 },
  { date: '2020-10', n: 369 }, { date: '2020-11', n: 355 }, { date: '2020-12', n: 290 },
  { date: '2021-01', n: 290 }, { date: '2021-02', n: 148 }, { date: '2021-03', n: 293 },
  { date: '2021-04', n: 292 }, { date: '2021-05', n: 243 }, { date: '2021-06', n: 264 },
  { date: '2021-07', n: 282 }, { date: '2021-08', n: 297 }, { date: '2021-09', n: 247 },
  { date: '2021-10', n: 285 }, { date: '2021-11', n: 291 }, { date: '2021-12', n: 245 },
  { date: '2022-01', n: 256 }, { date: '2022-02', n: 122 }, { date: '2022-03', n: 238 },
  { date: '2022-04', n: 278 }, { date: '2022-05', n: 298 }, { date: '2022-06', n: 271 },
  { date: '2022-07', n: 296 }, { date: '2022-08', n: 355 }, { date: '2022-09', n: 266 },
  { date: '2022-10', n: 313 }, { date: '2022-11', n: 273 }, { date: '2022-12', n: 264 },
  { date: '2023-01', n: 243 }, { date: '2023-02', n: 121 }, { date: '2023-03', n: 429 },
  { date: '2023-04', n: 322 }, { date: '2023-05', n: 388 }, { date: '2023-06', n: 350 },
  { date: '2023-07', n: 352 }, { date: '2023-08', n: 378 }, { date: '2023-09', n: 304 },
  { date: '2023-10', n: 331 }, { date: '2023-11', n: 358 }, { date: '2023-12', n: 439 }
];

// --- URLs de logos (raw GitHub) ---
const baseLogo = "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/";
const logos = {
  "CDC": baseLogo + "cdc.png",
  "CED": baseLogo + "ced.png",
  "CEP": baseLogo + "cep.svg",
  "CLAPES UC": baseLogo + "clapesuc.webp",
  "Casa Común": baseLogo + "casacomun.jpg",
  "Chile 21": baseLogo + "chile21.svg",
  "Espacio Público": baseLogo + "espaciopublico.png",
  "FPP": baseLogo + "fpp.png",
  "Fundación Jaime Guzmán": baseLogo + "fundacionjaimeguzman.png",
  "Fundación Sol": baseLogo + "fundacionsol.png",
  "Horizontal": baseLogo + "horizontal.svg",
  "Horizonte Ciudadano": baseLogo + "horizonteciudadano.svg",
  "ICAL": baseLogo + "ical.png",
  "IES": baseLogo + "ies.webp",
  "Idea País": baseLogo + "ideapais.png",
  "Ideas Republicanas": baseLogo + "ideasrepublicanas.png",
  "Instituto Igualdad": baseLogo + "institutoigualdad.png",
  "Instituto Libertad": baseLogo + "institutolibertad.png",
  "Instituto Res Pública": baseLogo + "institutorepublica.png",
  "LyD": baseLogo + "lyd1536x1299.png",
  "Nodo XXI": baseLogo + "nodoxxi.webp",
  "OPES": baseLogo + "opes.webp",
  "Pivotes": baseLogo + "pivotes.png",
  "Signos Uandes": baseLogo + "signosuandes.svg"
};

// --- Series por Think Tank ---
// Nota: incluir solo meses provistos; el código debe normalizar a 2019-01..2023-12 con ceros.
const THINK_TANKS = [
  {
    id: "CDC", name: "CDC", total: 171, logoUrl: logos["CDC"],
    series: [
      {date:"2019-01",n:1},{date:"2019-02",n:0},{date:"2019-03",n:1},{date:"2019-04",n:3},{date:"2019-05",n:1},{date:"2019-06",n:0},
      {date:"2019-07",n:1},{date:"2019-08",n:0},{date:"2019-09",n:0},{date:"2019-10",n:1},{date:"2019-11",n:0},{date:"2019-12",n:1},
      {date:"2020-01",n:1},{date:"2020-02",n:0},{date:"2020-03",n:0},{date:"2020-04",n:0},{date:"2020-05",n:0},{date:"2020-06",n:0},
      {date:"2020-07",n:0},{date:"2020-08",n:0},{date:"2020-09",n:0},{date:"2020-10",n:0},{date:"2020-11",n:0},{date:"2020-12",n:1},
      {date:"2021-01",n:2},{date:"2021-02",n:0},{date:"2021-03",n:1},{date:"2021-04",n:0},{date:"2021-05",n:1},{date:"2021-06",n:0},
      {date:"2021-07",n:7},{date:"2021-08",n:15},{date:"2021-09",n:1},{date:"2021-10",n:7},{date:"2021-11",n:9},{date:"2021-12",n:18},
      {date:"2022-01",n:8},{date:"2022-02",n:5},{date:"2022-03",n:9},{date:"2022-04",n:9},{date:"2022-05",n:5},{date:"2022-06",n:2},
      {date:"2022-07",n:7},{date:"2022-08",n:4},{date:"2022-09",n:10},{date:"2022-10",n:10},{date:"2022-11",n:4},{date:"2022-12",n:8},
      {date:"2023-01",n:6},{date:"2023-02",n:0},{date:"2023-03",n:2},{date:"2023-04",n:4},{date:"2023-05",n:1},{date:"2023-06",n:4},
      {date:"2023-07",n:1}
    ]
  },
  {
    id: "CED", name: "CED", total: 265, logoUrl: logos["CED"],
    series: [
      {date:"2019-01",n:1},{date:"2019-02",n:1},{date:"2019-03",n:1},{date:"2019-04",n:2},{date:"2019-05",n:1},{date:"2019-06",n:1},
      {date:"2019-07",n:2},{date:"2019-08",n:0},{date:"2019-09",n:3},{date:"2019-10",n:0},{date:"2019-11",n:0},{date:"2019-12",n:3},
      {date:"2020-01",n:2},{date:"2020-02",n:0},{date:"2020-03",n:2},{date:"2020-04",n:0},{date:"2020-05",n:0},{date:"2020-06",n:1},
      {date:"2020-07",n:2},{date:"2020-08",n:2},{date:"2020-09",n:2},{date:"2020-10",n:2},{date:"2020-11",n:2},{date:"2020-12",n:2},
      {date:"2021-01",n:1},{date:"2021-02",n:0},{date:"2021-03",n:1},{date:"2021-04",n:0},{date:"2021-05",n:1},{date:"2021-06",n:1},
      {date:"2021-07",n:2},{date:"2021-08",n:3},{date:"2021-09",n:5},{date:"2021-10",n:4},{date:"2021-11",n:3},{date:"2021-12",n:2},
      {date:"2022-01",n:5},{date:"2022-02",n:10},{date:"2022-03",n:9},{date:"2022-04",n:6},{date:"2022-05",n:11},{date:"2022-06",n:7},
      {date:"2022-07",n:12},{date:"2022-08",n:9},{date:"2022-09",n:5},{date:"2022-10",n:6},{date:"2022-11",n:7},{date:"2022-12",n:5},
      {date:"2023-01",n:6},{date:"2023-02",n:0},{date:"2023-03",n:18},{date:"2023-04",n:14},{date:"2023-05",n:18},{date:"2023-06",n:15},
      {date:"2023-07",n:13},{date:"2023-08",n:9},{date:"2023-09",n:9},{date:"2023-10",n:7},{date:"2023-11",n:5},{date:"2023-12",n:4}
    ]
  },
  {
    id: "CEP", name: "CEP", total: 1998, logoUrl: logos["CEP"],
    series: [
      {date:"2019-01",n:8},{date:"2019-02",n:0},{date:"2019-03",n:2},{date:"2019-04",n:2},{date:"2019-05",n:2},{date:"2019-06",n:4},
      {date:"2019-07",n:5},{date:"2019-08",n:9},{date:"2019-09",n:3},{date:"2019-10",n:31},{date:"2019-11",n:68},{date:"2019-12",n:29},
      {date:"2020-01",n:41},{date:"2020-02",n:6},{date:"2020-03",n:23},{date:"2020-04",n:31},{date:"2020-05",n:38},{date:"2020-06",n:28},
      {date:"2020-07",n:35},{date:"2020-08",n:37},{date:"2020-09",n:43},{date:"2020-10",n:40},{date:"2020-11",n:58},{date:"2020-12",n:39},
      {date:"2021-01",n:41},{date:"2021-02",n:17},{date:"2021-03",n:33},{date:"2021-04",n:39},{date:"2021-05",n:34},{date:"2021-06",n:33},
      {date:"2021-07",n:34},{date:"2021-08",n:35},{date:"2021-09",n:35},{date:"2021-10",n:30},{date:"2021-11",n:41},{date:"2021-12",n:29},
      {date:"2022-01",n:46},{date:"2022-02",n:21},{date:"2022-03",n:47},{date:"2022-04",n:49},{date:"2022-05",n:50},{date:"2022-06",n:51},
      {date:"2022-07",n:38},{date:"2022-08",n:97},{date:"2022-09",n:45},{date:"2022-10",n:52},{date:"2022-11",n:51},{date:"2022-12",n:45},
      {date:"2023-01",n:42},{date:"2023-02",n:22},{date:"2023-03",n:52},{date:"2023-04",n:33},{date:"2023-05",n:38},{date:"2023-06",n:43},
      {date:"2023-07",n:41},{date:"2023-08",n:38},{date:"2023-09",n:25},{date:"2023-10",n:26},{date:"2023-11",n:34},{date:"2023-12",n:29}
    ]
  },
  {
    id: "CLAPES", name: "CLAPES UC", total: 205, logoUrl: logos["CLAPES UC"],
    series: [
      {date:"2019-01",n:1},{date:"2019-02",n:0},{date:"2019-03",n:1},{date:"2019-04",n:2},{date:"2019-05",n:0},{date:"2019-06",n:0},
      {date:"2019-07",n:1},{date:"2019-08",n:3},{date:"2019-09",n:2},{date:"2019-10",n:1},{date:"2019-11",n:1},{date:"2019-12",n:0},
      {date:"2020-01",n:2},{date:"2020-02",n:0},{date:"2020-03",n:0},{date:"2020-04",n:0},{date:"2020-05",n:1},{date:"2020-06",n:4},
      {date:"2020-07",n:3},{date:"2020-08",n:2},{date:"2020-09",n:1},{date:"2020-10",n:2},{date:"2020-11",n:2},{date:"2020-12",n:0},
      {date:"2021-01",n:1},{date:"2021-02",n:0},{date:"2021-03",n:3},{date:"2021-04",n:1},{date:"2021-05",n:4},{date:"2021-06",n:2},
      {date:"2021-07",n:4},{date:"2021-08",n:3},{date:"2021-09",n:2},{date:"2021-10",n:3},{date:"2021-11",n:3},{date:"2021-12",n:1},
      {date:"2022-01",n:2},{date:"2022-02",n:0},{date:"2022-03",n:2},{date:"2022-04",n:4},{date:"2022-05",n:2},{date:"2022-06",n:2},
      {date:"2022-07",n:0},{date:"2022-08",n:8},{date:"2022-09",n:2},{date:"2022-10",n:5},{date:"2022-11",n:2},{date:"2022-12",n:2},
      {date:"2023-01",n:2},{date:"2023-02",n:0},{date:"2023-03",n:3},{date:"2023-04",n:2},{date:"2023-05",n:3},{date:"2023-06",n:3},
      {date:"2023-07",n:4},{date:"2023-08",n:3},{date:"2023-09",n:3},{date:"2023-10",n:1},{date:"2023-11",n:5},{date:"2023-12",n:89}
    ]
  },
  {
    id: "CasaComun", name: "Casa Común", total: 227, logoUrl: logos["Casa Común"],
    series: [
      {date:"2019-01",n:2},{date:"2019-02",n:0},{date:"2019-03",n:5},{date:"2019-04",n:2},{date:"2019-05",n:3},{date:"2019-06",n:3},
      {date:"2019-07",n:4},{date:"2019-08",n:1},{date:"2019-09",n:5},{date:"2019-10",n:0},{date:"2019-11",n:1},{date:"2019-12",n:1},
      {date:"2020-01",n:3},{date:"2020-02",n:4},{date:"2020-03",n:2},{date:"2020-04",n:3},{date:"2020-05",n:7},{date:"2020-06",n:5},
      {date:"2020-07",n:5},{date:"2020-08",n:8},{date:"2020-09",n:10},{date:"2020-10",n:7},{date:"2020-11",n:6},{date:"2020-12",n:5},
      {date:"2021-01",n:3},{date:"2021-02",n:4},{date:"2021-03",n:6},{date:"2021-04",n:5},{date:"2021-05",n:7},{date:"2021-06",n:9},
      {date:"2021-07",n:8},{date:"2021-08",n:6},{date:"2021-09",n:8},{date:"2021-10",n:9},{date:"2021-11",n:5},{date:"2021-12",n:4},
      {date:"2022-01",n:7},{date:"2022-02",n:6},{date:"2022-03",n:5},{date:"2022-04",n:8},{date:"2022-05",n:6},{date:"2022-06",n:6},
      {date:"2022-07",n:2},{date:"2022-08",n:2},{date:"2022-09",n:1},{date:"2022-10",n:4},{date:"2022-11",n:0},{date:"2022-12",n:3},
      {date:"2023-01",n:0},{date:"2023-02",n:1},{date:"2023-03",n:3},{date:"2023-04",n:4},{date:"2023-05",n:2},{date:"2023-06",n:0},
      {date:"2023-07",n:0},{date:"2023-08",n:0},{date:"2023-09",n:1}
    ]
  },
  {
    id: "Chile21", name: "Chile 21", total: 288, logoUrl: logos["Chile 21"],
    series: [
      {date:"2019-01",n:3},{date:"2019-02",n:0},{date:"2019-03",n:14},{date:"2019-04",n:15},{date:"2019-05",n:13},{date:"2019-06",n:10},
      {date:"2019-07",n:4},{date:"2019-08",n:5},{date:"2019-09",n:5},{date:"2019-10",n:9},{date:"2019-11",n:6},{date:"2019-12",n:3},
      {date:"2020-01",n:1},{date:"2020-02",n:4},{date:"2020-03",n:3},{date:"2020-04",n:10},{date:"2020-05",n:14},{date:"2020-06",n:13},
      {date:"2020-07",n:7},{date:"2020-08",n:8},{date:"2020-09",n:17},{date:"2020-10",n:6},{date:"2020-11",n:4},{date:"2020-12",n:3},
      {date:"2021-01",n:5},{date:"2021-02",n:1},{date:"2021-03",n:2},{date:"2021-04",n:2},{date:"2021-05",n:4},{date:"2021-06",n:2},
      {date:"2021-07",n:5},{date:"2021-08",n:5},{date:"2021-09",n:5},{date:"2021-10",n:7},{date:"2021-11",n:6},{date:"2021-12",n:6},
      {date:"2022-01",n:5},{date:"2022-02",n:3},{date:"2022-03",n:5},{date:"2022-04",n:5},{date:"2022-05",n:4},{date:"2022-06",n:7},
      {date:"2022-07",n:2},{date:"2022-08",n:0},{date:"2022-09",n:0},{date:"2022-10",n:0},{date:"2022-11",n:0},{date:"2022-12",n:0},
      {date:"2023-01",n:1},{date:"2023-02",n:1},{date:"2023-03",n:1},{date:"2023-04",n:1},{date:"2023-05",n:7},{date:"2023-06",n:2},
      {date:"2023-07",n:0},{date:"2023-08",n:1},{date:"2023-09",n:2},{date:"2023-10",n:1},{date:"2023-11",n:5},{date:"2023-12",n:8}
    ]
  },
  {
    id: "EspPublico", name: "Espacio Público", total: 1525, logoUrl: logos["Espacio Público"],
    series: [
      {date:"2019-01",n:8},{date:"2019-02",n:0},{date:"2019-03",n:7},{date:"2019-04",n:6},{date:"2019-05",n:6},{date:"2019-06",n:15},
      {date:"2019-07",n:11},{date:"2019-08",n:23},{date:"2019-09",n:35},{date:"2019-10",n:38},{date:"2019-11",n:25},{date:"2019-12",n:58},
      {date:"2020-01",n:56},{date:"2020-02",n:13},{date:"2020-03",n:41},{date:"2020-04",n:45},{date:"2020-05",n:38},{date:"2020-06",n:45},
      {date:"2020-07",n:41},{date:"2020-08",n:67},{date:"2020-09",n:46},{date:"2020-10",n:39},{date:"2020-11",n:52},{date:"2020-12",n:29},
      {date:"2021-01",n:33},{date:"2021-02",n:33},{date:"2021-03",n:32},{date:"2021-04",n:38},{date:"2021-05",n:22},{date:"2021-06",n:19},
      {date:"2021-07",n:34},{date:"2021-08",n:26},{date:"2021-09",n:15},{date:"2021-10",n:25},{date:"2021-11",n:18},{date:"2021-12",n:19},
      {date:"2022-01",n:16},{date:"2022-02",n:12},{date:"2022-03",n:13},{date:"2022-04",n:15},{date:"2022-05",n:22},{date:"2022-06",n:17},
      {date:"2022-07",n:19},{date:"2022-08",n:19},{date:"2022-09",n:18},{date:"2022-10",n:22},{date:"2022-11",n:22},{date:"2022-12",n:14},
      {date:"2023-01",n:18},{date:"2023-02",n:11},{date:"2023-03",n:17},{date:"2023-04",n:27},{date:"2023-05",n:28},{date:"2023-06",n:22},
      {date:"2023-07",n:36},{date:"2023-08",n:34},{date:"2023-09",n:16},{date:"2023-10",n:11},{date:"2023-11",n:14},{date:"2023-12",n:24}
    ]
  },
  {
    id: "FPP", name: "FPP", total: 2585, logoUrl: logos["FPP"],
    series: [
      {date:"2019-01",n:20},{date:"2019-02",n:18},{date:"2019-03",n:69},{date:"2019-04",n:62},{date:"2019-05",n:71},{date:"2019-06",n:83},
      {date:"2019-07",n:37},{date:"2019-08",n:36},{date:"2019-09",n:19},{date:"2019-10",n:18},{date:"2019-11",n:4},{date:"2019-12",n:34},
      {date:"2020-01",n:46},{date:"2020-02",n:37},{date:"2020-03",n:47},{date:"2020-04",n:77},{date:"2020-05",n:84},{date:"2020-06",n:33},
      {date:"2020-07",n:47},{date:"2020-08",n:47},{date:"2020-09",n:41},{date:"2020-10",n:71},{date:"2020-11",n:40},{date:"2020-12",n:54},
      {date:"2021-01",n:50},{date:"2021-02",n:26},{date:"2021-03",n:43},{date:"2021-04",n:30},{date:"2021-05",n:32},{date:"2021-06",n:41},
      {date:"2021-07",n:41},{date:"2021-08",n:38},{date:"2021-09",n:32},{date:"2021-10",n:32},{date:"2021-11",n:37},{date:"2021-12",n:15},
      {date:"2022-01",n:23},{date:"2022-02",n:10},{date:"2022-03",n:16},{date:"2022-04",n:25},{date:"2022-05",n:34},{date:"2022-06",n:25},
      {date:"2022-07",n:46},{date:"2022-08",n:44},{date:"2022-09",n:67},{date:"2022-10",n:53},{date:"2022-11",n:48},{date:"2022-12",n:34},
      {date:"2023-01",n:28},{date:"2023-02",n:25},{date:"2023-03",n:56},{date:"2023-04",n:68},{date:"2023-05",n:88},{date:"2023-06",n:75},
      {date:"2023-07",n:19},{date:"2023-08",n:68},{date:"2023-09",n:53},{date:"2023-10",n:60},{date:"2023-11",n:46},{date:"2023-12",n:62}
    ]
  },
  {
    id: "FJG", name: "Fundación Jaime Guzmán", total: 678, logoUrl: logos["Fundación Jaime Guzmán"],
    series: [
      {date:"2019-01",n:19},{date:"2019-02",n:10},{date:"2019-03",n:13},{date:"2019-04",n:18},{date:"2019-05",n:19},{date:"2019-06",n:14},
      {date:"2019-07",n:8},{date:"2019-08",n:8},{date:"2019-09",n:5},{date:"2019-10",n:12},{date:"2019-11",n:7},{date:"2019-12",n:12},
      {date:"2020-01",n:13},{date:"2020-02",n:12},{date:"2020-03",n:11},{date:"2020-04",n:17},{date:"2020-05",n:12},{date:"2020-06",n:12},
      {date:"2020-07",n:18},{date:"2020-08",n:10},{date:"2020-09",n:8},{date:"2020-10",n:16},{date:"2020-11",n:10},{date:"2020-12",n:9},
      {date:"2021-01",n:6},{date:"2021-02",n:4},{date:"2021-03",n:7},{date:"2021-04",n:12},{date:"2021-05",n:8},{date:"2021-06",n:8},
      {date:"2021-07",n:13},{date:"2021-08",n:9},{date:"2021-09",n:8},{date:"2021-10",n:8},{date:"2021-11",n:5},{date:"2021-12",n:6},
      {date:"2022-01",n:12},{date:"2022-02",n:7},{date:"2022-03",n:16},{date:"2022-04",n:19},{date:"2022-05",n:14},{date:"2022-06",n:14},
      {date:"2022-07",n:17},{date:"2022-08",n:17},{date:"2022-09",n:9},{date:"2022-10",n:13},{date:"2022-11",n:7},{date:"2022-12",n:6},
      {date:"2023-01",n:13},{date:"2023-02",n:3},{date:"2023-03",n:14},{date:"2023-04",n:9},{date:"2023-05",n:12},{date:"2023-06",n:12},
      {date:"2023-07",n:12},{date:"2023-08",n:11},{date:"2023-09",n:9},{date:"2023-10",n:16},{date:"2023-11",n:13},{date:"2023-12",n:16}
    ]
  },
  {
    id: "FSol", name: "Fundación Sol", total: 550, logoUrl: logos["Fundación Sol"],
    series: [
      {date:"2019-01",n:3},{date:"2019-02",n:1},{date:"2019-03",n:25},{date:"2019-04",n:9},{date:"2019-05",n:13},{date:"2019-06",n:3},
      {date:"2019-07",n:3},{date:"2019-08",n:14},{date:"2019-09",n:2},{date:"2019-10",n:11},{date:"2019-11",n:7},{date:"2019-12",n:12},
      {date:"2020-01",n:12},{date:"2020-02",n:9},{date:"2020-03",n:21},{date:"2020-04",n:8},{date:"2020-05",n:10},{date:"2020-06",n:8},
      {date:"2020-07",n:32},{date:"2020-08",n:10},{date:"2020-09",n:14},{date:"2020-10",n:4},{date:"2020-11",n:23},{date:"2020-12",n:7},
      {date:"2021-01",n:12},{date:"2021-02",n:1},{date:"2021-03",n:4},{date:"2021-04",n:3},{date:"2021-05",n:7},{date:"2021-06",n:12},
      {date:"2021-07",n:6},{date:"2021-08",n:10},{date:"2021-09",n:7},{date:"2021-10",n:3},{date:"2021-11",n:4},{date:"2021-12",n:2},
      {date:"2022-01",n:3},{date:"2022-02",n:0},{date:"2022-03",n:6},{date:"2022-04",n:9},{date:"2022-05",n:8},{date:"2022-06",n:0},
      {date:"2022-07",n:3},{date:"2022-08",n:6},{date:"2022-09",n:3},{date:"2022-10",n:10},{date:"2022-11",n:13},{date:"2022-12",n:6},
      {date:"2023-01",n:13},{date:"2023-02",n:7},{date:"2023-03",n:11},{date:"2023-04",n:10},{date:"2023-05",n:37},{date:"2023-06",n:10},
      {date:"2023-07",n:5},{date:"2023-08",n:12},{date:"2023-09",n:20},{date:"2023-10",n:7},{date:"2023-11",n:11},{date:"2023-12",n:8}
    ]
  },
  {
    id: "Horizontal", name: "Horizontal", total: 116, logoUrl: logos["Horizontal"],
    series: [
      {date:"2019-05",n:1},{date:"2019-06",n:0},{date:"2019-07",n:0},{date:"2019-08",n:2},{date:"2019-09",n:2},{date:"2019-10",n:1},
      {date:"2019-11",n:4},{date:"2019-12",n:6},{date:"2020-01",n:0},{date:"2020-02",n:2},{date:"2020-03",n:2},{date:"2020-04",n:3},
      {date:"2020-05",n:2},{date:"2020-06",n:5},{date:"2020-07",n:0},{date:"2020-08",n:3},{date:"2020-09",n:3},{date:"2020-10",n:4},
      {date:"2020-11",n:1},{date:"2020-12",n:2},{date:"2021-01",n:0},{date:"2021-02",n:0},{date:"2021-03",n:6},{date:"2021-04",n:4},
      {date:"2021-05",n:0},{date:"2021-06",n:3},{date:"2021-07",n:4},{date:"2021-08",n:1},{date:"2021-09",n:1},{date:"2021-10",n:5},
      {date:"2021-11",n:1},{date:"2021-12",n:0},{date:"2022-01",n:1},{date:"2022-02",n:0},{date:"2022-03",n:1},{date:"2022-04",n:1},
      {date:"2022-05",n:1},{date:"2022-06",n:4},{date:"2022-07",n:1},{date:"2022-08",n:3},{date:"2022-09",n:0},{date:"2022-10",n:2},
      {date:"2022-11",n:1},{date:"2022-12",n:3},{date:"2023-01",n:2},{date:"2023-02",n:1},{date:"2023-03",n:2},{date:"2023-04",n:4},
      {date:"2023-05",n:3},{date:"2023-06",n:1},{date:"2023-07",n:4},{date:"2023-08",n:3},{date:"2023-09",n:3},{date:"2023-10",n:0},
      {date:"2023-11",n:4},{date:"2023-12",n:3}
    ]
  },
  {
    id: "Horizonte", name: "Horizonte Ciudadano", total: 130, logoUrl: logos["Horizonte Ciudadano"],
    series: [
      {date:"2019-01",n:1},{date:"2019-02",n:0},{date:"2019-03",n:2},{date:"2019-04",n:0},{date:"2019-05",n:1},{date:"2019-06",n:0},
      {date:"2019-07",n:0},{date:"2019-08",n:2},{date:"2019-09",n:0},{date:"2019-10",n:3},{date:"2019-11",n:2},{date:"2019-12",n:4},
      {date:"2020-01",n:1},{date:"2020-02",n:1},{date:"2020-03",n:6},{date:"2020-04",n:5},{date:"2020-05",n:11},{date:"2020-06",n:8},
      {date:"2020-07",n:6},{date:"2020-08",n:6},{date:"2020-09",n:4},{date:"2020-10",n:6},{date:"2020-11",n:2},{date:"2020-12",n:2},
      {date:"2021-01",n:2},{date:"2021-02",n:3},{date:"2021-03",n:6},{date:"2021-04",n:5},{date:"2021-05",n:1},{date:"2021-06",n:1},
      {date:"2021-07",n:3},{date:"2021-08",n:4},{date:"2021-09",n:2},{date:"2021-10",n:2},{date:"2021-11",n:4},{date:"2021-12",n:6},
      {date:"2022-01",n:7},{date:"2022-02",n:0},{date:"2022-03",n:1},{date:"2022-04",n:0},{date:"2022-05",n:2},{date:"2022-06",n:0},
      {date:"2022-07",n:0},{date:"2022-08",n:2},{date:"2022-09",n:0},{date:"2022-10",n:1},{date:"2022-11",n:0},{date:"2022-12",n:1},
      {date:"2023-01",n:0},{date:"2023-02",n:0},{date:"2023-03",n:0},{date:"2023-04",n:0},{date:"2023-05",n:0},{date:"2023-06",n:0},
      {date:"2023-07",n:0},{date:"2023-08",n:2},{date:"2023-09",n:0},{date:"2023-10",n:0},{date:"2023-11",n:1},{date:"2023-12",n:1}
    ]
  },
  {
    id: "ICAL", name: "ICAL", total: 38, logoUrl: logos["ICAL"],
    series: [
      {date:"2023-02",n:1},{date:"2023-03",n:1},{date:"2023-04",n:8},{date:"2023-05",n:0},{date:"2023-06",n:3},{date:"2023-07",n:3},
      {date:"2023-08",n:7},{date:"2023-09",n:9},{date:"2023-10",n:5},{date:"2023-11",n:0},{date:"2023-12",n:1}
    ]
  },
  {
    id: "IES", name: "IES", total: 20, logoUrl: logos["IES"],
    series: [
      {date:"2019-03",n:1},{date:"2019-10",n:1},{date:"2019-12",n:1},{date:"2020-09",n:2},{date:"2020-11",n:1},
      {date:"2021-10",n:1},{date:"2022-02",n:1},{date:"2022-04",n:2},{date:"2022-10",n:1},{date:"2023-04",n:2},
      {date:"2023-06",n:1},{date:"2023-08",n:1},{date:"2023-09",n:3},{date:"2023-10",n:2}
    ]
  },
  {
    id: "IdeaPais", name: "Idea País", total: 3, logoUrl: logos["Idea País"],
    series: [
      {date:"2020-08",n:1},{date:"2021-08",n:1},{date:"2023-02",n:1}
    ]
  },
  {
    id: "IdeasRep", name: "Ideas Republicanas", total: 9, logoUrl: logos["Ideas Republicanas"],
    series: [
      {date:"2023-01",n:1},{date:"2023-02",n:1},{date:"2023-03",n:1},{date:"2023-05",n:1},{date:"2023-06",n:1},
      {date:"2023-08",n:1},{date:"2023-09",n:1},{date:"2023-10",n:1},{date:"2023-11",n:1}
    ]
  },
  {
    id: "Igualdad", name: "Instituto Igualdad", total: 892, logoUrl: logos["Instituto Igualdad"],
    series: [
      {date:"2019-01",n:8},{date:"2019-03",n:7},{date:"2019-04",n:4},{date:"2019-05",n:5},{date:"2019-06",n:13},{date:"2019-07",n:9},
      {date:"2019-08",n:18},{date:"2019-09",n:29},{date:"2019-10",n:37},{date:"2019-11",n:24},{date:"2019-12",n:36},
      {date:"2020-01",n:29},{date:"2020-03",n:19},{date:"2020-04",n:27},{date:"2020-05",n:21},{date:"2020-06",n:35},{date:"2020-07",n:40},
      {date:"2020-08",n:57},{date:"2020-09",n:42},{date:"2020-10",n:36},{date:"2020-11",n:42},{date:"2020-12",n:26},
      {date:"2021-01",n:21},{date:"2021-02",n:21},{date:"2021-03",n:23},{date:"2021-04",n:29},{date:"2021-05",n:14},{date:"2021-06",n:8},
      {date:"2021-07",n:10},{date:"2021-08",n:6},{date:"2021-09",n:3},{date:"2021-10",n:9},{date:"2021-11",n:8},{date:"2021-12",n:4},
      {date:"2022-01",n:9},{date:"2022-02",n:4},{date:"2022-03",n:6},{date:"2022-04",n:6},{date:"2022-05",n:10},{date:"2022-06",n:12},
      {date:"2022-07",n:9},{date:"2022-08",n:12},{date:"2022-09",n:7},{date:"2022-10",n:10},{date:"2022-11",n:13},{date:"2022-12",n:2},
      {date:"2023-01",n:4},{date:"2023-02",n:1},{date:"2023-03",n:5},{date:"2023-04",n:7},{date:"2023-05",n:7},{date:"2023-06",n:8},
      {date:"2023-07",n:9},{date:"2023-08",n:12},{date:"2023-09",n:6},{date:"2023-10",n:3},{date:"2023-11",n:4},{date:"2023-12",n:6}
    ]
  },
  {
    id: "Libertad", name: "Instituto Libertad", total: 124, logoUrl: logos["Instituto Libertad"],
    series: [
      {date:"2022-02",n:3},{date:"2022-03",n:1},{date:"2022-04",n:5},{date:"2022-05",n:8},{date:"2022-06",n:7},{date:"2022-07",n:6},
      {date:"2022-08",n:5},{date:"2022-09",n:2},{date:"2022-10",n:2},{date:"2022-11",n:2},{date:"2022-12",n:16},
      {date:"2023-01",n:9},{date:"2023-02",n:5},{date:"2023-03",n:7},{date:"2023-04",n:2},{date:"2023-05",n:5},{date:"2023-06",n:7},
      {date:"2023-07",n:5},{date:"2023-08",n:5},{date:"2023-09",n:6},{date:"2023-10",n:5},{date:"2023-11",n:6},{date:"2023-12",n:5}
    ]
  },
  {
    id: "ResPublica", name: "Instituto Res Pública", total: 575, logoUrl: logos["Instituto Res Pública"],
    series: [
      {date:"2019-04",n:5},{date:"2019-08",n:3},{date:"2019-10",n:4},{date:"2019-11",n:1},{date:"2019-12",n:2},
      {date:"2020-01",n:7},{date:"2020-02",n:1},{date:"2020-03",n:5},{date:"2020-05",n:2},{date:"2020-06",n:6},{date:"2020-07",n:2},
      {date:"2020-08",n:8},{date:"2020-09",n:9},{date:"2020-10",n:5},{date:"2020-11",n:7},{date:"2020-12",n:5},
      {date:"2021-01",n:13},{date:"2021-02",n:14},{date:"2021-03",n:11},{date:"2021-04",n:10},{date:"2021-05",n:8},{date:"2021-06",n:12},
      {date:"2021-07",n:18},{date:"2021-08",n:20},{date:"2021-09",n:16},{date:"2021-10",n:24},{date:"2021-11",n:14},{date:"2021-12",n:18},
      {date:"2022-01",n:9},{date:"2022-02",n:13},{date:"2022-03",n:9},{date:"2022-04",n:9},{date:"2022-05",n:12},{date:"2022-06",n:5},
      {date:"2022-07",n:12},{date:"2022-08",n:6},{date:"2022-09",n:7},{date:"2022-10",n:10},{date:"2022-11",n:11},{date:"2022-12",n:10},
      {date:"2023-01",n:17},{date:"2023-02",n:11},{date:"2023-03",n:14},{date:"2023-04",n:20},{date:"2023-05",n:24},{date:"2023-06",n:17},
      {date:"2023-07",n:28},{date:"2023-08",n:27},{date:"2023-09",n:17},{date:"2023-10",n:15},{date:"2023-11",n:13},{date:"2023-12",n:9}
    ]
  },
  {
    id: "LyD", name: "LyD", total: 2622, logoUrl: logos["LyD"],
    series: [
      {date:"2019-01",n:50},{date:"2019-02",n:30},{date:"2019-03",n:51},{date:"2019-04",n:57},{date:"2019-05",n:61},{date:"2019-06",n:55},
      {date:"2019-07",n:52},{date:"2019-08",n:51},{date:"2019-09",n:43},{date:"2019-10",n:59},{date:"2019-11",n:48},{date:"2019-12",n:49},
      {date:"2020-01",n:41},{date:"2020-02",n:23},{date:"2020-03",n:56},{date:"2020-04",n:66},{date:"2020-05",n:57},{date:"2020-06",n:53},
      {date:"2020-07",n:53},{date:"2020-08",n:42},{date:"2020-09",n:40},{date:"2020-10",n:44},{date:"2020-11",n:40},{date:"2020-12",n:38},
      {date:"2021-01",n:41},{date:"2021-02",n:18},{date:"2021-03",n:43},{date:"2021-04",n:44},{date:"2021-05",n:52},{date:"2021-06",n:41},
      {date:"2021-07",n:35},{date:"2021-08",n:47},{date:"2021-09",n:48},{date:"2021-10",n:39},{date:"2021-11",n:49},{date:"2021-12",n:49},
      {date:"2022-01",n:38},{date:"2022-02",n:24},{date:"2022-03",n:40},{date:"2022-04",n:47},{date:"2022-05",n:49},{date:"2022-06",n:57},
      {date:"2022-07",n:49},{date:"2022-08",n:57},{date:"2022-09",n:36},{date:"2022-10",n:40},{date:"2022-11",n:27},{date:"2022-12",n:33},
      {date:"2023-01",n:32},{date:"2023-02",n:19},{date:"2023-03",n:35},{date:"2023-04",n:35},{date:"2023-05",n:47},{date:"2023-06",n:41},
      {date:"2023-07",n:33},{date:"2023-08",n:39},{date:"2023-09",n:36},{date:"2023-10",n:42},{date:"2023-11",n:60},{date:"2023-12",n:41}
    ]
  },
  {
    id: "NodoXXI", name: "Nodo XXI", total: 328, logoUrl: logos["Nodo XXI"],
    series: [
      {date:"2019-07",n:2},{date:"2019-08",n:1},{date:"2019-09",n:3},{date:"2019-10",n:3},{date:"2019-11",n:6},{date:"2019-12",n:3},
      {date:"2020-01",n:1},{date:"2020-03",n:14},{date:"2020-04",n:25},{date:"2020-05",n:12},{date:"2020-06",n:11},{date:"2020-07",n:8},
      {date:"2020-08",n:12},{date:"2020-09",n:3},{date:"2020-10",n:5},{date:"2020-11",n:1},{date:"2020-12",n:2},
      {date:"2021-01",n:13},{date:"2021-02",n:1},{date:"2021-03",n:9},{date:"2021-04",n:3},{date:"2021-06",n:1},{date:"2021-07",n:1},
      {date:"2021-08",n:1},{date:"2021-09",n:5},{date:"2021-10",n:11},{date:"2021-11",n:13},{date:"2021-12",n:2},
      {date:"2022-01",n:10},{date:"2022-05",n:1},{date:"2022-06",n:1},{date:"2022-07",n:12},{date:"2022-08",n:4},{date:"2022-10",n:8},
      {date:"2022-11",n:2},{date:"2022-12",n:4},
      {date:"2023-01",n:3},{date:"2023-02",n:1},{date:"2023-03",n:8},{date:"2023-05",n:3},{date:"2023-06",n:4},{date:"2023-07",n:27},
      {date:"2023-10",n:27},{date:"2023-11",n:20},{date:"2023-12",n:21}
    ]
  },
  {
    id: "OPES", name: "OPES", total: 45, logoUrl: logos["OPES"],
    series: [
      {date:"2019-01",n:1},{date:"2019-04",n:1},{date:"2019-09",n:1},{date:"2019-10",n:1},
      {date:"2020-01",n:1},{date:"2020-03",n:1},{date:"2020-07",n:1},{date:"2020-08",n:2},{date:"2020-09",n:4},{date:"2020-10",n:3},{date:"2020-11",n:1},{date:"2020-12",n:4},
      {date:"2021-01",n:1},{date:"2021-04",n:2},{date:"2021-05",n:2},{date:"2021-06",n:3},{date:"2021-07",n:2},{date:"2021-08",n:1},
      {date:"2022-08",n:1},
      {date:"2023-10",n:8},{date:"2023-12",n:4}
    ]
  },
  {
    id: "Pivotes", name: "Pivotes", total: 412, logoUrl: logos["Pivotes"],
    series: [
      {date:"2022-11",n:1},{date:"2022-12",n:16},
      {date:"2023-01",n:5},{date:"2023-02",n:5},{date:"2023-03",n:122},{date:"2023-04",n:23},
      {date:"2023-05",n:11},{date:"2023-06",n:6},{date:"2023-07",n:57},{date:"2023-08",n:35},
      {date:"2023-09",n:32},{date:"2023-10",n:29},{date:"2023-11",n:31},{date:"2023-12",n:39}
    ]
  },
  {
    id: "SignosUandes", name: "Signos Uandes", total: 3612, logoUrl: logos["Signos Uandes"],
    series: [
      {date:"2019-01",n:53},{date:"2019-02",n:20},{date:"2019-03",n:67},{date:"2019-04",n:83},{date:"2019-05",n:88},{date:"2019-06",n:84},
      {date:"2019-07",n:83},{date:"2019-08",n:87},{date:"2019-09",n:89},{date:"2019-10",n:88},{date:"2019-11",n:77},{date:"2019-12",n:78},
      {date:"2020-01",n:71},{date:"2020-02",n:10},{date:"2020-03",n:59},{date:"2020-04",n:70},{date:"2020-05",n:66},{date:"2020-06",n:69},
      {date:"2020-07",n:74},{date:"2020-08",n:56},{date:"2020-09",n:67},{date:"2020-10",n:79},{date:"2020-11",n:63},{date:"2020-12",n:62},
      {date:"2021-01",n:45},{date:"2021-02",n:5},{date:"2021-03",n:63},{date:"2021-04",n:65},{date:"2021-05",n:46},{date:"2021-06",n:68},
      {date:"2021-07",n:55},{date:"2021-08",n:66},{date:"2021-09",n:54},{date:"2021-10",n:66},{date:"2021-11",n:71},{date:"2021-12",n:64},
      {date:"2022-01",n:55},{date:"2022-02",n:3},{date:"2022-03",n:52},{date:"2022-04",n:59},{date:"2022-05",n:59},{date:"2022-06",n:54},
      {date:"2022-07",n:61},{date:"2022-08",n:59},{date:"2022-09",n:54},{date:"2022-10",n:64},{date:"2022-11",n:62},{date:"2022-12",n:56},
      {date:"2023-01",n:41},{date:"2023-02",n:5},{date:"2023-03",n:57},{date:"2023-04",n:49},{date:"2023-05",n:53},{date:"2023-06",n:75},
      {date:"2023-07",n:55},{date:"2023-08",n:70},{date:"2023-09",n:53},{date:"2023-10",n:65},{date:"2023-11",n:85},{date:"2023-12",n:55}
    ]
  }
];

// -------------------------------------------------------------------------------------
// LÓGICA POST-HARDCODE: REQUERIMIENTOS DE IMPLEMENTACIÓN Y DETALLES ALGORÍTMICOS
// -------------------------------------------------------------------------------------

// 1) Normalización temporal
// - Construir un arreglo `MONTHS` con objetos Date que cubran desde 2019-01-01 a 2023-12-01 (saltos de 1 mes).
// - Proveer utilidades:
//     parseYM("YYYY-MM") -> Date(YYYY, MM-1, 1)
//     formatYM(Date) -> "YYYY-MM"
// - Para cada serie (overall y cada TT):
//     normalizeSeries(series):
//        - Mapear a Map<string(dateYM) -> n>
//        - Para cada m ∈ MONTHS, si falta valor, usar n=0.
//        - Retornar [{date: Date, ym: "YYYY-MM", n: number}] con fechas Date para usar con scaleTime.
// - Garantizar que el largo de toda serie normalizada === MONTHS.length.

// 2) Asignación de color (paleta Pastel estable)
// - Usar `const PASTEL = d3.schemePastel1;` (9 colores).
// - `colorForIndex(i) = PASTEL[i % PASTEL.length]`.
// - Mantener un diccionario fijo por orden del array THINK_TANKS (posición en el array = índice de color).
// - Para overlay del total, usar `fillOverlay = d3.color(colorForIndex(i)).copy({opacity:0.75})`,
//   y `strokeOverlay = d3.color(colorForIndex(i)).darker(0.6)`.

// 3) Construcción de contenedores SVG
// - Cada panel (tt-chart y total-chart) usará un SVG full-bleed con viewBox y preserveAspectRatio:
//     <svg viewBox="0 0 W H" preserveAspectRatio="xMidYMid meet"></svg>
// - Tamaños base sugeridos: TT: W=980, H=360; Total: W=980, H=220 (ajustar con viewBox).
// - Márgenes: const M = {top: 28, right: 20, bottom: 58, left: 56} (rotación de ticks en X).
// - En cada SVG crear grupos: g.axes, g.barsBase, g.barsOverlay (solo en total), g.line (opcional), g.glow, g.labels.

// 4) Ejes y escalas
// - Dominio X común (ambos charts): d3.scaleTime().domain([MONTHS[0], MONTHS.at(-1)])
//   .range([M.left, W - M.right]).
// - Ticks X: uno por año. Usar d3.timeYear.every(1). Formatear "YYYY".
//   Rotar labels en -60°, text-anchor "end", dy "0.32em" y dx "-0.4em".
// - Dominio Y total: [0, 1.08 * max(overall.n)]. Dominio Y TT: [0, 1.08 * max(tt.n)].
// - Altura efectiva: H - M.top - M.bottom.
// - Paso mensual (ancho teórico): step = x(d3.timeMonth.offset(t,1)) - x(t). barW = Math.max(6, step * 0.7).

// 5) Render del histograma inferior (TOTAL)
// - Crear una sola vez las barras base (g.barsBase):
//     join por key = d.ym
//     rect.x = x(d.date) - barW/2, width = barW
//     rect.y = yTotal(d.n), rect.height = yTotal(0) - yTotal(d.n)
//     fill = "rgba(148,163,184,0.35)" (slate-400/40), stroke = "#00000000"
// - Crear capa overlay (g.barsOverlay) inicialmente con n=0:
//     rect con mismas x/width, y = yTotal(0), height=0, fill/stroke del TT activo.
// - updateTotalOverlay(ttSeries, color):
//     join por key ym; transition(600ms, easeCubic):
//         y → yTotal(tt.n)
//         height → yTotal(0) - yTotal(tt.n)
//         fill → fillOverlay, stroke → strokeOverlay, stroke-width: 1
//     Usar clipPath para que overlay nunca sobresalga por encima de base:
//         defs>clipPath#clipTotal con un rect que cubra el área de plotting; aplicar clip-path al grupo overlay.

// 6) Render del histograma central (TT)
// - renderTTChart(tt, idxColor):
//     a) Calcular yTT (dominio a 1.08*max(tt.n)). Si max==0, poner dominio [0,1] y mostrar mensaje "sin datos".
//     b) Definir gradiente vertical en <defs> con id único (`grad-tt-${tt.id}`) usando el color pastel como tope.
//         stop(0%) = pastel.darker(0.3), stop(100%) = pastel.brighter(0.6) con alpha 0.85.
//     c) JOIN de barras (key=ym) en g.barsBase:
//           enter: rect con y=yTT(0), height=0, x=x(t)-barW/2, width=barW, fill=`url(#grad-tt-...)`.
//           transition secuencial: total 900ms → delay = 900 / MONTHS.length * i
//                y → yTT(n), height → yTT(0)-yTT(n), easeCubicOut.
//     d) Línea de envolvente (opcional) en g.line con d3.line().curve(d3.curveMonotoneX):
//           stroke = d3.color(pastel).darker(0.6), stroke-width=2.5, fill="none".
//           Usar trazo dasharray para animar de izquierda a derecha (900 ms).
//     e) N total TT:
//           set text content de #tt-sum = format(",")(tt.total).

// 7) Animación y replay
// - setLogo(tt):
//     <img#tt-logo src=tt.logoUrl alt=tt.name> con estilos Tailwind. 
//     Transición: desde opacity:0, translateY:8px a opacity:1, translateY:0 en 300 ms (vía CSS y toggle clase).
// - replay():
//     - Volver a estado inicial de barras TT (height=0, y=yTT(0)) y línea (dashoffset total) y overlay y/height=0.
//     - Relanzar transiciones en el mismo orden (logo → barras TT → línea → overlay).
// - Orden recomendado de animación al cambiar TT:
//     1) Logo (300 ms)
//     2) Barras TT (900 ms, secuencial)
//     3) Línea TT (en paralelo a barras, 900 ms) — opcional
//     4) Overlay en Total (después de 150 ms de comienzo de barras), 600 ms

// 8) Navegación y estado
// - Estado global:
//     let idx = 0  // 0 = “solo total” (sin TT), 1..THINK_TANKS.length = TT activo
// - nextSlide(): if idx < THINK_TANKS.length → idx++ → renderTT(idx).
// - prevSlide(): if idx > 0 → idx-- → si idx==0, limpiar pane-tt (ocultar logo, vaciar svg) y overlay=0.
// - progress: #progress = (idx==0 ? "TT 0 / N" : `TT ${idx}/${N}: ${tt.name}`).

// 9) Pre-carga de imágenes
// - En init, para cada tt.logoUrl: const img = new Image(); img.src = url; guardar en cache (Map<string,boolean>).

// 10) Accesibilidad
// - <svg role="img" aria-labelledby="..." aria-describedby="...">; crear <desc> e <title> con nombre TT y rango temporal.
// - Asegurar contraste: Pastel sobre fondo oscuro con borde oscuro (strokeOverlay darker 0.6).

// 11) Efectos estéticos opcionales (no bloqueantes)
// - Glow sutil a la línea TT (filter: drop-shadow vía SVG filter)
//     defs>filter#glow>feGaussianBlur stdDeviation=2 → feMerge
// - Fondo del deck con gradiente radial animado leve (CSS-only).
// - Micro-interacción hover en barras TT: scaleY(1.03) y elevar stroke del borde (transition 120 ms).

// 12) Gestión de redimensionado (responsive)
// - Listener `resize`→ recomputar W/H desde el tamaño del contenedor, reestablecer viewBox y recalcular escalas y barW.
// - Mantener aspectos de texto dentro de los SVG usando `vector-effect="non-scaling-stroke"` para strokes de ejes/líneas.
// - Re-render (join con .join(update)) para reposicionar rects sin animar en resize.

// 13) Utilidades de formato
// - const fmt = d3.format(",");
// - const fmtYM = d3.timeFormat("%Y-%m");
// - Etiquetas de ejes X: d3.timeFormat("%Y-%m") en ticks menores si se quisiera modo “dense”; por defecto anual (“%Y”).

// 14) Errores y casos borde
// - Si un TT tiene todos 0 → mostrar aviso “Sin publicaciones en el periodo” centrado en el panel TT y no dibujar barras/linea.
// - Si falta el logo o falla la carga → usar fallback de texto con initials (p.ej. círculo con siglas) y clase bg-white/10.
// - Si el ancho disponible < 520 px: reducir bottom margin y tamaño de ticks; rotación -50°; ocultar línea TT si hace falta.

// 15) Estructura JS sugerida (pseudo‐código)

function main() {
  // 15.1 DOM refs
  const elTT = d3.select("#tt-chart");
  const elTotal = d3.select("#total-chart");
  const elLogo = d3.select("#tt-logo");
  const elTTsum = d3.select("#tt-sum");
  const elGlobalSum = d3.select("#global-sum");
  const progress = d3.select("#progress");

  // 15.2 Normalizar series
  const MONTHS = buildMonths("2019-01", "2023-12");
  const overall = normalizeSeries(overallSeries, MONTHS);
  const tts = THINK_TANKS.map((tt, i) => ({
    ...tt,
    color: colorForIndex(i),
    series: normalizeSeries(tt.series, MONTHS)
  }));

  // 15.3 Calcular suma global y pintar ficha
  elGlobalSum.text(d3.format(",")(d3.sum(overall, d => d.n)));

  // 15.4 Crear SVGs y ejes
  const totalChart = createChart(elTotal, /*H≈220*/);
  const ttChart = createChart(elTT, /*H≈360*/);
  // createChart devuelve {svg, g, width, height, xScale, yScale, setYDomain, renderAxes}

  totalChart.setYDomain([0, d3.max(overall, d => d.n) * 1.08]);
  totalChart.renderAxes({ticksX: "year", rotateX: -60});
  renderTotalBase(totalChart, overall);
  updateTotalOverlay(totalChart, overall.map(d => ({...d, n: 0})), PASTEL[0]); // overlay apagado

  // 15.5 Estado y bindings
  let idx = 0; // 0 = solo total
  d3.select("#next").on("click", () => { idx = Math.min(idx + 1, tts.length); renderSlide(); });
  d3.select("#prev").on("click", () => { idx = Math.max(idx - 1, 0); renderSlide(); });
  d3.select(window).on("keydown", (e) => {
     if (e.key === "ArrowRight") d3.select("#next").dispatch("click");
     else if (e.key === "ArrowLeft") d3.select("#prev").dispatch("click");
     else if (e.key.toLowerCase() === "r") replay();
  });

  function renderSlide() {
    progress.text(idx === 0 ? `TT 0/${tts.length}` : `TT ${idx}/${tts.length} — ${tts[idx-1].name}`);
    if (idx === 0) {
      // limpiar panel TT y apagar overlay
      clearTT(ttChart, elLogo, elTTsum);
      updateTotalOverlay(totalChart, overall.map(d => ({...d, n: 0})));
      return;
    }
    const tt = tts[idx - 1];
    setLogo(elLogo, tt);
    renderTTChart(ttChart, tt); // 900 ms secuencial + línea
    updateTotalOverlay(totalChart, tt.series, tt.color); // 600 ms
    elTTsum.text(d3.format(",")(tt.total));
  }

  function replay() {
    if (idx === 0) return;
    const tt = tts[idx - 1];
    renderTTChart(ttChart, tt, {replay:true});
    updateTotalOverlay(totalChart, tt.series, tt.color);
  }

  window.addEventListener("resize", d3.debounce(() => {
    // recomputar dimensiones y re-render estático
    totalChart.resize();
    ttChart.resize();
    renderTotalBase(totalChart, overall);
    if (idx > 0) {
      const tt = tts[idx-1];
      ttChart.setYDomain([0, d3.max(tt.series, d => d.n)*1.08 || 1]);
      ttChart.renderAxes({ticksX:"year", rotateX:-60});
      drawTTBarsStatic(ttChart, tt);
      updateTotalOverlay(totalChart, tt.series, tt.color);
    } else {
      totalChart.renderAxes({ticksX:"year", rotateX:-60});
      updateTotalOverlay(totalChart, overall.map(d => ({...d, n: 0})));
    }
  }, 160));
}

// 16) Funciones clave que debe implementar el generador
// - buildMonths(startYM, endYM) -> Date[]
// - normalizeSeries(seriesRaw, MONTHS) -> [{date, ym, n}]
// - createChart(containerEl, desiredHeight) -> {svg, g, width, height, x, y, setYDomain, renderAxes, resize}
// - renderTotalBase(chart, overallData)
// - updateTotalOverlay(chart, ttData, colorPastel)
// - clearTT(ttChart, imgEl, ttSumEl)
// - setLogo(imgEl, tt) con animación CSS (opacity/translate)
// - renderTTChart(ttChart, tt, {replay=false})
// - drawTTBarsStatic(ttChart, tt) (para resize sin animaciones)

// 17) Filtros y gradients (defs)
// - En cada SVG `ttChart.svg` y `totalChart.svg` declarar una vez:
//     defs>linearGradient#grad-tt-<id> (al actualizar TT cambiar el xlink:href/stop-colors)
//     defs>filter#glow (feGaussianBlur + feMerge) para la línea opcional
//     defs>clipPath#clipTotal

// 18) QA / Verificaciones
// - Verificar que Σ n de cada TT === `total` proporcionado.
// - Verificar overlay ≤ base en todo mes (usar `Math.min(tt.n, overall.n)` si hay data inconsistente).
// - Probar navegación completa (0 → N → 0) con animaciones fluidas.
// - Probar en viewport 360×640, 768×1024, 1366×768 y 1920×1080.

// 19) Criterios de aceptación (DoD)
// - Botones y teclas ← → R operativos.
// - Overlay del total cambia de color y altura por TT; barras base permanecen.
// - N total global y N total TT visibles y correctos.
// - Diseño consistente con Tailwind, tema oscuro, paleta Pastel, sin scroll (contenido centrado).
// - Responde a cambios de tamaño de ventana manteniendo legibilidad de ejes y barras.

// 20) Comentarios finales para la IA generadora
// - Evitar librerías adicionales.
// - Mantener código limpio, funciones puras y nombres PEP-8-like pero en JS (camelCase).
// - Incluir comentarios breves sobre cada bloque para facilitar revisión.
// - Usar `requestAnimationFrame` solo si es estrictamente necesario; con `transition` de D3 basta.
// - No bloquear el hilo: no usar bucles intensivos; precomputar MONTHS y mapas una vez.
// - Asegurar que todas las rutas de logos sean exactamente las provistas en `logos{}`.
// - No usar scrolling: la navegación es por “diapositiva” (estado) dentro del lienzo estático.
// -------------------------------------------------------------------------------------

