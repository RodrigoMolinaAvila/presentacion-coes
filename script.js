
// Global state and configuration
const APP_STATE = {
    currentSlide: 0,
    totalSlides: 11,
    isFullscreen: false,
    colorScheme: d3.schemePastel1,
    dispatch: d3.dispatch('slideChange', 'stepChange')
};

// Slide data and configurations
const SLIDES = [
    {
        id: 1,
        title: "Think tanks en tiempos turbulentos (2019–2023)",
        subtitle: "RODRIGO MOLINA ÁVILA (UCHILE-IDIA-IMFD) / MARCOS GONZÁLEZ HERNANDO (UDP-COES)",
        layout: 'grid-cols-[62%_38%]',
        type: 'cover'
    },
    {
        id: 2,
        title: "Intuición inicial",
        subtitle: "Think tanks como organizaciones híbridas sensibles al entorno",
        layout: 'grid-cols-[62%_38%]',
        type: 'field-diagram'
    },
    {
        id: 3,
        title: "Literatura relevante",
        subtitle: "Think tanks como organizaciones híbridas",
        layout: 'grid-cols-[38%_62%]',
        type: 'concept-graph'
    },
    {
        id: 4,
        title: "Preguntas de investigación",
        subtitle: "¿Cómo evolucionó la producción de think tanks entre 2019-2023?",
        layout: 'grid-cols-1',
        type: 'research-questions'
    },
    {
        id: 5,
        title: "Datos y métodos",
        subtitle: "29 think tanks, >17,000 intervenciones, 2019-2023",
        layout: 'grid-cols-[62%_38%]',
        type: 'data-methods'
    },
    {
        id: 6,
        title: "Webscraping",
        subtitle: "Recolección automatizada de datos",
        layout: 'grid-cols-1 md:grid-cols-[38%_62%]',
        type: 'webscraping'
    },
    {
        id: 7,
        title: "Nivel 1: Densidad por orientación política",
        subtitle: "Evolución temporal 2019-2023",
        layout: 'grid-cols-1',
        type: 'political-density'
    },
    {
        id: 8,
        title: "Nivel 2: Métodos NLP a través de Transfer Learning",
        subtitle: "Análisis temático y semántico",
        layout: 'grid-cols-1 md:grid-cols-3',
        type: 'nlp-analysis'
    },
    {
        id: 9,
        title: "Nivel 3: Zoom temático",
        subtitle: "Trayectorias finas de tópicos seleccionados",
        layout: 'grid-cols-2 lg:grid-cols-3',
        type: 'thematic-zoom'
    },
    {
        id: 10,
        title: "Implicancias",
        subtitle: "Consideraciones metodológicas",
        layout: 'grid-cols-1',
        type: 'processing-implications'
    },
    {
        id: 11,
        title: "Conclusiones",
        subtitle: "Takeaways y próximos pasos",
        layout: 'grid-cols-1',
        type: 'conclusions'
    }
];
// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeSlides();
    setupEventListeners();
    initializeBackgroundGraph();
    updateSlideIndicator();
});

function initializeSlides() {
    const container = document.getElementById('slides-container');
    container.innerHTML = SLIDES.map((slide, index) => generateSlideContent(slide, index)).join('');
    
    // Initialize first slide
    initializeD3Visualizations(0);
}

function generateSlideContent(slide, index) {
    const isActive = index === APP_STATE.currentSlide;
    
    switch(slide.type) {
        case 'cover':
            return generateCoverSlide(slide, index);
        case 'field-diagram':
            return generateFieldDiagramSlide(slide, index);
        case 'concept-graph':
            return generateConceptGraphSlide(slide, index);
        case 'research-questions':
            return generateResearchQuestionsSlide(slide, index);
        case 'data-methods':
            return generateDataMethodsSlide(slide, index);
        case 'webscraping':
            return generateWebscrapingSlide(slide, index);
        case 'political-density':
            return generatePoliticalDensitySlide(slide, index);
        case 'nlp-analysis':
            return generateNLPAnalysisSlide(slide, index);
        case 'thematic-zoom':
            return generateThematicZoomSlide(slide, index);
        case 'processing-implications':
            return generateProcessingImplicationsSlide(slide, index);
        case 'conclusions':
            return generateConclusionsSlide(slide, index);
        default:
            return generateDefaultSlide(slide, index);
    }
}
function generateCoverSlide(slide, index) {
    const gradientColors = APP_STATE.colorScheme.slice(0, 2);
    
    return `
        <div class="slide ${index === APP_STATE.currentSlide ? 'slide-animation' : ''}" 
             style="background: linear-gradient(135deg, ${gradientColors[0]}20 0%, ${gradientColors[1]}20 100%)">
            <div class="grid ${slide.layout} items-center w-full h-full max-w-7xl mx-auto">
                <div class="space-y-6">
                    <h1 class="text-5xl md:text-7xl font-bold leading-tight text-slate-100">
                        ${slide.title}
                    </h1>
                    <p class="text-lg opacity-80 text-slate-300 max-w-2xl">
                        Presentación XII Conferencia Internacional COES Octubre 2025
                    </p>
                    <div class="space-y-4 mt-8">
                        <div class="flex items-center gap-3">
                            <div class="w-4 h-4 rounded-full" style="background-color: ${gradientColors[0]}"></div>
                            <div>
                                <p class="font-semibold text-slate-100">Marcos González Hernando</p>
                                <p class="text-sm text-slate-400">Universidad Diego Portales - COES</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-4 h-4 rounded-full" style="background-color: ${gradientColors[1]}"></div>
                            <div>
                                <p class="font-semibold text-slate-100">Rodrigo Molina Ávila</p>
                                <p class="text-sm text-slate-400">Universidad de Chile - IDIA - IMFD</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center items-center">
                    <div class="w-48 h-48 rounded-full bg-slate-800/50 backdrop-blur-lg shadow-2xl flex items-center justify-center border border-slate-700">
                        <i data-feather="bar-chart-2" class="w-20 h-20 text-slate-300"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
}
function generateFieldDiagramSlide(slide, index) {
    return `
        <div class="slide ${index === APP_STATE.currentSlide ? 'slide-animation' : ''}">
            <div class="grid ${slide.layout} gap-6 w-full h-full max-w-7xl mx-auto p-10">
                <div class="chart-container aspect-golden p-6">
                    <div id="field-diagram-${index}" class="w-full h-full"></div>
                </div>
                <div class="space-y-6">
                    <h2 class="text-3xl font-bold text-slate-100">${slide.title}</h2>
                    <p class="text-slate-400">${slide.subtitle}</p>
                    <div class="space-y-4 text-slate-300">
                        <p>Los think tanks son organizaciones híbridas que operan en la intersección de campos—academia, política, medios, financiamiento.</p>
                        <p>Precisamente por ser híbridos, son sensibles a cambios en su ambiente.</p>
                        <p>Esto los vuelve indicadores privilegiados de transformaciones de:</p>
                        <ul class="list-disc pl-5 space-y-2">
                            <li>Qué actores producen conocimiento experto</li>
                            <li>Qué lenguajes se consideran legítimos</li>
                            <li>Quién tiene acceso a las plataformas para intervenir en el debate público</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}
