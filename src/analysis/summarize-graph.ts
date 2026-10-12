import type { EngagementGraph } from '../types.js';

export function summarizeGraph(g: EngagementGraph) {
  const byType: Record<string, number> = {};
  for (const n of g.nodes) byType[n.type] = (byType[n.type] ?? 0) + 1;
  return { nodeCount: g.nodes.length, edgeCount: g.edges.length, byType };
}
