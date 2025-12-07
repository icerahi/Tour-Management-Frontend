# 🌍 Tour Management System - Frontend

A responsive and interactive Single Page Application (SPA) built with **React**, **TypeScript**, and **Vite**. This frontend connects to the backend API to allow users to book tours, manage their profiles, and provides an admin interface for managing tour packages.

## 🚀 Tech Stack

- **Framework:** React.js
- **Build Tool:** Vite
- **Language:** TypeScript
- **State Management:** Redux Toolkit / RTK Query
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Forms:** React Hook Form
- **UI Components:** Ant Design / Shadcn UI (Assumed)

## ✨ Features

- **Dynamic Tour Browsing:** View available tours with filtering and search capabilities.
- **User Authentication:** Login and Registration pages with JWT integration.
- **Booking Interface:** Seamless booking process for users.
- **Dashboard:**
  - **User Dashboard:** View booking history and profile settings.
  - **Admin Dashboard:** Manage users, create/edit tours, and view analytics.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop.

## 📂 Project Structure

```bash
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable UI components
├── layout/          # Main layouts (MainLayout, DashboardLayout)
├── pages/           # Page components (Home, TourDetails, Login)
├── redux/           # Redux slices and API services (RTK Query)
├── router/          # Route definitions
├── types/           # Global TypeScript interfaces
└── utils/           # Helper functions
```

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### 1\. Clone the Repository

```bash
git clone https://github.com/icerahi/Tour-Management-Frontend.git
cd Tour-Management-Frontend
```

### 2\. Install Dependencies

You can use `npm` or `bun` (detected `bun.lock` in repo).

```bash
npm install
# or
bun install
```

### 3\. Set Up Environment Variables

Create a `.env` file in the root directory and add your backend API URL:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 4\. Run the Application

**Development Mode:**

```bash
npm run dev
# or
bun dev
```

The app will typically run at `http://localhost:5173`.

**Build for Production:**

```bash
npm run build
# or
bun run build
```

## 🔌 API Integration

This frontend is designed to consume the **Tour Management Backend**. Ensure the backend server is running locally or provide the live server URL in the `.env` file.

## 🤝 Contributing

Contributions are welcome\!

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/cool-feature`).
3.  Commit your changes (`git commit -m 'Added cool feature'`).
4.  Push to the branch (`git push origin feature/cool-feature`).
5.  Open a Pull Request.


-----

**Developed by [Imran Hasan](https://github.com/icerahi)**

```
```
