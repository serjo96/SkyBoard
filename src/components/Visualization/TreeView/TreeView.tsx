import React from 'react';
import { Group } from '@visx/group';
import { Tree, hierarchy } from '@visx/hierarchy';
import { LinkHorizontal } from '@visx/shape';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { BaseCategoryNode } from '@/types/visualization.types';

interface TreeViewProps {
  data: BaseCategoryNode[];
  width: number;
  height: number;
  onCategoryClick: (category: BaseCategoryNode) => void;
  onResetZoom?: (resetTransform: () => void) => void;
}

const TreeView: React.FC<TreeViewProps> = ({
  data,
  width,
  height,
  onCategoryClick,
  onResetZoom,
}) => {
  const margin = { top: 20, left: 40, right: 40, bottom: 20 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Преобразуем плоские данные в иерархическую структуру
  const root = React.useMemo(() => {
    // Создаем корневой узел с переданными данными как подкатегориями
    const rootNode: BaseCategoryNode = {
      id: 0,
      category: 'Root',
      count: 0,
      subcategories: data
    };
    
    // Создаем иерархию для D3
    const hierarchyData = hierarchy(rootNode, node => node.subcategories);
    
    return hierarchyData;
  }, [data]);

  // Создаем стабильную функцию для установки resetTransform
  const handleResetTransform = React.useCallback((resetTransform: () => void) => {
    onResetZoom?.(resetTransform);
  }, [onResetZoom]);

  return (
    <div className="tree-view">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={2}
        centerOnInit={true}
        wheel={{ disabled: false }}
        limitToBounds={true}
      >
        {({ zoomIn, zoomOut, resetTransform }) => {
          // Вызываем handleResetTransform один раз при монтировании
          React.useEffect(() => {
            handleResetTransform(resetTransform);
          }, []);

          return (
            <TransformComponent
              wrapperStyle={{
                width: "100%",
                height: "100%",
                overflow: "hidden"
              }}
            >
              <svg width={width} height={height}>
                <rect width={width} height={height} fill="#111" rx={14} />
                <Group top={margin.top} left={margin.left}>
                  <Tree
                    root={root}
                    size={[innerHeight, innerWidth]}
                    separation={(a, b) => (a.parent === b.parent ? 1 : 2) / a.depth}
                  >
                    {tree => (
                      <Group>
                        {/* Рисуем линии между узлами */}
                        {tree.links().map((link, i) => (
                          <LinkHorizontal
                            key={i}
                            data={link}
                            stroke="rgba(255,255,255,0.2)"
                            fill="none"
                            strokeWidth={1}
                          />
                        ))}
                        {/* Рисуем узлы */}
                        {tree.descendants().map((node, i) => (
                          <Group
                            key={i}
                            top={node.x}
                            left={node.y}
                            onClick={() => {
                              if (node.data.id !== 0) { // Игнорируем клик на корневом узле
                                onCategoryClick(node.data);
                              }
                            }}
                            style={{ cursor: node.data.id !== 0 ? 'pointer' : 'default' }}
                          >
                            <circle
                              r={node.data.id === 0 ? 0 : 20} // Скрываем круг для корневого узла
                              fill="rgba(255,255,255,0.5)"
                            />
                            {node.data.id !== 0 && ( // Не показываем текст для корневого узла
                              <text
                                dy=".33em"
                                fontSize={9}
                                fontFamily="Arial"
                                textAnchor="middle"
                                fill="white"
                                style={{ pointerEvents: 'none' }}
                              >
                                {node.data.category}
                              </text>
                            )}
                          </Group>
                        ))}
                      </Group>
                    )}
                  </Tree>
                </Group>
              </svg>
            </TransformComponent>
          );
        }}
      </TransformWrapper>
    </div>
  );
};

export default TreeView; 