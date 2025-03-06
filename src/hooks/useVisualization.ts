import { useCallback, useState } from 'react';
import * as d3 from 'd3';
import { CategoryNode } from '@/types/visualization.types';
import { BaseCategoryNode } from '@/types/visualization.types';

const prepareGraphData = (data: BaseCategoryNode[], width: number, height: number): CategoryNode[] => {
  return data.map((node, index, array) => ({
    ...node,
    x: (width / (array.length + 1)) * (index + 1),
    y: height / 2
  }));
};

const prepareTreeData = (data: BaseCategoryNode[]): BaseCategoryNode[] => {
  return data;
}; // Для древовидного представления нам не нужны координаты

export const useVisualization = (width: number, height: number) => {
  // Храним оригинальные данные
  const [originalData, setOriginalData] = useState<CategoryNode[]>([]);
  // Текущие отображаемые данные
  const [currentData, setCurrentData] = useState<CategoryNode[] | null>(null);
  // История ID категорий для навигации
  const [categoryPath, setCategoryPath] = useState<number[]>([]);
  const [visualizationType, setVisualizationType] = useState<'graph' | 'tree'>('graph');

  const scaleRadius = useCallback((data: CategoryNode[]) => {
    return d3.scaleSqrt()
      .domain([
        d3.min(data, d => d.count) || 0,
        d3.max(data, d => d.count) || 0
      ])
      .range([50, 120]);
  }, []);

  const prepareData = useCallback((data: BaseCategoryNode[]) => {
    return visualizationType === 'graph' 
      ? prepareGraphData(data, width, height)
      : prepareTreeData(data);
  }, [visualizationType, width, height]);

  // Обновляем initializeData
  const initializeData = useCallback((data: BaseCategoryNode[]) => {
    setOriginalData(data);
    setCurrentData(prepareData(data));
  }, [prepareData]);

  // Находим категорию по ID в оригинальных данных
  const findCategoryById = useCallback((id: number, data: CategoryNode[] = originalData): CategoryNode | null => {
    for (const category of data) {
      if (category.id === id) return category;
      if (category.subcategories) {
        const found = findCategoryById(id, category.subcategories);
        if (found) return found;
      }
    }
    return null;
  }, [originalData]);

  // Выносим buildPath в отдельную функцию, чтобы использовать в разных местах
  const buildPath = useCallback((targetId: number, data: CategoryNode[] = originalData): number[] => {
    const findPathToTarget = (
      currentId: number, 
      currentData: CategoryNode[], 
      currentPath: number[] = []
    ): number[] | null => {
      for (const category of currentData) {
        if (category.id === currentId) {
          return [...currentPath, category.id];
        }
        if (category.subcategories) {
          const pathInSubcategories = findPathToTarget(
            currentId, 
            category.subcategories, 
            [...currentPath, category.id]
          );
          if (pathInSubcategories) {
            return pathInSubcategories;
          }
        }
      }
      return null;
    };

    const path = findPathToTarget(targetId, data);
    return path || [targetId];
  }, [originalData]);

  // Обновляем handleCategoryClick
  const handleCategoryClick = useCallback((category: BaseCategoryNode) => {
    console.log('🎯 Category clicked:', category.category);
    
    const fullPath = buildPath(category.id);
    setCategoryPath(fullPath);

    if (category.subcategories) {
      setCurrentData(prepareData(category.subcategories));
    } else {
      const parentCategory = findCategoryById(fullPath[fullPath.length - 2]);
      if (parentCategory?.subcategories) {
        setCurrentData(prepareData(parentCategory.subcategories));
      }
    }
  }, [buildPath, findCategoryById, prepareData]);

  const navigateToCategory = useCallback((categoryId: number | null) => {
    console.log('🚀 Navigation to:', categoryId === null ? 'root' : `category ${categoryId}`);

    if (categoryId === null) {
      setCategoryPath([]);
      setCurrentData(originalData);
      return;
    }

    const targetCategory = findCategoryById(categoryId);
    if (!targetCategory) return;

    const newPath = buildPath(categoryId);
    setCategoryPath(newPath);
    
    setCurrentData(targetCategory.subcategories?.map((sub, i) => ({
      ...sub,
      x: (width / (targetCategory.subcategories!.length + 1)) * (i + 1),
      y: height / 2
    })) || null);
  }, [originalData, width, height, findCategoryById, buildPath]);

  const resetZoom = useCallback(() => {
    setCategoryPath([]);
    setCurrentData(originalData);
  }, [originalData]);

  return {
    currentData,
    categoryPath,
    originalData,
    scaleRadius,
    handleCategoryClick,
    navigateToCategory,
    resetZoom,
    initializeData,
    findCategoryById,
    setVisualizationType,
    prepareData
  };
}; 