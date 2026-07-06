const usuarioLogueado =
    sessionStorage.getItem("usuarioLogueado");

if (!usuarioLogueado) {
    window.location.href = "login.html";
}


if (localStorage.getItem("tema") === "dark") {
    document.body.classList.add("dark-mode");
}


const STORAGE_KEY = "noticias";


function logout() {

    sessionStorage.removeItem(
        "usuarioLogueado"
    );

    window.location.href =
        "index.html";
}



document
    .getElementById("logout-btn")
    .addEventListener("click", logout);

// ===== OBTENER =====
function obtenerNoticias() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}


// ===== GUARDAR =====
function guardarNoticias(noticias) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(noticias));
}


// ===== VARIABLES DE CONTROL =====
let modoEdicion = false;
let indexEdicion = null;


// ===== AGREGAR / ACTUALIZAR =====
function guardarNoticia(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const imagen = document.getElementById("imagen").value;
    const categoria = document.getElementById("categoria").value;
    const descripcion = document.getElementById("descripcion").value;

    const noticias = obtenerNoticias();

    if (modoEdicion) {
        // EDITAR
        noticias[indexEdicion] = { titulo, imagen, categoria, descripcion };

        modoEdicion = false;
        indexEdicion = null;
    } else {
        // CREAR
        noticias.push({ titulo, imagen, categoria, descripcion });
    }

    guardarNoticias(noticias);

    document.getElementById("form-noticia").reset();

    renderAdminNoticias();
}


// ===== ELIMINAR =====
function eliminarNoticia(index) {
    const noticias = obtenerNoticias();

    noticias.splice(index, 1);

    guardarNoticias(noticias);

    renderAdminNoticias();
}


// ===== EDITAR =====
function editarNoticia(index) {
    const noticias = obtenerNoticias();
    const noticia = noticias[index];

    document.getElementById("titulo").value = noticia.titulo;
    document.getElementById("imagen").value = noticia.imagen;
    document.getElementById("categoria").value = noticia.categoria;
    document.getElementById("descripcion").value = noticia.descripcion;

    modoEdicion = true;
    indexEdicion = index;
}


// ===== RENDER =====
function renderAdminNoticias() {
    const contenedor = document.getElementById("admin-news-container");
    const noticias = obtenerNoticias();

    contenedor.innerHTML = "";

    noticias.forEach((noticia, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${noticia.imagen}" alt="noticia">
            <div class="card-content">
                <p class="categoria">${noticia.categoria}</p>
                <h3>${noticia.titulo}</h3>
                <p>${noticia.descripcion}</p>

                <button onclick="editarNoticia(${index})">✏️ Editar</button>
                <button onclick="eliminarNoticia(${index})">❌ Eliminar</button>
            </div>
        `;

        contenedor.appendChild(card);
    });
}


// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form-noticia")
        .addEventListener("submit", guardarNoticia);

    renderAdminNoticias();
});

