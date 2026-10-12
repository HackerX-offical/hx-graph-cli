import type { GraphNode } from '../types.js';
import { nodeId } from '../utils/node-id.js';

export function ingestAliveList(
  data: unknown,
  addNode: (n: GraphNode) => void,
  link: (from: string, to: string, rel: string) => void,
): void {
  if (!Array.isArray(data)) return;
  for (const item of data as Array<Record<string, unknown>>) {
    if (item.host && item.alive) {
      const id = nodeId('url', String(item.url ?? item.host));
      addNode({ id, type: 'url', label: String(item.host), meta: item });
      if (item.tlsSubject) {
        const fid = nodeId('finding', `tls:${item.host}`);
        addNode({ id: fid, type: 'finding', label: `TLS CN ${item.tlsSubject}` });
        link(id, fid, 'tls');
      }
    }
  }
}
