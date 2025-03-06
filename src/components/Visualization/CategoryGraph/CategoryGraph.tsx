import React from 'react';
import { Group } from '@visx/group';
import { Circle } from '@visx/shape';
import { Text } from '@visx/text';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { CategoryNode } from '@/types/visualization.types';
import { useVisualization } from '@/hooks/useVisualization';

interface CategoryNode {
  id: number;
  x: number;
  y: number;
  count: number;
  category: string;
  subcategories?: CategoryNode[];
}

interface CategoryGraphProps {
  initialData: CategoryNode[];
  currentData: CategoryNode[] | null;
  width?: number;
  height?: number;
  onResetZoom?: (resetTransform: () => void) => void;
  onCategoryClick: (category: CategoryNode) => void;
}

const SubCategories: React.FC<{ 
  node: CategoryNode; 
  parentRadius: number;
  onSubCategoryClick: (category: CategoryNode) => void;
}> = ({ node, parentRadius, onSubCategoryClick }) => {
  if (!node.subcategories?.length) return null;

  const subCategories = node.subcategories.slice(0, 3);
  const subRadius = parentRadius * 0.3;
  
  const positions = [
    { x: 0, y: -subRadius }, // верхний круг
    { x: -subRadius, y: subRadius }, // нижний левый
    { x: subRadius, y: subRadius }, // нижний правый
  ];

  return (
    <>
      {subCategories.map((subCategory, index) => (
        <Group 
          key={subCategory.id}
          transform={`translate(${positions[index].x}, ${positions[index].y})`}
          onClick={(e) => {
            e.stopPropagation(); // Предотвращаем всплытие события
            onSubCategoryClick(subCategory);
          }}
          style={{ cursor: 'pointer' }}
        >
          <Circle
            r={subRadius}
            fill="rgba(255, 255, 255, 0.3)"
          />
          <Text
            dy={-2}
            fill="white"
            textAnchor="middle"
            fontSize={10}
          >
            {subCategory.category}
          </Text>
        </Group>
      ))}
    </>
  );
};

const CategoryGraph: React.FC<CategoryGraphProps> = ({
  initialData,
  currentData: propCurrentData,
  width = window.innerWidth,
  height = window.innerHeight,
  onResetZoom,
  onCategoryClick
}) => {
  const {
    prepareData,
    scaleRadius,
  } = useVisualization(width, height);

  const data = prepareData(propCurrentData || initialData);
  const radiusScale = scaleRadius(data);

  // Вычисляем границы для центрирования
  const padding = 100; // отступ от краев
  const bounds = React.useMemo(() => {
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    data.forEach(node => {
      const radius = radiusScale(node.count);
      minX = Math.min(minX, node.x - radius);
      maxX = Math.max(maxX, node.x + radius);
      minY = Math.min(minY, node.y - radius);
      maxY = Math.max(maxY, node.y + radius);
    });

    return {
      x: minX - padding,
      y: minY - padding,
      width: maxX - minX + padding * 2,
      height: maxY - minY + padding * 2
    };
  }, [data, radiusScale]);

  // Создаем стабильную функцию для установки resetTransform
  const handleResetTransform = React.useCallback((resetTransform: () => void) => {
    onResetZoom?.(resetTransform);
  }, [onResetZoom]);

  return (
    <div className="category-graph">
      <TransformWrapper
        initialScale={1}
        minScale={0.8}
        maxScale={4}
        centerOnInit={true}
        wheel={{ disabled: false }}
        limitToBounds={true}
        boundaryRatio={0.6}
        initialPositionX={(width - bounds.width) / 2 - bounds.x}
        initialPositionY={(height - bounds.height) / 2 - bounds.y}
      >
        {({ zoomIn, zoomOut, resetTransform }) => {
          // Вызываем handleResetTransform один раз при монтировании
          React.useEffect(() => {
            handleResetTransform(resetTransform);
          }, []);

          return (
            <TransformComponent
              wrapperStyle={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden"
              }}
              contentStyle={{
                width: "100%",
                height: "100%"
              }}
            >
              <svg
                width={width}
                height={height}
                style={{ 
                  background: '#111',
                  overflow: 'hidden', // меняем на hidden
                  display: 'block'
                }}
                viewBox={`${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`}
                preserveAspectRatio="xMidYMid meet"
              >
                <Group>
                  {data.map((node) => (
                    <Group
                      key={node.category}
                      transform={`translate(${node.x}, ${node.y})`}
                      onClick={() => onCategoryClick(node)}
                      style={{ cursor: 'pointer' }}
                    >
                      <Circle
                        r={radiusScale(node.count)}
                        fill="rgba(255, 255, 255, 0.5)"
                      />
                      <SubCategories 
                        node={node} 
                        parentRadius={radiusScale(node.count)}
                        onSubCategoryClick={onCategoryClick}
                      />
                      <Text
                        dy={-radiusScale(node.count) - 15}
                        fill="white"
                        textAnchor="middle"
                        fontSize={12}
                      >
                        {node.category}
                      </Text>
                    </Group>
                  ))}
                </Group>
              </svg>
            </TransformComponent>
          );
        }}
      </TransformWrapper>
    </div>
  );
};

export default CategoryGraph; 