import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import AdminDashboard from './layouts/AdminDashboard.jsx';
import PaginaProdutos from './pages/PaginaProdutos.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminDashboard />,
    children: [
      { index: true, element: <Navigate to="/produtos" replace /> }, // Redireciona a home para /produtos
      { path: "produtos", element: <PaginaProdutos /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);