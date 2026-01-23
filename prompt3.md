# Visualización segmentada (orientación / tipo) — Full screen, oscuro + colores vividos

## 🎯 Objetivo

Diseñar una visualización narrativa en pantalla completa full screen que muestre, datos completos segmentados en cada histograma, central e inferior 

- En el histograma central fijo, el acumulado mensual total de todos los think del segmento seleccionado (apilado por categoría).
- De forma destacada, el aporte de la categoría activa (resaltada) y, on-hover, su desglose por think tank.
- Controles para alternar dimensión en el footer (Orientación ↔ Tipo) y categoría (p. ej., Derecha / Izquierda / Transversal; Universidad / Independiente / Semi difunto, etc.).
- En el histograma de la banda inferior, el acumulado mensual total del segmento (apilado por categoría) con hitos históricos.
- Nadia tiene que quedar superpuesto sobre otras visualizaciones, y escritos dentro de la visualización. 
- Los valores de las fechas estan escritos en cadenas de texto en formato "YYYY-MM" (ejemplo: "2019-01", "2020-12", etc.)

El estilo se mantiene oscuro, técnico y elegante con paleta colorida y transiciones fluidas. Usa Tailwind para layout/estilos y D3.js para el rendering.

---

## 🖥️ Estructura (cuatro bandas, sin scroll, con margen/contorno, ocupando la totalidad de la ventana sin interponerse un )

- **Contorno suave (1px)** alrededor de la página para “encajar” el contenido.
- **Cuatro bandas horizontales** con separación vertical mínima (≈1%) entre ellas, manteniendo 100% del alto total:
    - **Banda superior** – Cabecera (≈15%)
    - **Banda central** – Histograma fijo, apilado por think tank individual (≈50%)
    - **Banda inferior** – Histograma fijo, apilado por categoría + hitos (≈25%)
    - **Banda control** – Interacción, navegación, selección de filtros (≈10%)

---

### 1) Banda superior — Cabecera / Selección (≈15%)

- **Izquierda (texto):** Categoría activa (título grande): Derecha, Izquierda (Para orientación política); Transversal, Universidad, Semi difunto, De partido (para tipo de think tank).
    - Tipografía moderna (Inter/Manrope/Montserrat), color `#EAEAEA`, peso 600–700.

- **Centro (íconos de think tank):**
    - Rectángulo horizontal (más ancho que alto) que aloja el total de íconos de los think tank que representan el grupo segmentado, no scrolleable.
    - Íconos centrado, `object-fit: contain`, padding 6–10px.
    - Fondo del rectángulo: `#334155` con gradiente radial suave; borde `1px rgba(255,255,255,0.25)` y glow tenue.

- **Derecha (total de la categoría):**
    - Cápsula translúcida con el Total (N) de la categoría activa visualizada en la banda central.
    - Animación pulse breve al cambiar de categoría o dimensión.


---

### 2) Banda central — Histograma de barras apiladas fijo (apilado por think tank individual) (≈50%)

#### Representación:

- Barras verticales apiladas por think tank segmentando individualmente la barra en su total. estas muestran el acumulado mensual total del aporte por cada think tank individual al segmento/filtro seleccionado (Orientación Política - Tipo de Think Tank) dentro de la banda central por barra de forma individual.
- El color es para los think tanks, no para las categorías en este histograma de la banda central (la categoría activa se resalta por brillo/borde).
- Cada think tank tiene su color fuerte individual.
- Preparate para recibir los datos con un placeholder para ser instertados en el codigo para que funcionen los datos dentro del histograma: ver sección datos
- No generar datos ficticios, solo placeholders para pegar los datos que tengo disponibles.
- Cuando se filtra, ordena de mayor a menor según el total mensual del segmento seleccionado.


#### Desglose on-hover / focus + mouseover:
- **Tooltip enriquecido:**
    - Total mensual.
    - Nombre del think tank
    - N total mensual del think tank.
- **Mouseover sobre la barra total mensual y segmento de think tank:**
    - Detalle por categoría (color + valor + porcentaje).

#### Elementos gráficos:

- **Etiqueta del valor total por mes**
    - En la parte superior de cada barra se encuentra enunciado el N total mensual.
    - Autoacomodo vertical (repulsión leve) si hay densidad, con fade-in suave al final de la secuencia.
    - Que esten ubicados justo encima de la barra, centrados horizontalmente.

#### Animación para la aparición del gráfico:
- Secuencial izquierda→derecha, duración 1.5 s total (todas las barras), ease cubic-out.
- Siempre mostrar 2019-01 → 2023-12 de forma fija (barras con n=0 quedan vacías).

#### Ejes:
- **Eje X:**
    - Lleva la continuación de la línea vertical roja con halo tenue que proviene desde el gráfico de la banda inferior, esta barra cruza todo el gráfico verticalmente.
    - Etiquetas temporales de años(2019–2023) y 4 etiquetas de mes por año donde correspondan: Feb, May, Ago, Nov.
    - Sin colisiones con etiquetas de hitos.