function generateConceptGraphSlide(slide, index) {
    return `
        <div class="slide ${index === APP_STATE.currentSlide ? 'slide-animation' : ''}">
            <div class="grid ${slide.layout} gap-6 w-full h-full max-w-7xl mx-auto p-10">
                <div class="space-y-6">
                    <h2 class="text-3xl font-bold text-slate-100">${slide.title}</h2>
                    <p class="text-slate-400">${slide.subtitle}</p>
                    <div class="space-y-4">
                        <div class="p-4 rounded-lg bg-slate-800/50 backdrop-blur border border-slate-700">
                            <h3 class="font-semibold text-slate-100 mb-2">Think tanks como organizaciones híbridas</h3>
                            <div class="flex flex-wrap gap-2">
                                <span class="px-3 py-1 rounded-full text-sm" style="background-color: ${APP_STATE.colorScheme[0]}30; color: ${APP_STATE.colorScheme[0]}">Medvetz 2012</span>
                                <span class="px-3 py-1 rounded-full text-sm" style="background-color: ${APP_STATE.colorScheme[0]}30; color: ${APP_STATE.colorScheme[0]}">Stone</span>
                                <span class="px-3 py-1 rounded-full text-sm" style="background-color: ${APP_STATE.colorScheme[0]}30; color: ${APP_STATE.colorScheme[0]}">Dobry</span>
                            </div>
                            <p class="text-sm text-slate-400 mt-2">Organizaciones que operan en la intersección de campos (academia, política, medios, economía)</p>
                            <p class="text-sm text-slate-400 mt-1">Traducen capitales y lógicas entre estos campos, tienen una función de 'brokers' (Stone)</p>
                            <p class="text-sm text-slate-400 mt-1">¿Qué pasa cuando los campos mismos se desestabilizan? (Dobry)</p>
                        </div>
                        <div class="p-4 rounded-lg bg-slate-800/50 backdrop-blur border border-slate-700">
                            <h3 class="font-semibold text-slate-100 mb-2">Literatura chilena</h3>
                            <div class="flex flex-wrap gap-2">
                                <span class="px-3 py-1 rounded-full text-sm" style="background-color: ${APP_STATE.colorScheme[3]}30; color: ${APP_STATE.colorScheme[3]}">Puryear</span>
                                <span class="px-3 py-1 rounded-full text-sm" style="background-color: ${APP_STATE.colorScheme[3]}30; color: ${APP_STATE.colorScheme[3]}">Silva</span>
                                <span class="px-3 py-1 rounded-full text-sm" style="background-color: ${APP_STATE.colorScheme[3]}30; color: ${APP_STATE.colorScheme[3]}">Gárate</span>
                            </div>
                            <p class="text-sm text-slate-400 mt-2">Dictadura y transición bien estudiadas</p>
                            <p class="text-sm text-slate-400 mt-1">Poco sobre ciclos de vida durante crisis recientes (señalado por Cociña & Toro)</p>
                            <p class="text-sm text-slate-400 mt-1">Excepciones parciales: Alenda 2020, Dávila 2020, Cortés et al. 2023</p>
                        </div>
                        <div class="p-4 rounded-lg bg-slate-800/50 backdrop-blur border border-slate-700">
                            <h3 class="font-semibold text-slate-100 mb-2">Marco conceptual tentativo: infraestructura intelectual</h3>
                            <div class="flex flex-wrap gap-2">
                                <span class="px-3 py-1 rounded-full text-sm" style="background-color: ${APP_STATE.colorScheme[6]}30; color: ${APP_STATE.colorScheme[6]}">Condiciones materiales</span>
                                <span class="px-3 py-1 rounded-full text-sm" style="background-color: ${APP_STATE.colorScheme[6]}30; color: ${APP_STATE.colorScheme[6]}">Institucionales</span>
                            </div>
                            <p class="text-sm text-slate-400 mt-2">Condiciones materiales e institucionales que permiten intervenciones</p>
                            <p class="text-sm text-slate-400 mt-1">En Chile: financiamiento concentrado, medios oligopolizados, poco financiamiento internacional</p>
                        </div>
                    </div>
                </div>
                <div class="chart-container aspect-golden p-6">
                    <div id="concept-graph-${index}" class="w-full h-full"></div>
                </div>
            </div>
        </div>
    `;
}
function generateResearchQuestionsSlide(slide, index) {
    const questions = [
        "¿Cómo evolucionó la producción de think tanks entre 2019-2023? (volumen, frecuencia)",
        "¿Qué temas dominaron y cómo cambiaron? (agenda temática)",
        "¿Convergieron o divergieron semánticamente? (lenguajes compartidos vs. fragmentación)",
        "¿Qué nos dicen estos patrones sobre cómo se organiza la expertise durante transformación institucional en Chile?"
    ];
    
    return `
        <div class="slide ${index === APP_STATE.currentSlide ? 'slide-animation' : ''}">
            <div class="grid place-items-center w-full h-full max-w-5xl mx-auto p-10">
                <div class="text-center space-y-8">
                    <h2 class="text-4xl md:text-5xl font-bold text-slate-100">${slide.title}</h2>
                    <p class="text-xl text-slate-400">${slide.subtitle}</p>
                    <div class="space-y-6 mt-12">
                        ${questions.map((q, i) => `
                            <div class="research-question step-${i}" data-step="${i}">
                                <p class="text-2xl md:text-3xl text-slate-300 leading-relaxed">
                                    <span class="font-semibold" style="color: ${APP_STATE.colorScheme[i % APP_STATE.colorScheme.length]}">${i + 1}.</span> ${q}
                                </p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}
