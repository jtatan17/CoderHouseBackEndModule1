# Server Documentation

## Overview

This server enables users and products to be created, read, updated, and deleted. It is built using the **Express** framework and interacts with the file system to store data persistently. The server is structured for clarity and scalability, with centralized routing and modular controllers.

---

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Server Configuration](#server-configuration)
3. [Routing Overview](#routing-overview)
   - [Index Router](#index-router)
   - [API Router](#api-router)
4. [Controller Functions](#controller-functions)
5. [File System Integration](#file-system-integration)
6. [Using Postman to Test Endpoints](#using-postman-to-test-endpoints)
   - [Create and CreateMock](#create-and-createmock)
   - [Read All and Read One](#read-all-and-read-one)
   - [Update](#update)
   - [Delete](#delete)
7. [Screenshots of Proof](#screenshots-of-proof)

---

## Technologies Used

- **Node.js**
- **Express** framework
- **File System (fs)** module
- **Postman** for API testing

---

## Server Configuration

The server is initialized in `index.js` with the following:

### Code Snippet

```javascript
import express from "express";
import morgan from "morgan";
import router from "./src/routers/index.router.js";
import pathHandler from "./src/middleware/pathHandler.mid.js";
import errorHandler from "./src/middleware/errorHandler.mid.js";

// Server Settings
const server = express();
const port = 8080;
const ready = () => console.log("server is ready on port " + port);
server.listen(port, ready);

// Middleware
server.use(morgan("dev"));
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Router
server.use("/", router);
server.use(pathHandler);
server.use(errorHandler);
```

This code sets up middleware for logging, serving static files, parsing JSON, and routing.

---

## Routing Overview

### Index Router (`index.router.js`)

The `index.router.js` file centralizes all server routes. It includes a default welcome route and an API entry point:

#### Code Snippet

```javascript
import { Router } from "express";
import apiRouter from "./api/index.api.js";

const router = Router();

router.use("/api", apiRouter);

router.get("/api/welcome", (req, res) => {
  const { name, age } = req.query;
  const message = `Hola ${name || "Coder"}, tu edad es ${age || 18} años`;
  return res.status(200).send(message);
});

router.get("/", (req, res) => res.status(200).send("WELCOME TO MY COMMERCE"));
router.get("/api", (req, res) => res.status(200).send("WELCOME TO MY API"));

export default router;
```

### API Router (`index.api.js`)

The API router declares endpoints for users and products:

#### Code Snippet

```javascript
import { Router } from "express";
import productsRouter from "./products.api.js";
import usersRouter from "./users.api.js";

const apiRouter = Router();

apiRouter.use("/products", productsRouter);
apiRouter.use("/users", usersRouter);

export default apiRouter;
```

---

## Controller Functions

Each route calls a corresponding controller function from the `controllers` folder. Functions are similar for both **users** and **products**:

- **Create**: Creates a new object with custom data.
- **CreateMock**: Creates a new object with default data.
- **Read**: Reads all objects from the JSON file.
- **ReadOne**: Reads a specific object by ID.
- **UpdateOne**: Updates a specific object by ID with new data.
- **Delete**: Deletes a specific object by ID.

---

## File System Integration

The `fs` folder contains functions for interacting with JSON files. These functions handle:

- Reading all objects.
- Reading specific objects by ID.
- Writing new objects.
- Updating objects.
- Deleting objects.

---

## Using Postman to Test Endpoints

Postman is used to interact with the server endpoints.

### Create and CreateMock

- **Method**: `POST`
- **URL**:
  - `localhost:8080/api/products` (for custom data)
  - `localhost:8080/api/products/mock` (for default data)
- **Steps**:
  1. Create a new request in Postman.
  2. Select `POST` as the method.
  3. Enter the URL.
  4. For custom data, go to the **Body** tab, select **raw**, and choose `JSON` format. Enter:
     ```json
     {
       "title": "Bike",
       "stock": 10,
       "price": 100,
       "category": "sports"
     }
     ```
  5. Click **Send**.

### Read All and Read One

- **Method**: `GET`
- **URL**:
  - `localhost:8080/api/products` (read all)
  - `localhost:8080/api/products/:pid` (read one by ID)
- **Steps**:
  1. Create a new request in Postman.
  2. Select `GET` as the method.
  3. Enter the URL. For specific objects, add the ID in the **Path Variables** section.
  4. Click **Send**.

### Update

- **Method**: `PUT`
- **URL**: `localhost:8080/api/products/:pid`
- **Steps**:
  1. Create a new request in Postman.
  2. Select `PUT` as the method.
  3. Enter the URL and specify the ID in **Path Variables**.
  4. Go to the **Body** tab, select **raw**, and choose `JSON` format. Enter the updated data.
  5. Click **Send**.

### Delete

- **Method**: `DELETE`
- **URL**: `localhost:8080/api/products/:pid`
- **Steps**:
  1. Create a new request in Postman.
  2. Select `DELETE` as the method.
  3. Enter the URL and specify the ID in **Path Variables**.
  4. Click **Send**.

---

## Screenshots of Proof

Screenshots of Postman requests and responses can be uploaded to a `proof` folder and linked here. For example:

- [Controlling Products](./Proof/Products)
- [Controlling Users](./Proof/Users)

---

## Notes

- The server validates lowercase field names only.
- Validation errors are managed by middleware.
- File operations are asynchronous for better performance.

Feel free to test the API further or modify it to suit additional requirements.

## Segunda Preentrega

- Register form was integrated and programmed to send data to the backend using socket.io
- Backend programmed to received data using socket.io, uses the data and sends it back to the front, which uses handle bars and socket.io again to render the info sent by the BackEnd.
- Each product card has a Info button which was program to have the url modified with each product ID so it shows in a page the info of the product alone

## Entrega Proyecto Final

# Server Documentation

## Overview

This server enables users, products, and carts to be created, read, updated, and deleted. It is built using the **Express** framework and has transitioned from using the file system for persistent storage to **MongoDB** with **Mongoose**. The server is structured for clarity and scalability, with centralized routing and modular controllers.

---

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Server Configuration](#server-configuration)
3. [Folder Structure](#folder-structure)
4. [Routing Overview](#routing-overview)
   - [Index Router](#index-router)
   - [API Router](#api-router)
5. [Controller Functions](#controller-functions)
6. [Database Integration](#database-integration)
7. [Using Postman to Test Endpoints](#using-postman-to-test-endpoints)
   - [Products](#products)
   - [Users](#users)
   - [Carts](#carts)
8. [Screenshots of Proof](#screenshots-of-proof)
9. [Entrega Proyecto Final](#entrega-proyecto-final)

---

## Technologies Used

- **Node.js**
- **Express** framework
- **MongoDB** with **Mongoose**
- **Socket.io** for real-time communication
- **Handlebars** for rendering front-end views
- **Postman** for API testing

---

## Server Configuration

The server is initialized in `index.js` with the following:

### Code Snippet

```javascript
import express from "express";
import morgan from "morgan";
import router from "./src/routers/index.router.js";
import pathHandler from "./src/middleware/pathHandler.mid.js";
import errorHandler from "./src/middleware/errorHandler.mid.js";
import mongoose from "mongoose";

// Database Connection
mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Server Settings
const server = express();
const port = 8080;
const ready = () => console.log("server is ready on port " + port);
server.listen(port, ready);

// Middleware
server.use(morgan("dev"));
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Router
server.use("/", router);
server.use(pathHandler);
server.use(errorHandler);
```

---

## Folder Structure

### `public`

- Front-end logic: JavaScript files for handling forms (product registration, user login).

### `src`

- **`controllers/`** – Controller functions managing API logic (products, users, carts, views).
- **`data/`** – Data access logic:
  - **`Mongo/`** – Uses Mongoose for CRUD operations.
  - **`Mongo/models/`** – Defines schemas for **Users, Products, Carts**.
- **`helpers/`** – Utility functions (MongoDB setup, Socket.io integration).
- **`middleware/`** – Error handling, validation, path handling.
- **`routers/`** – Express routing logic, defining API endpoints.
- **`views/`** – Handlebars templates for rendering data.

---

## Routing Overview

### Index Router (`index.router.js`)

Handles the main routing logic and API entry point.

```javascript
import { Router } from "express";
import apiRouter from "./api/index.api.js";

const router = Router();

router.use("/api", apiRouter);

router.get("/api/welcome", (req, res) => {
  const { name, age } = req.query;
  const message = `Hola ${name || "Coder"}, tu edad es ${age || 18} años`;
  return res.status(200).send(message);
});

router.get("/", (req, res) => res.status(200).send("WELCOME TO MY COMMERCE"));
router.get("/api", (req, res) => res.status(200).send("WELCOME TO MY API"));

export default router;
```

### API Router (`index.api.js`)

Defines API endpoints for **products**, **users**, and **carts**.

```javascript
import { Router } from "express";
import productsRouter from "./products.api.js";
import usersRouter from "./users.api.js";
import cartsRouter from "./carts.api.js";

const apiRouter = Router();

apiRouter.use("/products", productsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/carts", cartsRouter);

export default apiRouter;
```

---

## Controller Functions

All controllers use `try/catch` to handle errors and respond accordingly.

```javascript
const readProducts = async (req, res, next) => {
  try {
    const { category } = req.query;
    const all = await productsManager.readAll(category);
    const generalStock = "General stock " + all.length;
    if (all.length > 0) {
      return res.status(200).json({ response: all, generalStock });
    } else {
      throw new Error("Not found");
    }
  } catch (error) {
    next(error);
  }
};
```

---

## Database Integration

Previously, data was stored in the file system under `src/data/fs`. Now, **MongoDB** is used with **Mongoose**, and logic is defined in `src/data/Mongo`.

- **`manager.js`** – Implements main CRUD logic.
- **`users.js`**, **`products.js`**, **`carts.js`** – Extend `manager.js` for respective entities.
- **`models/`** – Defines schemas for Users, Products, and Ca

## Latest integrations

In the last commits we added Passport JWT token cookies and sessions, also created a factory to manage the persistance methods, also there is a custom router for specific endpoints and email sender

## Env Variables

SERVER_PORT= 8080
MONGO_URL= mongodb+srv://jtatan2014:Bask20177\*@cluster0.haka7.mongodb.net/back72855
COOKIE_KEY = "clave p4ar4 firm4r las c00kies"
SESSION_KEY = "cl4ve s3ssions"
PERSISTENCE = "mongo"
