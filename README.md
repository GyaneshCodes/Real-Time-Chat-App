# Real-Time Chat App

A full-stack real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js) and Socket.io.

## Features

-   **Real-time Messaging:** Instant messaging using Socket.io.
-   **User Authentication:** Secure signup and login using JWT (JSON Web Tokens).
-   **File Sharing:** Upload and share images (powered by Cloudinary).
-   **Online Status:** See who is currently online.
-   **Responsive Design:** Modern UI built with Tailwind CSS.
-   **State Management:** robust state management using Redux Toolkit.

## Tech Stack

### Client
-   **Framework:** React (Vite)
-   **State Management:** Redux Toolkit
-   **Styling:** Tailwind CSS
-   **Routing:** React Router DOM
-   **HTTP Client:** Axios
-   **Real-time:** Socket.io Client
-   **Icons:** Lucide React, React Icons

### Server
-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Database:** MongoDB (Mongoose)
-   **Authentication:** JWT, bcrypt, cookie-parser
-   **Real-time:** Socket.io
-   **File Storage:** Cloudinary
-   **Utilities:** Multer (file handling), dotenv, cors

## Prerequisites

Before running the application, ensure you have the following installed:
-   [Node.js](https://nodejs.org/) (v14+ recommended)
-   [MongoDB](https://www.mongodb.com/) (Local or Atlas)
-   A [Cloudinary](https://cloudinary.com/) account for image uploads

## Environment Variables

### Server
Create a `.env` file in the `server` directory with the following variables:

```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_SECRET_EXPIRED=30d
CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> **Note:** The client application is currently configured to communicate with the backend at `http://localhost:8000`. Please ensure `PORT` is set to `8000` in your `.env` file, or update `client/src/main.jsx` to match your server port.

## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd "Real-Time Chap App"
    ```

2.  **Server Setup:**
    ```bash
    cd server
    npm install
    # Create .env file as described above
    npm run dev
    ```
    The server will start (defaulting to port 5000 if not specified, but recommended 8000).

3.  **Client Setup:**
    Open a new terminal and navigate to the client directory:
    ```bash
    cd client
    npm install
    npm run dev
    ```
    The client will start at `http://localhost:5173` (default Vite port).

## Project Structure

```
Real-Time Chap App/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── redux/          # Redux state slices and store
│   │   ├── lib/            # Utilities (axios, etc.)
│   │   └── ...
│   ├── public/
│   └── ...
└── server/                 # Backend Node.js/Express application
    ├── src/
    │   ├── config/         # Configuration (DB, Cloudinary, Token)
    │   ├── controllers/    # Route controllers
    │   ├── models/         # Mongoose models
    │   ├── routes/         # API routes
    │   ├── middlewares/    # Auth and other middlewares
    │   └── socket/         # Socket.io logic
    └── ...
```

## Scripts

### Client
-   `npm run dev`: Start the development server.
-   `npm run build`: Build the app for production.
-   `npm run lint`: Run ESLint.
-   `npm run preview`: Preview the production build.

### Server
-   `npm run dev`: Start the backend server with Nodemon.
