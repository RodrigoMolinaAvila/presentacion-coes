# Visualización tipo diapositivas (full screen, tema oscuro + pasteles)

## 🎯 Objetivo

Diseñar una **visualización narrativa e inmersiva** en **pantalla completa (sin scroll)**, que presente —think tank por think tank— la evolución mensual de su producción y su proporción dentro del total general.
El estilo debe ser **oscuro, técnico y elegante**, con **paleta pastel sobre fondo profundo**, transiciones fluidas y estructura perfectamente jerarquizada.
Utiliza propiedades Tailwind y D3.js para las visualizaciones y tools.

---

## 🖥️ Estructura general

La interfaz está compuesta por **cuatro bandas horizontales** fijas al alto total del viewport.
Dale un borde al contorno de la pagina para centrar toda la información visualmente, sin chocar con el borde de la pantalla.
Genera una divison tipo margen de al menos 1% entre cada banda divisoria para dar espacio visual y evitar saturación (equilibra la proporción para que se mantenga en un total de 100% en la visualización final)

---

### 1. Banda superior — Cabecera (≈20% del alto total)

* **Izquierda:**

  * **Nombre del think tank activo**, en tipografía moderna sans geométrica (Inter, Manrope o Montserrat).
  * Color blanco o gris claro (`#EAEAEA`), tamaño grande, espaciado amplio, peso seminegrita, centrado.
* **Centro:**

  * **Rectángulo del logo** — **más ancho que alto** para aprovechar espacio horizontal.
  * El logo ocupa **casi toda la superficie interna** con **padding mínimo (6–10 px)**, siempre centrado, sin deformación (`object-fit: contain`).
  * **Fondo del rectángulo:** color base `#334155` con gradiente radial suave (`#3b4252 → #2b2f3a`) para asegurar visibilidad tanto en logos blancos como oscuros.
  * **Borde:** 1px translúcido `rgba(255,255,255,0.25)` y **sombra externa difusa (glow frío discreto)**.
* **Derecha:**

  * **Total acumulado (N)** del think tank activo dentro de una **cápsula translúcida** (`rgba(255,255,255,0.08)`) con **borde pastel** y **halo sutil**, centrado.
  * Animación breve de pulso al cambiar de think tank.

---

### 2. Banda central — Gráfico principal (≈50% del alto total)

* **Representación:** barras verticales gruesas que muestran la **producción mensual del think tank activo**.
* **Aparición secuencial:**

  * Las barras crecen **una tras otra, de izquierda a derecha**, en una secuencia total de **1.5 segundos**.
  * Si el valor es 0, la barra no aparece (espacio vacío).
  * El periodo temporal fijo es **2019-01 a 2023-12** 
  * Siempre crea el grafico en ese intervalo, aunque el think tank no tenga datos en algunos meses.
  * Movimiento con `ease cubic-out`, altura progresiva desde la línea base.
  * El tamaño de cada barra es proporcional al valor **n** del total.
  * **IMPORTANTE** En el intervalo temporal del grafico siempre se muestra en el periodo **2019-01 a 2023-12** esto de forma fija.
* **Color de las barras:** tono pastel luminoso único por think tank.
* **Etiquetas sobre las barras:**

  * Forma de cápsula rombo luminosa, semitransparente, con número **n** centrado.
  * Aparecen sincronizadas con el crecimiento de la barra y quedan sobre la barra que representan tardando lo mismo que la secuencia.
  * **Autoacomodo dinámico:**

    * Si varias capsulas están demasiado próximas, se reposicionan suavemente en el eje vertical (repulsión controlada).
    * En zonas densas, las capsulas reducen **opacidad y tamaño ligeramente** para evitar colisión sin perder legibilidad.
  * Al finalizar la secuencia, **todas las capsulas se iluminan simultáneamente** como efecto de cierre.

* **Linea de Hitos Historicos**: 
    * Mostrar SOLO la linea roja vertical que indican los hitos historicos correspondiente a su tiempo, ya que la etiqueta provendrá desde la Banda Inferior.
    * **2019-10:** Estallido Social
    * **2022-09:** Plebiscito salida 1
    * **2023-12:** Plebiscito salida 2

