import React from 'react';
import './ControlsBar.scss';

interface ControlButton {
  icon: string;
  title: string;
  isActive?: boolean;
  onClick: () => void;
}

interface ControlsBarProps {
  buttons: ControlButton[];
}

const ControlsBar: React.FC<ControlsBarProps> = ({ buttons }) => {
  return (
    <div className="controls-bar">
      {buttons.map((button, index) => (
        <button 
          key={index}
          className={`controls-bar__button ${button.isActive ? 'is-active' : ''}`}
          onClick={button.onClick}
          aria-label={button.title}
        >
          <span className="material-icons">{button.icon}</span>
        </button>
      ))}
    </div>
  );
};

export default ControlsBar; 