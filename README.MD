# 🛒 Final E-Commerce Project Documentation

## 🚀 Overview

This is the final delivery for the Coderhouse Backend course. It is a complete e-commerce backend system using **Express**, **MongoDB**, **Passport.js**, **JWT**, **Nodemailer**, and **Handlebars**. The project evolved from using the file system to a robust layered architecture with database support, role-based access, session management, and password reset via email.

---

## 📚 Table of Contents

1. [Technologies Used](#technologies-used)
2. [Architecture & Features](#architecture--features)
3. [Environment Variables](#environment-variables)
4. [Protected Routes and Access Control](#protected-routes-and-access-control)
5. [Password Reset Flow](#password-reset-flow)
6. [How to Use (Step by Step)](#how-to-use-step-by-step)
7. [Route Summary](#route-summary)
8. [Development Notes](#development-notes)

---

## 🛠 Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- Handlebars
- Passport.js (JWT Strategy)
- bcrypt
- Nodemailer
- dotenv
- Socket.io
- Custom Routers & Middleware

---

## 🏗 Architecture & Features

- 📁 **Layered Architecture**:

  - Controllers → Services/DAO → DTO → Repository → Persistence

- 🔐 **Authentication**:

  - JWT-based login via `passport-jwt` strategy
  - Cookie-based auth (httpOnly JWT token)

- 👥 **Role-based Access Control**:

  - Custom router with `PUBLIC`, `USER`, and `ADMIN` route levels
  - `/registeraproduct` route restricted to admin users only

- 🛒 **Cart System**:

  - Products rendered from DB
  - Add to cart using LocalStorage
  - `/cart` view allows quantity updates and deletions
  - Checkout creates a cart document in MongoDB (if logged in)

- 📧 **Email Integration**:

  - Password reset system using Nodemailer
  - Secure token link with expiration (1 hour)
  - Frontend form to create new password

- 🔐 **Password Security**:

  - All passwords hashed with bcrypt

- 🎨 **Frontend Views**:

  - Handlebars rendering engine
  - Responsive views for login, register, profile, cart, resetPassword

---

## 📦 Environment Variables

```env
SERVER_PORT=8080
MONGO_URL=mongodb+srv://<yourMongoUser>:<yourPassword>@<yourCluster>.mongodb.net/<yourDB>
COOKIE_KEY="yourCookieSecret"
SESSION_KEY="yourSessionSecret"
PERSISTENCE="mongo"

# Gmail credentials (use your own for testing reset password)
GMAIL_ACCOUNT=your@gmail.com
GMAIL_APP_PASSWORD=yourAppPassword

# Twilio (optional)
TWILIO_ACCOUNT_SID=yourSID
TWILIO_AUTH_TOKEN=yourAuthToken
TWILIO_SMS_NUMBER=+1234567890
TWILIO_TO_SMS_NUMBER=+1234567890

# JWT Secret
JWT_SECRET="SuperSecretKeyOnlyYouKnow"
```

> ⚠️ Do NOT push `.env` or credentials to public repos.

---

## 🔒 Protected Routes and Access Control

| Route                 | Access        | Description                       |
| --------------------- | ------------- | --------------------------------- |
| `/registeraproduct`   | Admin Only    | Register a new product            |
| `/cart`               | User Only     | View and modify cart              |
| `/checkout`           | User Only     | Confirm cart and create DB order  |
| `/resetPassword`      | Public        | Request password reset via email  |
| `/newPassword/:token` | Public        | Set new password securely         |
| `/current`            | Authenticated | Returns current user session info |

---

## 🔁 Password Reset Flow

1. Visit `/resetPassword` and enter your email
2. You'll receive an email with a secure token link
3. Click the link → redirect to `/newPassword/:token`
4. Submit new password → server validates token, updates password

---

## 📋 How to Use (Step by Step)

### 1. Clone and Install

```bash
git clone <repo-url>
cd <project>
npm install
```

### 2. Setup Environment

Create `.env` file with the structure above.

### 3. Run the Project

```bash
npm run dev
```

Access the server at: `http://localhost:8080`

### 4. Create Admin User

- Register two users via `/register`
- Use Postman to promote one to admin:

```http
POST /api/users/:uid
{
  "role": "admin"
}
```

---

## 🌐 Route Summary

| HTTP Method | Path                               | Description                      |
| ----------- | ---------------------------------- | -------------------------------- |
| GET         | `/`                                | Home view                        |
| GET         | `/products`                        | Product listing                  |
| GET         | `/cart`                            | LocalStorage cart view           |
| POST        | `/checkout`                        | Create Mongo cart (if logged in) |
| GET         | `/profile`                         | Profile page after login         |
| POST        | `/api/email/reset-password/:token` | Reset password route             |
| POST        | `/resetPassword`                   | Request password reset email     |
| GET         | `/newPassword/:token`              | Password reset form              |

---

## 📌 Development Notes

- Controller logic is fully decoupled from data source using a **factory pattern**
- Password reset flow uses secure **JWT token validation** with expiration
- All passwords stored in DB are **hashed** and **validated** using `bcrypt`
- Admin-only routes are fully enforced using **Passport + role policies**
- **CustomRouter** system provides easy-to-read policy declarations on routes

---

✅ Project tested, documented, and delivered.

Built by **Sebastián Medina**
For **Coderhouse Backend Course**