function generateDataMethodsSlide(slide, index) {
    return `
        <div class="slide ${index === APP_STATE.currentSlide ? 'slide-animation' : ''}">
            <div class="grid ${slide.layout} gap-6 w-full h-full max-w-7xl mx-auto p-10">
                <div class="chart-container aspect-golden p-6">
                    <div id="data-chart-${index}" class="w-full h-full"></div>
                </div>
                <div class="space-y-6">
                    <h2 class="text-3xl font-bold text-slate-100">${slide.title}</h2>
                    <p class="text-slate-400">${slide.subtitle}</p>
                    <div class="space-y-4">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style="background-color: ${APP_STATE.colorScheme[0]}">29</div>
                            <span class="text-slate-300">Think tanks analizados</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style="background-color: ${APP_STATE.colorScheme[1]}">17k+</div>
                            <span class="text-slate-300">Intervenciones públicas</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style="background-color: ${APP_STATE.colorScheme[2]}">5</div>
                            <span class="text-slate-300">Años de análisis (2019-2023)</span>
                        </div>
                        <div class="mt-6 p-4 rounded-lg bg-slate-800/50 backdrop-blur border border-slate-700">
                            <h3 class="font-semibold text-slate-100 mb-3">Tipos de textos incluidos</h3>
                            <p class="text-sm text-slate-400">Columnas, informes, boletines, podcasts, videos</p>
                        </div>
                        <div class="mt-6 p-4 rounded-lg bg-slate-800/50 backdrop-blur border border-slate-700">
                            <h3 class="font-semibold text-slate-100 mb-3">Niveles de análisis</h3>
                            <div class="space-y-2">
                                <div class="flex items-center gap-2">
                                    <div class="w-2 h-2 rounded-full" style="background-color: ${APP_STATE.colorScheme[3]}"></div>
                                    <span class="text-sm text-slate-300">Nivel 1: Volumen de publicaciones — Análisis descriptivo temporal — ¿Quién publicó cuándo?</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="w-2 h-2 rounded-full" style="background-color: ${APP_STATE.colorScheme[4]}"></div>
                                    <span class="text-sm text-slate-300">Nivel 2: Análisis temático y semántico (BERTopic & SBERT) — Identificación de actores y temas dominantes — Evolución temporal de agenda</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="w-2 h-2 rounded-full" style="background-color: ${APP_STATE.colorScheme[5]}"></div>
                                    <span class="text-sm text-slate-300">Nivel 3: Zoom in (BERT+) — Clustering y trayectorias temporales — Tratamiento de temáticas específicas</span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-6 p-4 rounded-lg bg-slate-800/50 backdrop-blur border border-slate-700">
                            <p class="text-sm text-slate-400">En último término: El corpus, con sus limitaciones, es un proxy importante de la producción de intervenciones de "opinión" y generación de evidencia "experta" en políticas públicas en Chile</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
function generateWebscrapingSlide(slide, index) {
    return `
        <div class="slide ${index === APP_STATE.currentSlide ? 'slide-animation' : ''}">
            <div class="grid ${slide.layout} gap-6 w-full h-full max-w-7xl mx-auto p-10">
                <div class="space-y-6">
                    <h2 class="text-3xl font-bold text-slate-100">${slide.title}</h2>
                    <p class="text-slate-400">${slide.subtitle}</p>
                    <div class="space-y-4">
                        <div class="p-4 rounded-lg bg-slate-800/50 backdrop-blur border border-slate-700">
                            <h3 class="font-semibold text-slate-100 mb-3">Webscrapping</h3>
                            <p class="text-sm text-slate-400">Recolección automatizada de datos de fuentes web</p>
                        </div>
                        <div class="p-4 rounded-lg bg-slate-800/50 backdrop-blur border border-slate-700">
                            <h3 class="font-semibold text-slate-100 mb-3">Fuentes principales</h3>
                            <div class="space-y-2">
                                <div class="flex items-center justify-between">
                                    <span class="text-slate-300">emol.com</span>
                                    <span class="text-sm text-slate-500">3,245 artículos</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-slate-300">latercera.com</span>
                                    <span class="text-sm text-slate-500">2,891 artículos</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-slate-300">biobiochile.cl</span>
                                    <span class="text-sm text-slate-500">2,156 artículos</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-slate-300">cooperativa.cl</span>
                                    <span class="text-sm text-slate-500">1,987 artículos</span>
                                </div>
                            </div>
                        </div>
                        <div class="p-4 rounded-lg bg-slate-800/50 backdrop-blur border border-slate-700">
                            <h3 class="font-semibold text-slate-100 mb-2">Reproducibilidad</h3>
                            <p class="text-sm text-slate-400">Código disponible en GitHub con scripts de scraping y procesamiento</p>
                            <p class="text-sm text-slate-400 mt-1">Datos + colabs disponibles</p>
                        </div>
                    </div>
                </div>
                <div class="chart-container aspect-golden p-6">
                    <div id="webscraping-chart-${index}" class="w-full h-full"></div>
                </div>
            </div>
        </div>
    `;
}
function generatePoliticalDensitySlide(slide, index) {
    return `
        <div class="slide ${index === APP_STATE.currentSlide ? 'slide-animation' : ''}">
            <div class="grid place-items-center w-full h-full max-w-7xl mx-auto p-10">
                <div class="w-full space-y-6">
                    <div class="text-center">
                        <h2 class="text-4xl font-bold text-slate-100">${slide.title}</h2>
                        <p class="text-xl text-slate-400 mt-2">${slide.subtitle}</p>
                    </div>
                    <div class="chart-container aspect-golden p-6">
                        <div id="density-chart-${index}" class="w-full h-full"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
function generateNLPAnalysisSlide(slide, index) {
    return `
        <div class="slide ${index === APP_STATE.currentSlide ? 'slide-animation' : ''}">
            <div class="grid ${slide.layout} gap-6 w-full h-full max-w-7xl mx-auto p-10">
                <div class="text-center">
                    <h2 class="text-3xl font-bold text-slate-100">${slide.title}</h2>
                    <p class="text-lg text-slate-400">${slide.subtitle}</p>
                </div>
                <div class="chart-container aspect-square p-4">
                    <div id="umap-chart-${index}" class="w-full h-full"></div>
                </div>
                <div class="chart-container aspect-square p-4">
                    <div id="heatmap-chart-${index}" class="w-full h-full"></div>
                </div>
                <div class="chart-container aspect-square p-4">
                    <div id="sankey-chart-${index}" class="w-full h-full"></div>
                </div>
            </div>
        </div>
    `;
}
function generateThematicZoomSlide(slide, index) {
    return `
        <div class="slide ${index === APP_STATE.currentSlide ? 'slide-animation' : ''}">
            <div class="grid ${slide.layout} gap-4 w-full h-full max-w-7xl mx-auto p-10">
                <div class="col-span-full text-center">
                    <h2 class="text-3xl font-bold text-slate-100">${slide.title}</h2>
                    <p class="text-lg text-slate-400">${slide.subtitle}</p>
                </div>
                ${[1,2,3,4,5,6].map(i => `
                    <div class="chart-container p-4">
                        <div id="thematic-${i}-${index}" class="w-full h-full"></div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}
function generateProcessingImplicationsSlide(slide, index) {
    return `
        <div class="slide ${index === APP_STATE.currentSlide ? 'slide-animation' : ''}">
            <div class="grid place-items-center w-full h-full max-w-5xl mx-auto p-10">
                <div class="w-full space-y-8">
                    <div class="text-center">
                        <h2 class="text-4xl font-bold text-slate-100">${slide.title}</h2>
                        <p class="text-xl text-slate-400 mt-2">${slide.subtitle}</p>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="border-b border-slate-700">
                                    <th class="text-left p-3 text-slate-300">Consideraciones</th>
                                    <th class="text-left p-3 text-slate-300">Detalles</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b border-slate-800">
                                    <td class="p-3 text-slate-400">Procesamiento</td>
                                    <td class="p-3 text-slate-300">Preprocesamiento: se procesa título + contenido página web + pdf o descargable que tenga</td>
                                </tr>
                                <tr class="border-b border-slate-800">
                                    <td class="p-3 text-slate-400">Hiperparámetros</td>
                                    <td class="p-3 text-slate-300">Configuración de modelos y parámetros específicos</td>
                                </tr>
                                <tr class="border-b border-slate-800">
                                    <td class="p-3 text-slate-400">Stopwords</td>
                                    <td class="p-3 text-slate-300">Personalización de listas de palabras clave</td>
                                </tr>
                                <tr class="border-b border-slate-800">
                                    <td class="p-3 text-slate-400">Acceso</td>
                                    <td class="p-3 text-slate-300">Restricciones y limitaciones de acceso a datos</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}
function generateConclusionsSlide(slide, index) {
    const conclusions = [
        "Los think tanks chilenos han experimentado una transformación significativa durante el período 2019-2023",
        "La hibridación de roles es la característica dominante del período analizado",
        "El contexto político influye directamente en las estrategias de comunicación y agenda temática",
        "La infraestructura intelectual en Chile presenta desafíos para la diversidad de voces",
        "Necesidad de marcos teóricos adaptados al contexto latinoamericano y a los ciclos de crisis"
    ];
    
    return `
        <div class="slide ${index === APP_STATE.currentSlide ? 'slide-animation' : ''}">
            <div class="grid place-items-center w-full h-full max-w-5xl mx-auto p-10">
                <div class="text-center space-y-8">
                    <h2 class="text-5xl font-bold text-slate-100">${slide.title}</h2>
                    <p class="text-xl text-slate-400">${slide.subtitle}</p>
                    <div class="space-y-6 mt-12">
                        ${conclusions.map((c, i) => `
                            <div class="p-6 rounded-xl bg-slate-800/50 backdrop-blur border-l-4" style="border-color: ${APP_STATE.colorScheme[i % APP_STATE.colorScheme.length]}">
                                <p class="text-xl text-slate-300 leading-relaxed">${c}</p>
                            </div>
                        `).join('')}
                    </div>
                    <div class="mt-12">
                        <button class="px-8 py-4 rounded-2xl font-semibold text-slate-100 transition-all duration-300 hover:scale-105" style="background: linear-gradient(135deg, ${APP_STATE.colorScheme[0]}, ${APP_STATE.colorScheme[1]})">
                            Próximos pasos →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
function generateDefaultSlide(slide, index) {
    return `
        <div class="slide ${index === APP_STATE.currentSlide ? 'slide-animation' : ''}">
            <div class="grid place-items-center w-full h-full">
                <h2 class="text-4xl font-bold text-slate-100">${slide.title}</h2>
            </div>
        </div>
    `;
}

function setupEventListeners() {
    // Navigation buttons
    document.getElementById('prev-btn').addEventListener('click', goToPreviousSlide);
    document.getElementById('next-btn').addEventListener('click', goToNextSlide);
    document.getElementById('fullscreen-btn').addEventListener('click', toggleFullscreen);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goToPreviousSlide();
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goToNextSlide();
        if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    });
    
    // Touch gestures for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
        if (Math.abs(diffX) > 50 || Math.abs(diffY) > 50) {
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 0) goToPreviousSlide();
                else goToNextSlide();
            } else {
                if (diffY > 0) goToPreviousSlide();
                else goToNextSlide();
            }
        }
    });
}

