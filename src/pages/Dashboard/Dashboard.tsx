import React, { useState, useCallback } from 'react';
import CategoryGraph from '@/components/Visualization/CategoryGraph/CategoryGraph';
import { mockCategoryData } from '@/mocks/categoryData';
import VisualizationControls from './components/VisualizationControls';
import Breadcrumbs from './components/Breadcrumbs';
import './Dashboard.scss';
import DashboardAnalytics from './components/DashboardAnalytics';
import { CategoryNode } from '@/types/category';
import { useVisualization } from '@/hooks/useVisualization';
import TreeView from '@/components/Visualization/TreeView/TreeView';

type VisualizationType = 'graph' | 'tree';

const Dashboard: React.FC = () => {
  const [resetZoomFn, setResetZoomFn] = useState<(() => void) | null>(null);
  const [visualizationType, setVisualizationType] = useState<VisualizationType>('graph');
  
  const { 
    currentData,
    categoryPath,
    originalData,
    navigateToCategory,
    resetZoom,
    initializeData,
    findCategoryById,
    handleCategoryClick
  } = useVisualization(window.innerWidth, window.innerHeight);

  // 🔄 Инициализация данных при монтировании
  React.useEffect(() => {
    initializeData(mockCategoryData);
  }, [initializeData]);

  const handleResetZoom = useCallback(() => {
    resetZoomFn?.();
    resetZoom();
  }, [resetZoomFn, resetZoom]);

  const handleSetResetZoom = useCallback((resetFn: () => void) => {
    setResetZoomFn(() => resetFn);
  }, []);

  const handleNavigate = useCallback((categoryId: number | null) => {
    navigateToCategory(categoryId);
  }, [navigateToCategory]);

  const handleViewChange = useCallback((type: VisualizationType) => {
    setVisualizationType(type);
  }, []);

  // Оставляем только один эффект для отслеживания изменений данных
  React.useEffect(() => {
    console.log('📱 Dashboard state updated:', { 
      categoryPath, 
      currentDataLength: currentData?.length 
    });
  }, [categoryPath, currentData]);

  return (
    <div className="dashboard">
      <Breadcrumbs 
        categoryPath={categoryPath}
        originalData={originalData}
        findCategoryById={findCategoryById}
        onNavigate={handleNavigate}
      />
      <VisualizationControls 
        onViewChange={handleViewChange}
        onResetZoom={handleResetZoom}
        currentView={visualizationType}
      />
      <div className="dashboard__visualization">
        {visualizationType === 'graph' ? (
          <CategoryGraph 
            initialData={mockCategoryData}
            currentData={currentData}
            width={window.innerWidth}
            height={window.innerHeight}
            onResetZoom={handleSetResetZoom}
            onCategoryClick={handleCategoryClick}
          />
        ) : (
          <TreeView
            data={currentData || mockCategoryData}
            width={window.innerWidth}
            height={window.innerHeight}
            onCategoryClick={handleCategoryClick}
            onResetZoom={handleSetResetZoom}
          />
        )}
      </div>
      <DashboardAnalytics />
    </div>
  );
};

export default Dashboard; 