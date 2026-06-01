async function login(event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    const mensaje =
        document.getElementById("mensaje");

    try {

        const respuesta = await fetch(
            "https://dummyjson.com/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

        if (!respuesta.ok) {
            throw new Error("Credenciales incorrectas");
        }

        const usuario = await respuesta.json();

        sessionStorage.setItem(
            "usuarioLogueado",
            JSON.stringify(usuario)
        );

        window.location.href =
            "admin.html";

    } catch (error) {

        mensaje.textContent =
            "Usuario o contraseña incorrectos.";

        console.error(error);
    }
}

document
    .getElementById("login-form")
    .addEventListener("submit", login);