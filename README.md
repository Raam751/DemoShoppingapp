# GEWA - Luxury Jewelry Shopping App

A premium, full-stack e-commerce application for browsing and purchasing luxury jewelry.

## 🌟 Features

*   **Product Catalog**: Browse a beautiful collection of jewelry with search functionality.
*   **Mobile Responsive**: Optimized for phones, tablets, and desktops.
*   **Shopping Cart**: Add items, adjust quantities, and view total price.
*   **Payment Integration**: "Pay Now" feature with QR Code scanning and direct client contact.
*   **Admin Mode**: Secure admin access to Add, Update, and Delete products.
*   **Cloud Database**: Data is safely stored in the cloud (TiDB MySQL), accessible from anywhere.

## 🛠️ Tech Stack

*   **Frontend**: React.js, Vite, CSS3
*   **Backend**: Java Spring Boot, Hibernate, JPA
*   **Database**: MySQL (TiDB Cloud)

## 🚀 How to Run

### Prerequisites
*   Java 21 (JDK)
*   Node.js & npm

### 1. Backend (Spring Boot)
The backend connects to the cloud database and serves the API.

```bash
# Navigate to the project root
cd gewa

# Run the application
./mvnw spring-boot:run
```
*The server will start on `http://localhost:8080`*

### 2. Frontend (React)
The frontend provides the user interface.

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies (first time only)
npm install

# Run the development server
npm run dev
```
*The app will be accessible at `http://localhost:5173`*

## 🔒 Admin Access

To manage products (Add/Update/Delete), click the **Lock Icon (🔒)** in the Navbar.

*   **Password**: `admin123`

## 📱 Mobile View
The application is fully responsive. Open it on your phone or use the browser's "Device Toolbar" to test mobile layouts.

## ☁️ Database
The application is connected to a live **TiDB Cloud MySQL** database.
*   **Connection**: Configured in `src/main/resources/application.properties`.
*   **Data Safety**: Data is persisted in the cloud, so it remains safe even if the application is restarted.