- **Eje Y (valores):**
    - Ajusta Escala según máximo mensual del segmento mostrado; ticks enteros, centrados.
    - Estilo gris claro translúcido (`rgba(255,255,255,0.6)`), tipografía clara.
    - Adapta el tamaño del total de la escala en función del filtro aplicado.

---

### 3) Banda inferior — Histograma apilado pro categoría + Hitos (≈25%)

#### Tipo:
- Barras apiladas por categoría (mismo período). (Total de valores de la categoría, por ejemplo, para orientación política, que esten pintadas las barras por Derecha e Izquierda de forma diferenciante)
- Base: total mensual (total de todos los valores de la segmentación).
- Aporte de cada categoría: apilado por color; la categoría activa tiene halo/borde.
- Siempre mostrar 2019-01 → 2023-12 de forma fija (barras con n=0 quedan vacías).
- Como es fijo, solo cambian los colores de las categorías al cambiar dimensión o categoría activa.
- Tiene que destacar la categoría activa (halo/borde); el resto queda normal.
- La categoría activa/filtrada se resalta (más brillo/borde) y el resto queda translúcida (`opacity 0.45–0.6`).
- Y se muestra siempre el aporte mensual de cada think tank al segmento seleccionado (Tipo de Think Tank o Orientación Política).

#### Indicador global (centrado arriba de la banda):
- Cápsula con: Total de publicaciones en el periodo = 17,418 (texto editable).
- Fondo translúcido, borde difuso; tipografía clara.

#### Ejes:

- **Eje X (fechas):**
    - Etiquetas de años completas (2019–2023) y 4 etiquetas de mes por año donde correspondan: Feb, May, Ago, Nov.
    - Sin colisiones con etiquetas de hitos.

- **Hitos históricos en eje x (alineados con el histograma de panel central):**
    - 2019-10 Estallido Social
    - 2021-09 Inicio CC
    - 2022-09 Plebiscito salida CC
    - 2023-12 Plebiscito salida PC
    - Línea vertical roja con halo tenue y etiqueta debajo del eje X (negrita).

- **Eje Y (valores):**
    - Adapta a máximo mensual del total; enteros; centrado visual, adaptable al N, la idea es que se vea un histograma proporcional con los valoes entregados.
    

---

### 4) Banda control — Interacción (≈10%)

- Avance automático por categorías (o por meses al reproducir la narrativa) con 1.5 s de animación + 0.5 s pausa.
- **Play / Pausa** (esquina inferior izquierda).
- **Flechas (izq/der)** y teclado (arriba/abajo) habilitados.
- Escrito en el centrado: "Demo XII Conferencia internacional COES".
- **Controles de Filtro:**
    - Seleccionador de valor de la categoría filtrada en forma de cápsulas al centro y los segmentos de la categoría.
    - Dimensión activa (badge): Orientación política o Tipo de think tank.
    - Al seleccionar, se filtran los resultados visualizados/visualizables en la banda central y tambien cambia el N total mostrado en la banda superior.

---

## 🌗 Estilo

- Fondo grafito/azulado (`#0e0e10–#1a1b1e`) con gradiente suave.
- Paleta de colores vividos coherente y legible.
- Tipografías Inter/Manrope/Montserrat.
- Sombras ambientales ligeras; transiciones ease-in-out o cubic-out.

---

## 🔁 Comportamiento clave

- Dimensión conmutada (Orientación ↔ Tipo) no resetea la animación global; mantiene estado de reproducción.
- Categoría activa siempre resalta en todas las bandas.
- **On-hover sobre un mes en la banda central:**
    - Mostrar breakdown por categoría.
    - Si hover sobre la porción de la categoría activa, mostrar breakdown por think tank (mini-lista con valores y % dentro de esa categoría en ese mes).
- Cápsulas con autoacomodo sin solapamientos visibles.

---

## 📊 Estructura de datos para utilizar: estarán harcodeados

En este punto, genera una escritura incompleta de la estructura de datos JSON que se utilizará para alimentar la visualización. Incluye ejemplos representativos pero no todos los datos, dejando espacios para que se puedan completar posteriormente.

**(no generar datos de prueba, solo placeholders para pegar el resto de los datos)**

### ejemplo de datos que seran insertados, deja un placerholder para pegar el resto de los datos que tengo disponibles listos para pegar, dejalo incompleto: 

Estos son los datos que se utilizan para indicar el total por mes general.

"overallByMonth": [
    { "date": "2019-01", "n": 179 },
    { "date": "2019-02", "n": 80 },
    { "date": "2019-03", "n": 266 }
    /* ... hasta 2023-12 ... */
],

