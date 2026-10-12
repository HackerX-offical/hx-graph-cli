export interface GraphNode {
  id: string;
  type: 'domain' | 'ip' | 'url' | 'port' | 'finding';
  label: string;
  meta?: Record<string, unknown>;
}

export interface GraphEdge {
  from: string;
  to: string;
  rel: string;
}

export interface EngagementGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  sources: string[];
}
