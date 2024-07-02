// realtimeu.js
const socket = io();
const role = document.getElementById("role").textContent;

socket.on("usuarios", (data) => {
    renderUsuarios(data);
});

const renderUsuarios = (usuarios) => {
    const contenedorUsuarios = document.getElementById("contenedorUsuarios");
    contenedorUsuarios.innerHTML = "";

    usuarios.forEach(usuario => {
        const userCard = document.createElement("div");
        userCard.classList.add("card");

        userCard.innerHTML = `
            <p>${usuario.first_name} ${usuario.last_name}</p>
            <p>Email: ${usuario.email}</p>
            <p>Rol: ${usuario.role}</p>
            <button>Eliminar Usuario</button>
        `;

        contenedorUsuarios.appendChild(userCard);
        userCard.querySelector("button").addEventListener("click", () => {
            eliminarUsuario(usuario._id);
        });
    });
};

const eliminarUsuario = (id) => {
    socket.emit("eliminarUsuario", id);
};