function goToNextSlide() {
    if (APP_STATE.currentSlide < APP_STATE.totalSlides - 1) {
        APP_STATE.currentSlide++;
        updateSlide();
    }
}

function goToPreviousSlide() {
    if (APP_STATE.currentSlide > 0) {
        APP_STATE.currentSlide--;
        updateSlide();
    }
}

function updateSlide() {
    const container = document.getElementById('slides-container');
    const offset = -APP_STATE.currentSlide * 100;
    container.style.transform = `translateX(${offset}vw)`;
    
    updateSlideIndicator();
    updateSlideCounter();
    
    // Initialize D3 visualizations for the current slide
    setTimeout(() => {
        initializeD3Visualizations(APP_STATE.currentSlide);
        feather.replace();
    }, 700);
    
    APP_STATE.dispatch.call('slideChange', this, APP_STATE.currentSlide);
}

function updateSlideIndicator() {
    const dotsContainer = document.getElementById('dots-container');
    dotsContainer.innerHTML = SLIDES.map((_, index) => 
        `<div class="slide-dot ${index === APP_STATE.currentSlide ? 'active' : ''}" data-slide="${index}"></div>`
    ).join('');
    
    // Add click listeners to dots
    dotsContainer.querySelectorAll('.slide-dot').forEach(dot => {
        dot.addEventListener('click', function() {
            APP_STATE.currentSlide = parseInt(this.dataset.slide);
            updateSlide();
        });
    });
}

function updateSlideCounter() {
    document.getElementById('slide-counter').textContent = 
        `${APP_STATE.currentSlide + 1}/${APP_STATE.totalSlides}`;
}

function toggleFullscreen() {
    const app = document.getElementById('app');
    
    if (!APP_STATE.isFullscreen) {
        if (app.requestFullscreen) {
            app.requestFullscreen();
        }
        APP_STATE.isFullscreen = true;
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        APP_STATE.isFullscreen = false;
    }
}

function initializeBackgroundGraph() {
    const svg = d3.select('#bg-svg');
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    svg.attr('width', width).attr('height', height);
    
    // Create a simple network graph as background
    const nodes = Array.from({length: 20}, (_, i) => ({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1
    }));
    
    const links = Array.from({length: 30}, () => ({
        source: Math.floor(Math.random() * nodes.length),
        target: Math.floor(Math.random() * nodes.length)
    }));
    
    const link = svg.selectAll('.bg-link')
        .data(links)
        .enter().append('line')
        .attr('class', 'bg-link graph-link')
        .attr('x1', d => nodes[d.source].x)
        .attr('y1', d => nodes[d.source].y)
        .attr('x2', d => nodes[d.target].x)
        .attr('y2', d => nodes[d.target].y);
    
    const node = svg.selectAll('.bg-node')
        .data(nodes)
        .enter().append('circle')
        .attr('class', 'bg-node graph-node')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => d.radius);
    
    // Animate nodes
    function animateNodes() {
        node.transition()
            .duration(10000)
            .attr('cx', d => d.x + (Math.random() - 0.5) * 100)
            .attr('cy', d => d.y + (Math.random() - 0.5) * 100)
            .on('end', animateNodes);
    }
    
    animateNodes();
}

