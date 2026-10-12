import type { GraphNode } from '../types.js';
import { nodeId } from '../utils/node-id.js';

export function ingestFindings(
  data: Record<string, unknown>,
  addNode: (n: GraphNode) => void,
): void {
  if (!data.findings || !Array.isArray(data.findings)) return;
  for (const f of data.findings as Array<Record<string, unknown>>) {
    const fid = nodeId('finding', String(f.id ?? f.title));
    addNode({ id: fid, type: 'finding', label: String(f.title ?? f.id), meta: f });
  }
}
