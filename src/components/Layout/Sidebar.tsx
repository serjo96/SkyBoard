import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import './Sidebar.scss';

interface SidebarProps {
  isOpen?: boolean;
  position?: 'left' | 'right';
  title?: string;
  icon?: string;
  onToggle?: () => void;
  className?: string;
  isNavigation?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  isNavigation,
  onToggle
}) => {
  return (
    <aside className={`sidebar ${isOpen ? 'is-open' : ''} ${isNavigation ? 'sidebar--navigation' : ''}`}>
      <div className="sidebar__header">
        <h2 className="sidebar__title">Navigation</h2>
        <button 
          className="sidebar__close-button"
          onClick={onToggle}
        >
          <span className="material-icons">close</span>
        </button>
      </div>
      <div className="sidebar__content">
        <nav className="sidebar__nav">
          <NavLink to={ROUTES.DASHBOARD}>
            <span className="material-icons">dashboard</span>
            Dashboard
          </NavLink>
          <NavLink to={ROUTES.TASKS.LIST}>
            <span className="material-icons">task</span>
            Tasks
          </NavLink>
          <NavLink to={ROUTES.CATEGORIES.LIST}>
            <span className="material-icons">category</span>
            Categories
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar; 