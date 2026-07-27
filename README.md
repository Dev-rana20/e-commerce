# 🌟 KÉLYS — Award-Winning 3D Luxury Perfume E-Commerce Platform

![KÉLYS Banner](https://img.shields.io/badge/KÉLYS-Maison_de_Parfum_Paris-D4B483?style=for-the-badge)
![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.4-6DB33F?style=for-the-badge&logo=springboot)
![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?style=for-the-badge&logo=three.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwindcss)

---

## 📌 Executive Summary

**KÉLYS** is a full-stack luxury e-commerce platform designed for an ultra-premium Parisian perfume house (*Maison de Parfum*). Built with a state-of-the-art 3D interactive web interface and a robust enterprise Java backend, KÉLYS pairs an immersive, high-end editorial shopping experience with secure, scalable RESTful micro-services.

---

## ✨ Key Features & Highlights

### 🎨 1. Immersive 3D & Micro-Interactive Visual Experience
- **Interactive 3D Perfume Bottle Shader**: Custom WebGL 3D perfume bottle model rendered using `@react-three/fiber` and `@react-three/drei` featuring dynamic light attenuation glass shaders and fluid mouse rotation.
- **Physics-Driven 2D Particle Canvas**: Real-time 280-particle canvas animation with custom swirl forces, attraction fields, and glowing mist particle interactions.
- **Fluid Custom Ring Cursor**: Custom lagged-LERP ring cursor with interactive hover state triggers across navigation links, buttons, and products.
- **Curated Editorial Aesthetic**: Bespoke color palette built around Ivory, Warm Champagne, Imperial Gold (`#C8A34A`), and Deep Charcoal, combined with fluid Framer Motion page transitions.

### 🛍️ 2. Comprehensive E-Commerce Functionality
- **Interactive Product Showcase**: Detailed fragrance profiles showcasing Olfactory Pyramids (Top, Heart, and Base Notes), fragrance concentrations, volume options, and stock status.
- **Cart & Slide-Over Drawer**: Instant client-side cart state management with real-time price calculations, coupon code validation, and drawer overlays.
- **User Wishlist & Reviews**: Interactive product wishlist toggle, star rating system, and verified buyer reviews.
- **Search & Advanced Filtering**: Filter fragrances by notes, collection, gender/scent profile, and price range.
- **Customer Account Management**: User profile, multi-address management, and complete real-time order history tracking.

### 🛡️ 3. Robust Spring Boot Backend & Security
- **Stateless JWT Security**: Spring Security 6 integration with dual JWT access & refresh tokens, BCrypt password hashing, and endpoint authorization checks.
- **Role-Based Access Control (RBAC)**: Secure separation between standard customer permissions (`ROLE_USER`) and admin privileges (`ROLE_ADMIN`).
- **Cloudinary Image Management**: API integration for direct cloud image uploading and image URL optimization for perfume assets.
- **Relational Data Integrity**: JPA/Hibernate ORM mapping with cascade rules and relational indexing across Users, Products, Orders, Inventory, Coupons, and Reviews.

### ⚡ 4. Admin Management Dashboard
- **Analytics & Metrics**: Executive overview of platform revenue, active order counts, product inventory levels, and registered users.
- **Product & Inventory Management**: CRUD operations for perfume catalog, stock adjustments, and multi-image uploads.
- **Order Lifecycle Management**: Order status tracking (`PENDING`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`).

---

## 🛠️ Technology Stack

| Domain | Technology / Library | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19, Vite 8, React Router v7 | High-performance SPA routing and building |
| **3D & Graphics** | Three.js, React Three Fiber (R3F), Drei | WebGL 3D rendering and glass shader materials |
| **Animation Engine** | Framer Motion 12, GSAP 3 | Staggered entrance animations & smooth transitions |
| **Styling** | Tailwind CSS v4, Vanilla CSS Variables | Luxury luxury champagne & gold design tokens |
| **HTTP Client** | Axios | Intercepted REST requests with JWT authentication |
| **Backend Framework**| Spring Boot 3.2.4 (Java 17) | Enterprise REST API server |
| **Database & ORM** | MySQL 8, Spring Data JPA, Hibernate | Relational persistence & HikariCP pooling |
| **Security & Auth** | Spring Security 6, JJWT 0.12.5 | JWT token validation filter & BCrypt hashing |
| **Cloud Storage** | Cloudinary Java SDK | Cloud image uploading for product assets |
| **Build Tools** | Maven (Backend), Vite / npm (Frontend) | Dependency management and build packaging |

---

## 📁 Repository Structure

```
Kelys/
├── backend/                        # Spring Boot REST API Application
│   ├── src/main/java/com/kelys/
│   │   ├── config/                # SecurityConfig, CloudinaryConfig
│   │   ├── controller/            # REST Controllers (Auth, Product, Order, Admin, etc.)
│   │   ├── dto/                   # Request & Response Data Transfer Objects
│   │   ├── entity/                # JPA Database Entities (User, Product, Order, etc.)
│   │   ├── exception/             # Centralized Global Exception Handling
│   │   ├── repository/            # Spring Data JPA Data Access Interfaces
│   │   ├── security/              # JWT Utility, Auth Filter & UserDetailsService
│   │   └── service/               # Core Business Logic Services
│   ├── src/main/resources/
│   │   └── application.properties # Server, DB, JWT, and Cloudinary Configurations
│   └── pom.xml                    # Maven Build Configuration
│
├── client/                         # React 19 + Vite Single Page Application
│   ├── src/
│   │   ├── components/            # 3D Canvas, Particles, Cursor, Headers, Drawers
│   │   ├── context/               # AuthContext, CartContext
│   │   ├── pages/                 # Public Views & Protected Admin Pages
│   │   │   └── admin/             # Admin Dashboard, Order & Product Management
│   │   ├── services/              # Axios API Service Modules
│   │   ├── index.css              # Design System Tokens & Global Styles
│   │   ├── App.jsx                # Main Layout Routing & Provider Wrapping
│   │   └── main.jsx               # React DOM Entry Point
│   ├── public/                    # Static Assets & 3D Models
│   ├── vercel.json                # Vercel SPA Rewrite Rules
│   └── package.json               # Node.js Dependencies & Scripts
│
└── README.md                       # Project Documentation
```

---

## 🔑 Database Entities & Schema Overview

- **`User`**: User profile, credentials, roles (`ROLE_USER`, `ROLE_ADMIN`).
- **`Product`**: Perfume metadata, volume, price, stock, olfactory notes association.
- **`ProductNote`**: Fragrance note breakdown (`TOP`, `HEART`, `BASE`).
- **`Category`**: Collection groupings (e.g., *Elixirs*, *Eau de Parfum*, *Private Blend*).
- **`Order` & `OrderItem`**: Purchased products snapshot, quantities, price, shipping address, status.
- **`Address`**: Multi-address management per user.
- **`Wishlist`**: User saved items.
- **`Review`**: User ratings, comments, verified purchase flags.
- **`Coupon`**: Discount codes, percentage/flat discounts, expiry limits.
- **`Payment`**: Transaction status and payment reference tracking.

---

## 📡 REST API Endpoint Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user account | Public |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token | Public |
| `GET` | `/api/auth/me` | Retrieve authenticated user profile | User |

### 📦 Products (`/api/products`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Fetch paginated product catalog | Public |
| `GET` | `/api/products/{id}` | Get product details with scent notes | Public |
| `GET` | `/api/products/search` | Search products by name/notes | Public |

### 🛍️ Orders & Cart (`/api/orders`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders` | Checkout and create a new order | User |
| `GET` | `/api/orders/my-orders` | Fetch authenticated user's order history | User |
| `GET` | `/api/orders/{id}` | Retrieve specific order details | User |

### 👑 Admin Management (`/api/admin`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/dashboard` | Get platform overview & revenue stats | Admin |
| `POST` | `/api/admin/products` | Create a new product listing | Admin |
| `PUT` | `/api/admin/products/{id}`| Update existing product details | Admin |
| `PUT` | `/api/admin/orders/{id}/status` | Update order processing status | Admin |

---

## 🚀 Local Setup & Installation Guide

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v18.0 or higher) & **npm**
- **Java Development Kit (JDK)** 17 or higher
- **Apache Maven** 3.8+
- **MySQL Server** 8.0+

---

### 1. Database Setup
Create a MySQL database named `kelys`:
```sql
CREATE DATABASE kelys CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

### 2. Backend Setup (`backend/`)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure environment variables or update `src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   
   app.jwt.secret=YOUR_SECURE_256_BIT_SECRET_KEY
   
   cloudinary.cloud_name=YOUR_CLOUDINARY_CLOUD_NAME
   cloudinary.api_key=YOUR_CLOUDINARY_API_KEY
   cloudinary.api_secret=YOUR_CLOUDINARY_API_SECRET
   ```

3. Build and launch the Spring Boot application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   The backend server will start on `http://localhost:8080`.

---

### 3. Frontend Setup (`client/`)

1. Open a new terminal and navigate to the `client/` directory:
   ```bash
   cd client
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Launch the Vite development server:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

---

## ⚙️ Building for Production

### Frontend Production Build
```bash
cd client
npm run build
```
The optimized production bundle will be generated in `client/dist/`.

### Backend Production Package
```bash
cd backend
mvn clean package -DskipTests
```
The executable `.jar` file will be generated in `backend/target/ecommerce-0.0.1-SNAPSHOT.jar`.

---

## 📄 License & Attribution

Designed and developed for **KÉLYS Maison de Parfum**. All rights reserved.