function initializeD3Visualizations(slideIndex) {
    const slide = SLIDES[slideIndex];
    
    switch(slide.type) {
        case 'field-diagram':
            initializeFieldDiagram(slideIndex);
            break;
        case 'concept-graph':
            initializeConceptGraph(slideIndex);
            break;
        case 'data-methods':
            initializeDataChart(slideIndex);
            break;
        case 'webscraping':
            initializeWebscrapingChart(slideIndex);
            break;
        case 'political-density':
            initializeDensityChart(slideIndex);
            break;
        case 'nlp-analysis':
            initializeNLPCharts(slideIndex);
            break;
        case 'thematic-zoom':
            initializeThematicCharts(slideIndex);
            break;
        case 'research-questions':
            initializeResearchQuestions(slideIndex);
            break;
    }
}
function initializeFieldDiagram(slideIndex) {
    const container = d3.select(`#field-diagram-${slideIndex}`);
    const width = container.node().getBoundingClientRect().width;
    const height = container.node().getBoundingClientRect().height;
    
    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', '0 0 900 560')
        .attr('class', 'rounded-2xl bg-white/5 shadow-soft');
    
    // Create zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([0.8, 3])
        .on('zoom', function(event) {
            g.attr('transform', event.transform);
        });
    
    svg.call(zoom);
    
    const g = svg.append('g');
    
    // Define fields
    const fields = [
        { id: "knowledge", label: "FIELD OF KNOWLEDGE\nPRODUCTION", x: 10,  y: 50,  w: 380, h: 400, c: APP_STATE.colorScheme[1] },
        { id: "political", label: "POLITICAL FIELD",                 x: 180, y: 10,  w: 480, h: 320, c: APP_STATE.colorScheme[2] },
        { id: "economic",  label: "ECONOMIC FIELD",                  x: 500, y: 50,  w: 380, h: 400, c: APP_STATE.colorScheme[3] },
        { id: "media",     label: "MEDIA FIELD",                     x: 260, y: 330, w: 380, h: 220, c: APP_STATE.colorScheme[4] },
    ];

    // Define actors
    const actors = [
        { label:"University", x:170, y:160 }, 
        { label:"Public policy school", x:280, y:200 },
        { label:"Academic policy\nresearch inst", x:260, y:260 },
        { label:"State agency", x:450, y:160 }, 
        { label:"Party", x:470, y:200 },
        { label:"Social move. org", x:510, y:235 }, 
        { label:"Lobbying firm", x:620, y:260 },
        { label:"Trade association", x:580, y:310 }, 
        { label:"Business corporation\nLabor union", x:720, y:230 },
        { label:"Policy journal\nPolitical \"blogosphere\"", x:420, y:360 },
        { label:"Newspaper", x:360, y:450 }, 
        { label:"Commercial magazine", x:560, y:450 },
        { label:"Journalism school", x:280, y:430 }
    ];
    
    // Draw field rectangles with mix-blend-mode effect
    const fieldG = g.append("g").attr("style", "mix-blend-mode:multiply");
    fieldG.selectAll("g.f")
        .data(fields)
        .join((enter) => {
            const fg = enter.append("g").attr("class", d => `f ${d.id}`);
            fg.append("rect")
                .attr("x", d => d.x)
                .attr("y", d => d.y)
                .attr("width", d => d.w)
                .attr("height", d => d.h)
                .attr("rx", 8)
                .attr("ry", 8)
                .attr("fill", d => d.c)
                .attr("fill-opacity", .65)
                .attr("stroke", "#1f2937");
            fg.append("text")
                .attr("x", d => d.x + 8)
                .attr("y", d => d.y - 8)
                .attr("fill", "#111827")
                .attr("font-size", 12)
                .text(d => d.label);
            return fg;
        });
    
    // Draw central diamond
    const cx = 450, cy = 300, dw = 170, dh = 150;
    g.append("polygon")
        .attr("points", [[cx, cy-dh/2],[cx+dw/2,cy],[cx,cy+dh/2],[cx-dw/2,cy]].map(p=>p.join(",")).join(" "))
        .attr("fill","none")
        .attr("stroke","#1f2937")
        .attr("stroke-dasharray","7,5")
        .attr("stroke-width",2);

    g.append("text")
        .attr("x", cx)
        .attr("y", cy)
        .attr("text-anchor", "middle")
        .attr("font-weight", 700)
        .attr("class", "graph-label")
        .text("Space of\nthink tanks");

    // Draw actors
    const actorGroup = g.append("g").selectAll("g.actor")
        .data(actors)
        .join("g")
        .attr("class","actor")
        .attr("transform", d => `translate(${d.x},${d.y})`)
        .style("cursor","default");

    actorGroup.append("circle")
        .attr("r", 4)
        .attr("fill", "#111827");
        
    actorGroup.append("text")
        .attr("x", 8)
        .attr("y", 0)
        .attr("dominant-baseline","middle")
        .attr("class", "graph-label")
        .attr("font-size",12)
        .text(d=>d.label);
}
function initializeConceptGraph(slideIndex) {
    const container = d3.select(`#concept-graph-${slideIndex}`);
    const width = container.node().getBoundingClientRect().width;
    const height = container.node().getBoundingClientRect().height;
    
    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Define nodes and links
    const nodes = [
        {id: 'medvetz', group: 0, label: 'Medvetz 2012'},
        {id: 'stone', group: 0, label: 'Stone'},
        {id: 'dobry', group: 0, label: 'Dobry'},
        {id: 'puryear', group: 1, label: 'Puryear'},
        {id: 'silva', group: 1, label: 'Silva'},
        {id: 'garate', group: 1, label: 'Gárate'},
        {id: 'redes', group: 2, label: 'Redes'},
        {id: 'financiamiento', group: 2, label: 'Financiamiento'},
        {id: 'hibridos', group: 0, label: 'Híbridos'},
        {id: 'chile', group: 1, label: 'Chile'},
        {id: 'infraestructura', group: 2, label: 'Infraestructura'}
    ];
    
    const links = [
        {source: 'medvetz', target: 'hibridos'},
        {source: 'stone', target: 'hibridos'},
        {source: 'dobry', target: 'hibridos'},
        {source: 'puryear', target: 'chile'},
        {source: 'silva', target: 'chile'},
        {source: 'garate', target: 'chile'},
        {source: 'redes', target: 'infraestructura'},
        {source: 'financiamiento', target: 'infraestructura'},
        {source: 'hibridos', target: 'chile'},
        {source: 'chile', target: 'infraestructura'}
    ];
    
    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(80))
        .force('charge', d3.forceManyBody().strength(-200))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(30));
    
    // Add arrow markers
    svg.append('defs').selectAll('marker')
        .data(['end'])
        .enter().append('marker')
        .attr('id', d => d)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 20)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#64748b');
    
    // Draw links
    const link = svg.append('g')
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('class', 'graph-link')
        .attr('marker-end', 'url(#end)');
    
    // Draw nodes
    const node = svg.append('g')
        .selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('class', 'graph-node')
        .attr('r', 20)
        .attr('fill', d => APP_STATE.colorScheme[d.group])
        .on('click', function(event, d) {
            console.log('Clicked node:', d.label);
        })
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));
    
    // Add labels
    const label = svg.append('g')
        .selectAll('text')
        .data(nodes)
        .enter().append('text')
        .attr('class', 'graph-label')
        .attr('text-anchor', 'middle')
        .attr('dy', 35)
        .text(d => d.label);
    
    // Update positions on simulation tick
    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
        
        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
        
        label
            .attr('x', d => d.x)
            .attr('y', d => d.y);
    });
    
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    
    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}
