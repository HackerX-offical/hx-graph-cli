import type { GraphEdge, GraphNode } from '../types.js';
import { nodeId } from '../utils/node-id.js';

export function ingestSubdomains(
  data: Record<string, unknown>,
  addNode: (n: GraphNode) => void,
  link: (from: string, to: string, rel: string) => void,
): void {
  if (!Array.isArray(data.subdomains)) return;
  const domain = String(data.domain ?? 'unknown');
  addNode({ id: nodeId('domain', domain), type: 'domain', label: domain });
  for (const sub of data.subdomains as string[]) {
    const id = nodeId('domain', sub);
    addNode({ id, type: 'domain', label: sub });
    link(nodeId('domain', domain), id, 'subdomain');
  }
}
