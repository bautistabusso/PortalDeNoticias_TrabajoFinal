// ===== CLAVE EN LOCALSTORAGE =====
const STORAGE_KEY = "noticias";
let categoriaActual = "Todas";


// ===== NOTICIAS INICIALES (solo se usan la primera vez) =====
const noticiasIniciales = [
    {
        titulo: "El dólar sube nuevamente",
        descripcion: "El dólar blue registra una nueva suba en el mercado informal.",
        imagen: "https://media.lacapital.com.ar/p/618ce71c47f49dc403e52d8fae1dd30f/adjuntos/203/imagenes/100/104/0100104061/642x0/smart/dolarjpg.jpg",
        categoria: "Economía"
    },
    {
        titulo: "Expectativas económicas",
        descripcion: "Analistas prevén cambios en la cotización del dólar.",
        imagen: "https://www.cronista.com/resizer/v2/CJQ27CDBD5EYTDCMPSH6Y4SRWY.jpg?auth=398219eebc21884d7eb8faf6df51a188d43b59c0f8df74e1ca028fbc290cb028&height=450&width=800&quality=70&smart=true",
        categoria: "Economía"
    },
    {
        titulo: "Impacto en el consumo",
        descripcion: "El aumento del dólar afecta los precios de productos importados.",
        imagen: "https://politicaymedios.com.ar/uploads/noticias/780x434/2025/03/20250327141127_dolar.jpg",
        categoria: "Economía"
    },
    {
        titulo: "El fiscal rechazó la detención de Manuel Adorni",
        descripcion: 'No hay riesgo de fuga ni de entorpecimiento de la investigación y tiene bienes y “arraigo”',
        imagen: "https://chequeado.com/wp-content/uploads/2025/11/Manuel-Adorni-Perfil-450x450.webp",
        categoria: "Política"
    },
    {
        titulo: "Argentina sufrió con Cabo Verde, pero esta en octavos de final",
        descripcion: "Se impuso por 3-2 en el alargue, con goles de Messi, Lisandro Martinez y el Cuti Romero",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9hYb1X88fGgQFj5Z2m2PuKLkeQwJJAYFyK7Pm3KYi2g&s=10",
        categoria: "Deportes"
    },
    {
        titulo: "Salta será sede del Encuentro Internacional de Nutrición Deportiva EINDE 2026",
        descripcion: "En octubre, el Centro de Convenciones reunirá a referentes internacionales de la medicina metabólica y el alto rendimiento.",
        imagen: "https://www.salta.gob.ar/public/images/noticias/thumbs/108237-salta-sera-sede-del-encuentro-internacional-de-nutricion-deportiva-einde-2026.webp",
        categoria: "Internacional"
    },
    {
        titulo: "Funcionarios de EE.UU. intentaron advertir a Irán sobre el temor de que Israel asesinara a sus mediadores",
        descripcion: "Los funcionarios señalaron que a Estados Unidos le preocupaba que Israel pudiera matar al presidente del parlamento iraní o al ministro de Asuntos Exteriores",
        imagen: "https://www.lanacion.com.ar/resizer/v2/el-dolar-de-plata-flowing-hair-de-1794-es-uno-de-VOSZPFUD3BGWZCIY6FO6NOZ524.jpg?auth=d1edd977ba7ff6354bbebcf53415e83f232d26998514a37b21136e647e858394&width=1200&height=800&quality=70&smart=false&focal=1008,589",
        categoria: "Internacional"
    },
    {
        titulo: "Dolar: Julio",
        descripcion: "Dólar: cómo se mueve la banda cambiaria en julio tras la desaceleración de la inflación.",
        imagen: "https://www.lanacion.com.ar/resizer/v2/con-el-nuevo-dato-de-inflacion-de-mayo-se-6NOUQ63QVVDTPA2IEBKGELZGK4.png?auth=6df236669724626cea21b68da81153c554d0f0350350863ef909aefb0b466f95&width=1200&height=800&quality=70&smart=true",
        categoria: "Economía"
    },
    {
            titulo: "Franco Escobar pegó la vuelta y se transformó en el primer refuerzo de Newell's",
        descripcion: "El defensor de 31 años, que ya tuvo dos pasos en la Lepra, viene de jugar en Peñarol de Montevideo y firmó contrato por un año y medio.",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Hpecsg5d43w48tETIWkfabW9SPYHfsbDmiJUpkNVrw&s=10",
        categoria: "Deportes"
    },
    {
            titulo: "Rosario: la Justicia levantó la suspensión de las obras del Parque Acuático que impulsa Javkin en La Florida",
        descripcion: "El juez Marcelo Quiroga rechazó el planteo de Juan Monteverde. La causa sigue abierta, pero los trabajos en la costanera norte pueden continuar.",
        imagen: "https://media.letrap.com.ar/p/2ee932f8aff6c9847c0e7d03cd90ee15/adjuntos/349/imagenes/100/182/0100182917/790x0/smart/pablo-javkin-apertura-sesiones.jpg",
        categoria: "Política"
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
    const todasLasNoticias = obtenerNoticias();

    const noticias =
        categoriaActual === "Todas"
            ? todasLasNoticias
            : todasLasNoticias.filter(
                noticia => noticia.categoria === categoriaActual
            );

    contenedor.innerHTML = "";

    noticias.forEach(noticia => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${noticia.imagen}" alt="noticia">
            <div class="card-content">
                <span class="badge">
                    ${noticia.categoria}
                </span>
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

const botonTema =
    document.getElementById("theme-toggle");

if (localStorage.getItem("tema") === "dark") {
    document.body.classList.add("dark-mode");
    botonTema.textContent = "☀️";
} else {
    botonTema.textContent = "🌙";
}

botonTema.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("tema", "dark");
        botonTema.textContent = "☀️";

    } else {

        localStorage.setItem("tema", "light");
        botonTema.textContent = "🌙";
    }
});

// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", () => {

    renderNoticias();
    cargarDolar();

    document
        .querySelectorAll(".filtro-btn")
        .forEach(boton => {

            boton.addEventListener("click", () => {

                document
                    .querySelectorAll(".filtro-btn")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                boton.classList.add("active");

                categoriaActual =
                    boton.dataset.categoria;

                renderNoticias();

            });

        });

});


