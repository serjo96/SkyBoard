export interface CategoryNode {
  id: number;
  x: number;
  y: number;
  count: number;
  category: string;
  subcategories?: CategoryNode[];
}

export interface VisualizationConfig {
  width: number;
  height: number;
} 