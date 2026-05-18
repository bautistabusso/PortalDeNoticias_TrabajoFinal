// ===== CLAVE EN LOCALSTORAGE =====
const STORAGE_KEY = "noticias";


// ===== NOTICIAS INICIALES (solo se usan la primera vez) =====
const noticiasIniciales = [
    {
        titulo: "El dólar sube nuevamente",
        descripcion: "El dólar blue registra una nueva suba en el mercado informal.",
        imagen: "https://via.placeholder.com/300x150"
    },
    {
        titulo: "Expectativas económicas",
        descripcion: "Analistas prevén cambios en la cotización del dólar.",
        imagen: "https://via.placeholder.com/300x150"
    },
    {
        titulo: "Impacto en el consumo",
        descripcion: "El aumento del dólar afecta los precios de productos importados.",
        imagen: "https://via.placeholder.com/300x150"
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



// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", () => {
    renderNoticias();
});