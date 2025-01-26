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