* **Eje Y (valores):**
    * Valores de N en el eje, que se adapten en función del máximo valor mensual del think tank activo.
    * Que este centrado la posicion sus valores a lo largo del eje Y, es decir, que no ocupe los bordes extremos del grafico.
    * Los valores siempre son enteros, sin decimales.


---

### 3. Banda inferior — Gráfico de barras apiladas (≈25% del alto total)

* **Tipo:** gráfico de barras **apiladas** gruesas como histograma que muestra el **aporte mensual** del think tank activo **sobre el total global**.
* **Estructura:**

  * La barra base (inferior) representa el **total mensual general (overall)**.
  * Sobre ella se apila la **contribución** del think tank en foco, en el mismo color pastel del gráfico superior.
* **Animación:**

  * Sincronizada con el histograma central.
  * Cuando el think tank cambia, las barras apiladas del aporte emergen con un **desplazamiento vertical suave** y **aumento progresivo de opacidad**.
* **Color:**

  * Base total: azul o verde agua translúcido (`rgba(102, 252, 241, 0.25)`).
  * Aporte del think tank: color pastel con leve halo o borde brillante.
* **Indicador global:**
  * Centrado en la parte superior, una cápsula translúcida con el texto:
    **Total de publicaciones en el periodo = 17,418**.
  * Color: gris claro con borde difuso y texto pastel contrastante.


* **Eje X (fechas):**

  * Mostrar **máximo 2 etiquetas mensuales visibles**, distribuidas uniformemente.
  * Entre cada año debe tener al menos 2 marcadores legibles (por ejemplo, *Abr*, *Jun*, *Oct*).
  * Estilo: gris claro translúcido (`rgba(255,255,255,0.5)`), tipografía llamativa. 
  * Mostar todas las etiquetas de los años, que no se solapen con las etiquetas de mes.
  * Considera que, el intervalo de la data es desde **2019-01** hasta **2023-12**.

* **Marca de Eventos históricos (hitos):**

  * Se marcan con líneas verticales y etiquetas debajo de las 3 fechas que correspondan, de color rojo con letra negrita con un tamaño mas grande la fuente de la fecha, trazando una linea vertical roja con un halo sutil, trazando una línea punteado por el eje X hasta el tope del gráfico inferior y el grafico central:
  * El texto que indica el nombre los eventos históricos, y desde donde inicia la linea vertical quede posicionado en la parte inferior del eje X, abajo de donde estan las etiquetas de los años.

    * **2019-10:** Estallido Social
    * **2022-09:** Plebiscito salida 1
    * **2023-12:** Plebiscito salida 2


* **Eje Y (valores):**
    * Valores de N en el eje, que se adapten en función del máximo valor mensual del total general.
    * Que este centrado la posicion sus valores a lo largo del eje Y, es decir, que no ocupe los bordes extremos del grafico.


---

### 4. Banda Control - Controles de interacción y navegación (5%≈ del alto total)

* **Avance automático:**

  * Cada think tank se muestra durante 1.5 s (animación) + 0.5 s (pausa).
  * Luego, la presentación avanza automáticamente al siguiente think tank en una transición sutil.
* **Botones de control:**

  * **Play y Pausa:**

    * Ubicados en la esquina inferior izquierda, fuera del área de datos.
    * Íconos minimalistas (`Play` / `Pausa`), translúcidos con halo pastel.
    * Al pausar, se detiene la animación automática y el usuario puede usar las flechas manualmente.
* **Flechas de navegación:**

  * A izquierda y derecha del contador.
  * Tambien funcional con las flechas de arriba y abajo.
  * Habilitar el uso de presentador.
  * Diseño circular translúcido con sombra interior.
  * Flecha activa con glow tenue.
* **Indicador de progreso (ej. “3/24”):**

  * Centrado debajo del gráfico inferior, dentro de una cápsula translúcida.
  * **Interacción hover:**

    * Al pasar el mouse, aparece un **menú vertical flotante, largo y scrolleable** con la lista de **todos los think tanks** (nombre + miniatura de logo (referenciado en los datos)).
    * El menú tiene fondo oscuro translúcido (`rgba(20, 20, 25, 0.9)`), texto claro y borde pastel.
    * Espera al menos 0,1 s antes de desaparecer al retirar el mouse.
  * **Interacción click:**

    * Al hacer click en cualquier elemento del menú, la visualización salta directamente al think tank seleccionado y ejecuta su animación completa.

