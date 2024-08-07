// SocketManager.js
const socket = require("socket.io");
const ProductRepository = require("../repositories/product.repository.js");
const productRepository = new ProductRepository(); 
const MessageModel = require("../models/message.model.js");

const UserModel = require("../models/user.model.js");

class SocketManager {
    constructor(httpServer) {
        this.io = socket(httpServer);
        this.initSocketEvents();
    }

    async initSocketEvents() {
        this.io.on("connection", async (socket) => {
            console.log("Un cliente se conectó");
            
            socket.emit("productos", await productRepository.obtenerProductos() );

            socket.on("eliminarProducto", async (id) => {
                await productRepository.eliminarProducto(id);
                this.emitUpdatedProducts(socket);
            });

            socket.on("agregarProducto", async (producto) => {
                await productRepository.agregarProducto(producto);
                console.log(producto);
                this.emitUpdatedProducts(socket);
            });

            socket.on("message", async (data) => {
                await MessageModel.create(data);
                const messages = await MessageModel.find();
                socket.emit("message", messages);
            });

            socket.on("administrarUsuarios", async () => {
                if (socket.user && socket.user.role === 'admin') {
                    const usuarios = await UserModel.find();
                    socket.emit("usuarios", usuarios);
                }
            });

            socket.on("eliminarUsuario", async (id) => {
                await UserModel.findByIdAndDelete(id);
                this.emitUpdatedUsers(socket);
            });

        });
    }

    async emitUpdatedProducts(socket) {
        socket.emit("productos", await productRepository.obtenerProductos());
    }

    async emitUpdatedUsers(socket) {
        const usuarios = await UserModel.find();
        socket.emit("usuarios", usuarios);
    }
}

module.exports = SocketManager;


