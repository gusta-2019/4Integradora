<div align="center">

# Cosecha DIVINA
<img src= "src/public/img/3.png" alt="Logo de la tienda">

<table class="no-border">
  <tr>
    <td><a href="https://github.com/aregtech/areg-sdk/actions/workflows/msbuild.yml" alt="MS Build"><img src="https://amsilabs.com/wp-content/uploads/2021/01/MongoDB-1.jpg" alt="MongoDB" style="width: 150px;"/></a></td>
    <td><a href="https://expressjs.com/es/"><img src="https://expressjs.com/images/express-facebook-share.png" alt="Express JS" style="width: 150px;"/></a></td>
    <td><a href="https://es.react.dev/learn" alt="ReactJS"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png" alt="ReactJS" style="height: 60px;"/></a></td>
    <td><a href="https://github.com/aregtech/areg-sdk/actions/workflows/codeql-analysis.yml"><img src="https://nodejs.org/static/images/logo.svg" alt="NodeJS" style="width: 150px;"/></a></td>
  </tr>
</table>
</div>

**Tabla de contenidos**

  - [Introducción](#introducción)
  - [Backend URL](#backend-deployment-url)
  - [Frontend URL](#frontend-deployment-url)
  - [Características del proyecto Backend](#características-del-proyecto-backend)
  - [Características del proyecto Frontend](#características-del-proyecto-frontend)
  - [Tecnologías utilizadas Backend](#tecnologías-utilizadas-backend)
  - [Tecnologías utilizadas Frontend](#tecnologías-utilizadas-frontend)
  - [Flujo del usuario](#flujo-del-usuario)
  - [Instalación](#instalación)
    - [Backend](#levantar-el-backend)
    - [Frontend](#levantar-el-frontend)
  - [Uso](#uso)
    - [api/auth](#apiauth)
    - [api/products](#apiproducts)
    - [api/cart](#apicart)

## Introducción📌

**COSECHA DIVINA** es un ecommerce de venta de vinos, realizado enteramente con el stack MERN, como proyecto final para el curso de Programación Backend de Coderhouse, en su parte backend

## Backend deployment URL📌

https://

## Frontend deployment URL📌

https://

## Características del proyecto Backend📌

- Desarrollo de la arquitectura del servidor en base a capas MVC definidas, con capa de ruteo, controladores, lógica de negocio, validaciones y capa de persistencia.
- Persistencia mediante File System para el desarrollo local, y uso de bases de datos con Mongo Atlas para el ambiente de producción.
- Sistema de autenticación basado en JWT
- Encriptación de contraseñas mediante Bcrypt
- Sistema de registro y login de usuarios
- Verificación de cuenta de usuario registrado
- Ruteo para el listado de productos, así como su agregado a la base de datos, edición y eliminación
- Lo mismo para la interacción con el carrito de compras permitiendo crear un carrito, añadirle productos, remover productos o modificarlos, y eliminar el carrito.

## Características del proyecto Frontend📌

- Registro y login de usuarios con confirmación de cuenta registrada.
- Validación en formularios
- Carrito de compras: 
  - agregar productos al carrito, 
  - modificar la cantidad seleccionada, 
  - eliminar productos del carrito.
- Context
- Ruta de carrito protegida

## Tecnologías utilizadas Backend📌

- NodeJS
- Express JS
- MongoDB
- Mongoose
- Bcrypt
- Cors
- Dotenv
- Joi
- Json Web Token
- Minimist
- Sendgrid

## Tecnologías utilizadas Frontend📌

- React
- Vite
- Axios
- Headless UI
- React Router Dom v6
- TailwindCss

## Flujo del usuario📌

El flujo de un usuario dentro de la aplicación considera que el mismo puede interactuar por la página de productos (inicio), así como el detalle de los mismos sin autenticarse. Sin embargo, para el acceso a las rutas protegidas (agregar productos, editar el carrito o eliminar productos del carrito), éste deberá primero loguearse (o registrarse). En caso de registrarse, recibirá un email a su casilla de correo registrada para la verificación de la cuenta, la cuál se realiza con el servicio de Sendgrid.

### Credenciales

Para agregar productos al carrito, puede registrar un nuevo usuario, o bien loguearse mediante las siguientes credenciales:
> Tener en cuenta en el caso del registro, que debe ingresarse un email válido, ya que el mismo deberá ser verificado para poder continuar.
```
user: test@mail.com
password: 123456
```

## Instalación📌
```
git clone 
cd BE32190-Coderhouse.git
```

### Levantar el backend:
```
cd backend
npm install
npm run dev
```
### Levantar el frontend:
```
cd frontend
npm install
npm run dev
```

## Uso📌

A continuación se listan los endpoint correspondientes, junto con una breve descripción, y en caso de corresponder, un ejemplo del body que reciben. También se indica en la columna "Auth", si la ruta debe ser authorizada por JWT antes de llegar al controlador.

> Nota: Para probar la aplicación con POSTMAN, se debe comentar la línea que habilita el acceso mediante CORS

### `/api/auth`

| Endpoint    | Http Req | Description                            | Auth | Body                                                                                                    |
| ----------- | -------- | -------------------------------------- | ---- | ------------------------------------------------------------------------------------------------------- |
| `/register` | POST     | Registrar nuevo usuario                | No   | `{ "email": "testing@mail.com", "password" : "12345678", "phone": 11236856546, "username": "testing" }` |
| `/login`    | POST     | Loguear usuario registrado             | No   | `{ "email": "testing@mail.com", "password" : "12345678" }`                                              |
| `/all`      | GET      | Obtener todos los usuarios             | No   | -                                                                                                       |
| `/:userId`  | DELETE   | Eliminar un usuario                    | No   | -                                                                                                       |
| `/`         | GET      | Authorizar un usuario con Bearer Token | Sí   | -                                                                                                       |

### `/api/products`

| Endpoint | Http Req | Description                   | Auth | Body                                                                                                                                                                                                    |
| -------- | -------- | ----------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`      | GET      | Obtener todos los productos   | No   | -                                                                                                                                                                                                       |
| `/:id`   | GET      | Obtener un producto por su Id | No   | -                                                                                                                                                                                                       |
| `/`      | POST     | Guardar un producto           | Sí   | `{ "title": "Alambrado", "price": 359, "description": "Cabernet Sauvignon", "url": "vino_12_xzmjnz", "stock": 8, "category": "Tinto" }` |
| `/:id`   | PUT      | Actualizar un producto        | Sí   | `{ "price": 389 }`                                                                                                                                                                                      |
| `/:id`   | DELETE   | Eliminar un producto          | Sí   | -                                                                                                                                                                                                       |

### `/api/cart`

| Endpoint              | Http Req | Description                                | Auth | Body                                                   |
| --------------------- | -------- | ------------------------------------------ | ---- | ------------------------------------------------------ |
| `/create/:userId`     | GET      | Crear un carrito                           | Sí   | -                                                      |
| `/:userId`            | GET      | Obtener carrito de un usuario              | Sí   | -                                                      |
| `/remove/:userId`     | PUT      | Eliminar todos los productos de un carrito | Sí   | -                                                      |
| `/:userId`            | PUT      | Agregar un producto al carrito             | Sí   | `{ "_id": "644ca048b68b415727b1fc2e", "quantity": 1 }` |
| `/:userId/:productId` | PUT      | Actualizar o remover un producto           | Sí   | `{ "quantity": 3 }`                                    |
| `/:userId`            | DELETE   | Eliminar el carrito                        | Sí   | -                                                      |