---

## 🌗 Estilo visual general

* **Fondo:** negro azulado o grafito (`#0e0e10`, `#121212`, `#1a1b1e`) con gradiente suave.
* **Paleta:** pasteles suaves y lumínicos (azul cielo, menta, coral, lavanda, durazno, verde agua).
* **Tipografía:** Inter / Manrope / Montserrat, blanca o gris clara.
* **Efectos visuales:**

  * Halos difusos y brillos suaves (sin saturación ni neón).
  * Sombras ambientales ligeras.
  * Transiciones siempre “ease cubic-out” o “ease-in-out” para continuidad fluida.

---

## 🧠 Jerarquía visual y coherencia

* **Distribución fija superior:**

  * Nombre (izquierda), logo (centro rectangular más ancho), total (derecha).
* **Navegación:**

  * Controles (play/pause, flechas, indicador) **debajo del gráfico inferior**, nunca sobre las barras.
* **Hitos temporales:**

  * Claros, discretos, alineados verticalmente con el eje.
* **Capsulas:**

  * Evitan colisiones mediante autoacomodo dinámico; opacidad ajustada si hay densidad.
* **Consistencia cromática:**

  * Cada think tank mantiene su color pastel en todas las bandas.
* **Experiencia global:**

  * Movimiento constante, ritmo narrativo, elegancia visual y armonía tipográfica.

---

## 📊 Estructura de datos

* Así estan escritos los datos a pegar, no cambies su forma de escribir el codigo en los datos, **MUY IMPORTANTE**.
* No generar datos, solo utilizar los referenciados por el usuario en el ejemplo.
* El resto de los datos los agrega el usuario, la lista es muy extensa, deja el espacio para insertar los datos completamente.

{
  "overallData": [
    { "date": "2019-01", "n": 179 },
    { "date": "2019-02", "n": 80 },
    { "date": "2019-03", "n": 266 }
    /* ... hasta 2023-12 ... */
  ],
  "thinkTanks": [
    {
      "id": "CDC",
      "name": "CDC",
      "total": 171,
      "logoUrl": "https://raw.githubusercontent.com/RodrigoMolinaAvila/web_resources/refs/heads/main/webresources/presentacion-coes/cdc.png",
      "data": [
        { "date": "2019-01", "n": 1 },
        { "date": "2019-02", "n": 0 },
        { "date": "2019-03", "n": 1 },
        { "date": "2019-04", "n": 3 },
        { "date": "2019-05", "n": 1 }
        /* ... los meses faltantes se asumen n = 0 ... */
      ]
    }
    /* ... más think tanks ... */
  ],
}

Considera que se encontraran esos mismos valores y referencias para cada think tank con el "logoUrl" adecuado.
**IMPORTANTE** No generes datos de simulación, solo deja el espacio para que el usuario los agregue ya que el dispone listo para pegar.


## 📏 Criterios de calidad final

* **Barras apiladas:** proporción exacta del aporte del think tank al total.
* **Capsulas:** sin solapamientos perceptibles; autoacomodo fluido y legible.
* **Logo:** centrado, más ancho horizontalmente casi panorámico utilizando un espacio ajustado finamente a los bordes del espacio de donde dispone el panel, legible sobre fondo fijo.
* **Controles:**
  * Reproducir/pausar y cambiar think tank sin reiniciar animación global.
  * Menú desplegable fluido y consistente con la estética general.
* **Narrativa visual:** fluida, pausada y coherente; equilibrio técnico entre forma, color y tiempo.
* **Colores:** considera que son 24 think tanks a visualizar para construir la diversidad de colores.
* **Transiciones:** suaves y sutiles pero con transiciones, sin saltos bruscos ni cortes abruptos.

Toma tu tiempo, y da tu mejor esfuerzo para realizar el mejor trabajo posible. ¡Gracias!