function initializeDataChart(slideIndex) {
    const container = d3.select(`#data-chart-${slideIndex}`);
    const width = container.node().getBoundingClientRect().width;
    const height = container.node().getBoundingClientRect().height;
    const margin = {top: 40, right: 40, bottom: 60, left: 60};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height);
    
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Sample data for stacked bar chart
    const data = [
        {year: '2019', academic: 2450, political: 1890, media: 1234, social: 876},
        {year: '2020', academic: 3120, political: 2340, media: 1567, social: 1234},
        {year: '2021', academic: 3890, political: 3456, media: 2234, social: 1876},
        {year: '2022', academic: 4234, political: 3890, media: 2678, social: 2345},
        {year: '2023', academic: 4567, political: 4123, media: 2987, social: 2654}
    ];
    
    const keys = ['academic', 'political', 'media', 'social'];
    
    // Create stack
    const stack = d3.stack()
        .keys(keys)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);
    
    const series = stack(data);
    
    // Create scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.year))
        .range([0, innerWidth])
        .padding(0.1);
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.academic + d.political + d.media + d.social)])
        .nice()
        .range([innerHeight, 0]);
    
    const colorScale = d3.scaleOrdinal()
        .domain(keys)
        .range(APP_STATE.colorScheme);
    
    // Create tooltip
    const tooltip = d3.select('body').append('div')
        .attr('class', 'd3-tooltip')
        .style('opacity', 0);
    
    // Draw bars
    g.selectAll('.serie')
        .data(series)
        .enter().append('g')
        .attr('class', 'serie')
        .attr('fill', d => colorScale(d.key))
        .selectAll('rect')
        .data(d => d)
        .enter().append('rect')
        .attr('x', d => xScale(d.data.year))
        .attr('y', d => yScale(d[1]))
        .attr('height', d => yScale(d[0]) - yScale(d[1]))
        .attr('width', xScale.bandwidth())
        .on('mouseover', function(event, d) {
            const total = d.data.academic + d.data.political + d.data.media + d.data.social;
            tooltip.transition()
                .duration(200)
                .style('opacity', .9);
            tooltip.html(`Total: ${total.toLocaleString()} intervenciones`)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', function() {
            tooltip.transition()
                .duration(500)
                .style('opacity', 0);
        });
    
    // Add axes
    g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .style('fill', '#94a3b8');
    
    g.append('g')
        .call(d3.axisLeft(yScale))
        .selectAll('text')
        .style('fill', '#94a3b8');
    
    // Add axis labels
    g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x', 0 - (innerHeight / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .style('fill', '#94a3b8')
        .text('Intervenciones');
    
    // Add legend
    const legend = g.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 12)
        .attr('text-anchor', 'start')
        .selectAll('g')
        .data(keys)
        .enter().append('g')
        .attr('transform', (d, i) => `translate(0,${i * 20})`);
    
    legend.append('rect')
        .attr('x', innerWidth - 100)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', colorScale);
    
    legend.append('text')
        .attr('x', innerWidth - 80)
        .attr('y', 9.5)
        .attr('dy', '0.32em')
        .style('fill', '#94a3b8')
        .text(d => {
            const labels = {academic: 'Académico', political: 'Político', media: 'Mediático', social: 'Social'};
            return labels[d];
        });
}
function initializeWebscrapingChart(slideIndex) {
    const container = d3.select(`#webscraping-chart-${slideIndex}`);
    const width = container.node().getBoundingClientRect().width;
    const height = container.node().getBoundingClientRect().height;
    
    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Create circle packing data
    const data = {
        name: 'sources',
        children: [
            {
                name: 'emol.com',
                value: 3245,
                domain: 'news'
            },
            {
                name: 'latercera.com',
                value: 2891,
                domain: 'news'
            },
            {
                name: 'biobiochile.cl',
                value: 2156,
                domain: 'news'
            },
            {
                name: 'cooperativa.cl',
                value: 1987,
                domain: 'radio'
            },
            {
                name: 'ciperchile.cl',
                value: 1234,
                domain: 'digital'
            },
            {
                name: 'eldinamo.cl',
                value: 987,
                domain: 'digital'
            }
        ]
    };
    
    // Create hierarchy
    const root = d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);
    
    // Create pack layout
    const pack = d3.pack()
        .size([width, height])
        .padding(10);
    
    pack(root);
    
    // Create color scale by domain
    const colorScale = d3.scaleOrdinal()
        .domain(['news', 'radio', 'digital'])
        .range([APP_STATE.colorScheme[1], APP_STATE.colorScheme[3], APP_STATE.colorScheme[5]]);
    
    // Create tooltip
    const tooltip = d3.select('body').append('div')
        .attr('class', 'd3-tooltip')
        .style('opacity', 0);
    
    // Draw circles
    const node = svg.selectAll('.node')
        .data(root.leaves())
        .enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x},${d.y})`);
    
    node.append('circle')
        .attr('r', d => d.r)
        .attr('fill', d => colorScale(d.data.domain))
        .attr('fill-opacity', 0.7)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .on('mouseover', function(event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('fill-opacity', 0.9);
            
            tooltip.transition()
                .duration(200)
                .style('opacity', .9);
            tooltip.html(`${d.data.name}<br/>${d.value.toLocaleString()} artículos`)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', function(event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('fill-opacity', 0.7);
            
            tooltip.transition()
                .duration(500)
                .style('opacity', 0);
        })
        .on('click', function(event, d) {
            window.open(`https://${d.data.name}`, '_blank');
        });
    
    // Add labels
    node.append('text')
        .attr('class', 'graph-label')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.3em')
        .style('font-size', d => Math.min(d.r / 3, 14) + 'px')
        .text(d => d.data.name.split('.')[0]);
}
function initializeDensityChart(slideIndex) {
    const container = d3.select(`#density-chart-${slideIndex}`);
    const width = container.node().getBoundingClientRect().width;
    const height = container.node().getBoundingClientRect().height;
    const margin = {top: 40, right: 40, bottom: 60, left: 60};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height);
    
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Sample data for stacked area chart
    const data = [
        {month: '2019-01', left: 120, center_left: 180, center: 240, center_right: 160, right: 100},
        {month: '2019-06', left: 140, center_left: 200, center: 260, center_right: 180, right: 120},
        {month: '2019-12', left: 180, center_left: 240, center: 320, center_right: 220, right: 140},
        {month: '2020-06', left: 200, center_left: 280, center: 380, center_right: 260, right: 160},
        {month: '2020-12', left: 240, center_left: 320, center: 420, center_right: 300, right: 180},
        {month: '2021-06', left: 280, center_left: 360, center: 460, center_right: 340, right: 200},
        {month: '2021-12', left: 320, center_left: 400, center: 500, center_right: 380, right: 240},
        {month: '2022-06', left: 340, center_left: 420, center: 520, center_right: 400, right: 260},
        {month: '2022-12', left: 360, center_left: 440, center: 540, center_right: 420, right: 280},
        {month: '2023-06', left: 380, center_left: 460, center: 560, center_right: 440, right: 300},
        {month: '2023-12', left: 400, center_left: 480, center: 580, center_right: 460, right: 320}
    ];
    
    const keys = ['left', 'center_left', 'center', 'center_right', 'right'];
    
    // Create stack
    const stack = d3.stack()
        .keys(keys)
        .order(d3.stackOrderInsideOut)
        .offset(d3.stackOffsetNone);
    
    const series = stack(data);
    
    // Create scales
    const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => new Date(d.month)))
        .range([0, innerWidth]);
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => keys.reduce((sum, key) => sum + d[key], 0))])
        .nice()
        .range([innerHeight, 0]);
    
    const colorScale = d3.scaleOrdinal()
        .domain(keys)
        .range([APP_STATE.colorScheme[0], APP_STATE.colorScheme[1], APP_STATE.colorScheme[2], APP_STATE.colorScheme[3], APP_STATE.colorScheme[4]]);
    
    // Create area generator
    const area = d3.area()
        .x(d => xScale(new Date(d.data.month)))
        .y0(d => yScale(d[0]))
        .y1(d => yScale(d[1]))
        .curve(d3.curveMonotoneX);
    
    // Draw areas
    g.selectAll('.area')
        .data(series)
        .enter().append('path')
        .attr('class', 'area')
        .attr('d', area)
        .attr('fill', d => colorScale(d.key))
        .attr('fill-opacity', 0.7);
    
    // Add axes
    g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%Y-%m')))
        .selectAll('text')
        .style('fill', '#94a3b8');
    
    g.append('g')
        .call(d3.axisLeft(yScale))
        .selectAll('text')
        .style('fill', '#94a3b8');
    
    // Create brush for detailed exploration
    const brush = d3.brushX()
        .extent([[0, 0], [innerWidth, innerHeight]])
        .on('brush end', brushed);
    
    g.append('g')
        .attr('class', 'brush')
        .call(brush);
    
    function brushed(event) {
        if (event.selection) {
            const [x0, x1] = event.selection.map(xScale.invert);
            // Handle brush selection
            console.log('Brushed range:', x0, x1);
        }
    }
    
    // Add legend
    const legend = g.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 12)
        .attr('text-anchor', 'start')
        .selectAll('g')
        .data(keys)
        .enter().append('g')
        .attr('transform', (d, i) => `translate(0,${i * 20})`);
    
    legend.append('rect')
        .attr('x', innerWidth - 120)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', colorScale);
    
    legend.append('text')
        .attr('x', innerWidth - 100)
        .attr('y', 9.5)
        .attr('dy', '0.32em')
        .style('fill', '#94a3b8')
        .text(d => {
            const labels = {
                left: 'Izquierda', 
                center_left: 'Centro-izquierda', 
                center: 'Centro', 
                center_right: 'Centro-derecha', 
                right: 'Derecha'
            };
            return labels[d];
        });
}
function initializeNLPCharts(slideIndex) {
    // Initialize UMAP scatter plot
    initializeUMAPChart(slideIndex);
    
    // Initialize heatmap
    initializeHeatmapChart(slideIndex);
    
    // Initialize sankey diagram
    initializeSankeyChart(slideIndex);
}

