// ===== CLAVE EN LOCALSTORAGE =====
const STORAGE_KEY = "noticias";


// ===== NOTICIAS INICIALES (solo se usan la primera vez) =====
const noticiasIniciales = [
    {
        titulo: "El dólar sube nuevamente",
        descripcion: "El dólar blue registra una nueva suba en el mercado informal.",
        imagen: "https://media.lacapital.com.ar/p/618ce71c47f49dc403e52d8fae1dd30f/adjuntos/203/imagenes/100/104/0100104061/642x0/smart/dolarjpg.jpg"
    },
    {
        titulo: "Expectativas económicas",
        descripcion: "Analistas prevén cambios en la cotización del dólar.",
        imagen: "https://www.cronista.com/resizer/v2/CJQ27CDBD5EYTDCMPSH6Y4SRWY.jpg?auth=398219eebc21884d7eb8faf6df51a188d43b59c0f8df74e1ca028fbc290cb028&height=450&width=800&quality=70&smart=true"
    },
    {
        titulo: "Impacto en el consumo",
        descripcion: "El aumento del dólar afecta los precios de productos importados.",
        imagen: "https://politicaymedios.com.ar/uploads/noticias/780x434/2025/03/20250327141127_dolar.jpg"
    }
];


// ===== OBTENER NOTICIAS =====
function obtenerNoticias() {
    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {
        return JSON.parse(data);
    } else {
        // Primera vez: guardar datos iniciales
        localStorage.setItem(STORAGE_KEY, JSON.stringify(noticiasIniciales));
        return noticiasIniciales;
    }
}


// ===== RENDERIZAR NOTICIAS =====
function renderNoticias() {
    const contenedor = document.getElementById("news-container");
    const noticias = obtenerNoticias();

    contenedor.innerHTML = "";

    noticias.forEach(noticia => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${noticia.imagen}" alt="noticia">
            <div class="card-content">
                <h3>${noticia.titulo}</h3>
                <p>${noticia.descripcion}</p>
            </div>
        `;

        contenedor.appendChild(card);
    });
}

async function cargarDolar() {
    const contenedor = document.getElementById("dolar-container");

    try {
        const respuesta = await fetch(
            "https://api.bluelytics.com.ar/v2/latest"
        );

        if (!respuesta.ok) {
            throw new Error("Error al obtener datos");
        }

        const datos = await respuesta.json();

        contenedor.innerHTML = `
            <p>Dólar Blue Compra: $${datos.blue.value_buy}</p>
            <p>Dólar Blue Venta: $${datos.blue.value_sell}</p>
        `;

    } catch (error) {
        contenedor.innerHTML = `
            <p>Error al cargar la cotización.</p>
        `;

        console.error(error);
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", () => {
    renderNoticias();
    cargarDolar();
});