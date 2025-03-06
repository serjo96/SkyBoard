import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.scss';

const Layout: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="layout">
      <Header />
      <div className="layout-content">
        <button 
          className="layout__nav-button"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <span className="material-icons">menu</span>
        </button>

        <Sidebar
          isOpen={isNavOpen}
          isNavigation={true}
          onToggle={() => setIsNavOpen(!isNavOpen)}
        />
        <main className="layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout; 