**(no generar datos de prueba, solo placeholders para pegar el resto de los datos)**

Para los think tanks, solo se encuentran esas variables dentro de los datos: id, name, total, logoUrl, data. puedes llamar a esos recursos desde los datos que se ingresarán.

Estos son los datos que se utilizan para indicar el total por mes de cada think tank.

"thinkTanks": [
    {
        "id": "CDC",
        "name": "CDC",
        "total": 171,
        "logoUrl": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/cdc.png",
        "data": [
            { "date": "2019-01", "n": 1 },
            { "date": "2019-02", "n": 0 },
            { "date": "2019-03", "n": 1 }
            /* ... hasta 2023-12 ... */
        ]
    }
]

Es **MUY IMPORTANTE** que la estructura, sobretodo el uso de "", comas, corchetes y llaves sea exactamente igual a la mostrada aquí para evitar errores de parsing en el script. Es decir, no agregues mas variables tipo color, u orientación. 
---

## 🧭 Reglas de interacción (resumen)

- **Selector de Dimensión:** cambia entre orientation y type.
- **Selector de Categoría:** fija la categoría activa (glow/halo en barras apiladas; color a tope, resto translúcido).
- **Hover:**
    - Sobre barra total mensual → tooltip con detalle por categorías.
    - Sobre porción de categoría activa → detalle por TT (lista ordenada, valores y % dentro de la categoría ese mes).
- **Hitos sincronizados** en banda central e inferior (misma x).

---

## 🧪 Criterios de calidad

- Apilado correcto y consistente
- Considera el N correcto en cápsulas y tooltips.
- Considera que son 24 think tanks distintos (colores únicos).
- Diferenciación clara entre categoría activa (brillo/borde) y resto (opacity).
- Cápsulas legibles, sin colisiones; autoacomodo suave.
- Iconos centrados y nítidos; título de categoría en la izquierda de la cabecera.
- Transiciones fluidas; narrativa clara; paleta uniforme.
- Performance: DOM/SVG eficiente (join por date), escalas reusadas.
- Las referencias de las imágenes de los think tanks deben ser tomadas desde el JSON proporcionado.

---

## 🔧 Notas de implementación D3/Tailwind

- Mantén dominio temporal fijo: `d3.timeParse('%Y-%m') + d3.timeMonth.every(1)` para generar meses 2019-01…2023-12; completa con n=0.
- Usa stack por categorías (`d3.stack()`) para el histograma central e inferior.
- Color scale por `category.id` con los colores provistos en datos (no generes paletas nuevas).
- Transitions cortas (250–400ms) al cambiar dimensión o categoría; la animación de entrada (1.5 s) solo en load o cuando el usuario “replay”.
- Tooltips con HTML (“mini-lista” por TT), contenedor `position: fixed` + smart placement.

---

## Clasificación real think tanks sus valores, segmentaciones y sus totales

### Orientación Política Reales y N Reales
- **Derecha:**
    - Signos Uandes: 3612
    - LyD: 2622
    - FPP: 2585
    - CEP: 1998
    - Fundación Jaime Guzmán: 678
    - Instituto Res Pública: 575
    - Pivotes: 412
    - CLAPES UC: 205
    - Instituto Libertad: 124
    - Horizontal: 116
    - IES: 20
    - Ideas Republicanas: 9
    - Idea País: 3
- **Izquierda:**
    - Espacio Público: 1525
    - Instituto Igualdad: 892
    - Fundación Sol: 550
    - Nodo XXI: 328
    - Chile 21: 288
    - CED: 265
    - Casa Común: 227
    - CDC: 171
    - Horizonte Ciudadano: 130
    - OPES: 45
    - ICAL: 38

### Tipo de Think Tank, clasificaciones reales y N reales
- **De partido:**
    - Instituto Igualdad: 892
    - Fundación Jaime Guzmán: 678
    - CDC: 171
    - Instituto Libertad: 124
    - Horizontal: 116
    - OPES: 45
    - ICAL: 38
    - Ideas Republicanas: 9
- **Semi Difuntos:**
    - Casa Común: 227
- **Transversal:**
    - LyD: 2622
    - FPP: 2585
    - CEP: 1998
    - Espacio Público: 1525
    - Instituto Res Pública: 575
    - Fundación Sol: 550
    - Pivotes: 412
    - Nodo XXI: 328
    - Chile 21: 288
    - CED: 265
    - Horizonte Ciudadano: 130
    - IES: 20
    - Idea País: 3
- **Universidades:**
    - Signos Uandes: 3612
    - CLAPES UC: 205

### Lista de referencias de íconos de think tanks (logoUrl)
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


Lee claramente los valores y los detalles entregados para realizar esta presetación.
Haz tu mejor esfuerzo y tomate tu tiempo para crear una visualización impresionante y funcional basada en estas especificaciones. ¡Buena suerte!