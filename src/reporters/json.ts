import type { EngagementGraph } from '../types.js';

export function graphToJson(graph: EngagementGraph): string {
  return JSON.stringify(graph, null, 2);
}