function initializeUMAPChart(slideIndex) {
    const container = d3.select(`#umap-chart-${slideIndex}`);
    const width = container.node().getBoundingClientRect().width;
    const height = container.node().getBoundingClientRect().height;
    
    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Generate sample UMAP data
    const points = Array.from({length: 100}, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        topic: Math.floor(Math.random() * 8),
        relevance: Math.random()
    }));
    
    // Create quadtree for efficient hover detection
    const quadtree = d3.quadtree()
        .x(d => d.x)
        .y(d => d.y)
        .addAll(points);
    
    // Create scales
    const xScale = d3.scaleLinear()
        .domain([0, width])
        .range([0, width]);
    
    const yScale = d3.scaleLinear()
        .domain([0, height])
        .range([height, 0]);
    
    const colorScale = d3.scaleOrdinal()
        .domain(d3.range(8))
        .range(APP_STATE.colorScheme);
    
    // Create zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([0.5, 5])
        .on('zoom', function(event) {
            svg.select('g').attr('transform', event.transform);
        });
    
    svg.call(zoom);
    
    const g = svg.append('g');
    
    // Draw points
    const point = g.selectAll('.point')
        .data(points)
        .enter().append('circle')
        .attr('class', 'point')
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('r', d => 3 + d.relevance * 5)
        .attr('fill', d => colorScale(d.topic))
        .attr('fill-opacity', 0.7)
        .on('mouseover', function(event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('r', d => 6 + d.relevance * 8)
                .attr('fill-opacity', 0.9);
        })
        .on('mouseout', function(event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('r', d => 3 + d.relevance * 5)
                .attr('fill-opacity', 0.7);
        });
    
    // Add labels for high relevance points
    g.selectAll('.label')
        .data(points.filter(d => d.relevance > 0.8))
        .enter().append('text')
        .attr('class', 'graph-label')
        .attr('x', d => xScale(d.x))
        .attr('y', d => yScale(d.y) - 10)
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .text(d => `Topic ${d.topic}`);
}
function initializeHeatmapChart(slideIndex) {
    const container = d3.select(`#heatmap-chart-${slideIndex}`);
    const width = container.node().getBoundingClientRect().width;
    const height = container.node().getBoundingClientRect().height;
    const margin = {top: 40, right: 40, bottom: 60, left: 60};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height);
    
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Generate sample similarity matrix
    const topics = ['Economía', 'Política', 'Social', 'Medioambiente', 'Educación', 'Salud', 'Seguridad', 'Tecnología'];
    const matrix = topics.map((topic1, i) => 
        topics.map((topic2, j) => ({
            row: i,
            col: j,
            value: i === j ? 1 : Math.random() * 0.8
        }))
    ).flat();
    
    // Create scales
    const xScale = d3.scaleBand()
        .domain(topics)
        .range([0, innerWidth])
        .padding(0.01);
    
    const yScale = d3.scaleBand()
        .domain(topics)
        .range([0, innerHeight])
        .padding(0.01);
    
    const colorScale = d3.scaleSequential(d3.interpolateViridis)
        .domain([0, 1]);
    
    // Draw heatmap cells
    g.selectAll('.cell')
        .data(matrix)
        .enter().append('rect')
        .attr('class', 'cell')
        .attr('x', d => xScale(topics[d.col]))
        .attr('y', d => yScale(topics[d.row]))
        .attr('width', xScale.bandwidth())
        .attr('height', yScale.bandwidth())
        .attr('fill', d => colorScale(d.value))
        .on('mouseover', function(event, d) {
            d3.select(this)
                .attr('stroke', '#fff')
                .attr('stroke-width', 2);
        })
        .on('mouseout', function(event, d) {
            d3.select(this)
                .attr('stroke', 'none');
        });
    
    // Add axes
    g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .style('fill', '#94a3b8')
        .attr('transform', 'rotate(-45)')
        .attr('text-anchor', 'end');
    
    g.append('g')
        .call(d3.axisLeft(yScale))
        .selectAll('text')
        .style('fill', '#94a3b8');
}
function initializeSankeyChart(slideIndex) {
    const container = d3.select(`#sankey-chart-${slideIndex}`);
    const width = container.node().getBoundingClientRect().width;
    const height = container.node().getBoundingClientRect().height;
    const margin = {top: 20, right: 20, bottom: 20, left: 20};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height);
    
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Add title
    g.append('text')
        .attr('x', innerWidth/2)
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .attr('class', 'graph-label')
        .style('font-size', '14px')
        .text('Similitud coseno entre documentos');
    
    // Add explanation
    g.append('text')
        .attr('x', innerWidth/2)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .attr('class', 'graph-label')
        .style('font-size', '12px')
        .style('fill', '#94a3b8')
        .text('Medida de proximidad semántica');
    
    // Add placeholder visualization
    const nodes = [
        {name: 'Economía', x: 50, y: 50},
        {name: 'Política', x: 50, y: 150},
        {name: 'Social', x: 50, y: 250},
        {name: 'TT Liberal', x: innerWidth - 100, y: 100},
        {name: 'TT Progresista', x: innerWidth - 100, y: 200}
    ];
    
    const links = [
        {source: 0, target: 3, value: 30},
        {source: 0, target: 4, value: 20},
        {source: 1, target: 3, value: 25},
        {source: 1, target: 4, value: 35},
        {source: 2, target: 3, value: 15},
        {source: 2, target: 4, value: 40}
    ];
    
    // Create color scale
    const colorScale = d3.scaleOrdinal()
        .domain(nodes.map(d => d.name))
        .range(APP_STATE.colorScheme);
    
    // Draw links
    g.append('g')
        .selectAll('.link')
        .data(links)
        .enter().append('path')
        .attr('class', 'link')
        .attr('d', d => {
            const sourceNode = nodes[d.source];
            const targetNode = nodes[d.target];
            return `M${sourceNode.x + 50},${sourceNode.y + 10} C${(sourceNode.x + targetNode.x)/2},${sourceNode.y + 10} ${(sourceNode.x + targetNode.x)/2},${targetNode.y + 10} ${targetNode.x},${targetNode.y + 10}`;
        })
        .attr('stroke', '#64748b')
        .attr('stroke-opacity', 0.3)
        .attr('stroke-width', d => Math.max(1, d.value/5))
        .attr('fill', 'none');
    
    // Draw nodes
    g.append('g')
        .selectAll('.node')
        .data(nodes)
        .enter().append('rect')
        .attr('class', 'node')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('height', 20)
        .attr('width', 80)
        .attr('fill', d => colorScale(d.name))
        .attr('rx', 3)
        .attr('ry', 3);
    
    // Add labels
    g.append('g')
        .selectAll('.label')
        .data(nodes)
        .enter().append('text')
        .attr('class', 'graph-label')
        .attr('x', d => d.x + 40)
        .attr('y', d => d.y + 15)
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .text(d => d.name);
}
function initializeThematicCharts(slideIndex) {
    // Initialize multiple small multiples
    for (let i = 1; i <= 6; i++) {
        initializeThematicChart(slideIndex, i);
    }
}

