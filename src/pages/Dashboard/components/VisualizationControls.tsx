import React from 'react';
import './VisualizationControls.scss';

interface VisualizationControlsProps {
  onViewChange: (type: 'graph' | 'tree') => void;
  onResetZoom: () => void;
  currentView: 'graph' | 'tree';
}

const VisualizationControls: React.FC<VisualizationControlsProps> = ({
  onViewChange,
  onResetZoom,
  currentView
}) => {
  return (
    <div className="visualization-controls">
      <button
        className={`visualization-controls__button ${currentView === 'graph' ? 'active' : ''}`}
        onClick={() => onViewChange('graph')}
      >
        Graph View
      </button>
      <button
        className={`visualization-controls__button ${currentView === 'tree' ? 'active' : ''}`}
        onClick={() => onViewChange('tree')}
      >
        Tree View
      </button>
      <button
        className="visualization-controls__button"
        onClick={onResetZoom}
      >
        Reset Zoom
      </button>
    </div>
  );
};

export default VisualizationControls; 