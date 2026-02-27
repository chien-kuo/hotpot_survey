# Hotpot Survey (學生食材調查)

A modern, high-performance **Single Page Application (SPA)** built with React 19, Firebase, and Tailwind CSS v4. This project follows the **Service-Hook-UI** pattern for professional-grade maintainability and scalability.

## 🚀 Features

- **Real-time Synchronization:** Instant updates across all devices using Firestore listeners.
- **Role-Based Access:** 
  - **Public:** Anonymous access for survey submission and viewing data.
  - **Admin:** Password-protected dashboard for data management and exports.
- **Exports:** 
  - **CSV:** Tabular data export with timestamps.
  - **PDF:** High-quality, printable seat-based ingredient cards.
- **Modern UI:** Responsive design using Tailwind CSS v4 and FontAwesome.
- **Optimized Build:** Powered by Vite 7 for rapid development and production bundling.

## 🏗 Architecture (Service-Hook-UI Pattern)

- **`src/services/` (Service Layer):** Singleton initialization of Firebase services using modular SDK v9+.
- **`src/hooks/` (Hook Layer):** All business logic and Firebase interactions are encapsulated here (no direct SDK calls in UI).
- **`src/store/` (Store Layer):** Global state management using **Zustand** for auth and data persistence.
- **`src/components/` & `src/pages/` (UI Layer):** Purely presentational components styled with utility-first Tailwind CSS.

## 🛠 Tech Stack

- **Frontend:** React 18+ (Hooks, Functional Components)
- **State:** Zustand
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v6
- **Backend:** Firebase (Auth, Firestore)
- **Utilities:** jsPDF, html2canvas, FontAwesome

## 💻 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- npm or yarn

### 2. Environment Variables
Create a `.env` file in the root directory and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
VITE_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
```

### 3. Installation
```bash
npm install
```

### 4. Development
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

## 📂 Project Structure
```text
src/
  ├── components/     # Reusable UI Components
  ├── hooks/          # Custom Hooks (Business Logic)
  ├── services/       # Firebase Initialization
  ├── store/          # Zustand Global Stores
  ├── pages/          # Route Views (HomePage, AdminPage)
  ├── utils/          # Helpers & Constants
  └── main.jsx        # Entry point
```

## 📄 License
This project is for educational and survey purposes.
