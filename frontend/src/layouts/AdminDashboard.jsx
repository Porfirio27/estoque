import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Box, Package, User } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <header className="sidebar-header">
          <Box size={28} />
          <h1>Controle de Estoque</h1>
        </header>
        <nav className="sidebar-nav">
          <p>GERENCIAR</p>
          <Link to="/produtos">
            <Package size={18} />
            <span>Produtos</span>
          </Link>
          {/* Links futuros para Vendas, Categorias, etc. */}
        </nav>
      </aside>

      <div className="main-content">
        <header className="main-header">
          <h2>Painel Administrativo</h2>
          <div className="user-info">
            <span>Admin</span>
            <User size={20} />
          </div>
        </header>
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;