function initializeThematicChart(slideIndex, chartIndex) {
    const container = d3.select(`#thematic-${chartIndex}-${slideIndex}`);
    const width = container.node().getBoundingClientRect().width;
    const height = container.node().getBoundingClientRect().height;
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height);
    
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Generate sample time series data for different topics
    const topics = [
        'Política constitucional',
        'Economía y finanzas',
        'Derechos sociales',
        'Medio ambiente',
        'Seguridad ciudadana',
        'Educación superior'
    ];
    
    const data = Array.from({length: 12}, (_, i) => ({
        month: i + 1,
        value: Math.sin(i / 2 + chartIndex) * 30 + Math.random() * 20 + 50,
        relevance: Math.random()
    }));
    
    // Create scales
    const xScale = d3.scaleLinear()
        .domain([1, 12])
        .range([0, innerWidth]);
    
    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([innerHeight, 0]);
    
    // Create line generator
    const line = d3.line()
        .x(d => xScale(d.month))
        .y(d => yScale(d.value))
        .curve(d3.curveMonotoneX);
    
    // Draw line
    g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', APP_STATE.colorScheme[chartIndex - 1])
        .attr('stroke-width', 2)
        .attr('d', line);
    
    // Draw points
    g.selectAll('.point')
        .data(data)
        .enter().append('circle')
        .attr('class', 'point')
        .attr('cx', d => xScale(d.month))
        .attr('cy', d => yScale(d.value))
        .attr('r', d => 2 + d.relevance * 3)
        .attr('fill', APP_STATE.colorScheme[chartIndex - 1])
        .attr('fill-opacity', 0.7);
    
    // Add axes
    g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).ticks(4))
        .selectAll('text')
        .style('fill', '#64748b')
        .style('font-size', '10px');
    
    g.append('g')
        .call(d3.axisLeft(yScale).ticks(3))
        .selectAll('text')
        .style('fill', '#64748b')
        .style('font-size', '10px');
    
    // Add title
    g.append('text')
        .attr('x', innerWidth / 2)
        .attr('y', -5)
        .attr('text-anchor', 'middle')
        .style('fill', '#94a3b8')
        .style('font-size', '12px')
        .text(topics[chartIndex - 1]);
}
function initializeResearchQuestions(slideIndex) {
    const questions = document.querySelectorAll('.research-question');
    
    // Animate questions sequentially
    questions.forEach((question, index) => {
        question.style.opacity = '0';
        question.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            question.style.transition = 'all 600ms ease';
            question.style.opacity = '1';
            question.style.transform = 'translateX(0)';
        }, index * 800);
    });
    
    // Add keyboard navigation for steps
    let currentStep = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' && currentStep < questions.length - 1) {
            currentStep++;
            updateStep();
        } else if (e.key === 'ArrowUp' && currentStep > 0) {
            currentStep--;
            updateStep();
        }
    });
    
    function updateStep() {
        questions.forEach((question, index) => {
            if (index === currentStep) {
                question.classList.add('step-active');
                question.classList.remove('step-inactive');
            } else {
                question.classList.add('step-inactive');
                question.classList.remove('step-active');
            }
        });
        
        APP_STATE.dispatch.call('stepChange', this, currentStep);
    }
}
// Export for use in other modules if needed
window.APP_STATE = APP_STATE;
window.SLIDES = SLIDES;