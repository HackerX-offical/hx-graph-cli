import type { GraphNode } from '../types.js';
import { nodeId } from '../utils/node-id.js';

export function ingestHosts(
  data: Record<string, unknown>,
  addNode: (n: GraphNode) => void,
  link: (from: string, to: string, rel: string) => void,
): void {
  if (!data.hosts || !Array.isArray(data.hosts)) return;
  for (const h of data.hosts as Array<Record<string, unknown>>) {
    const ip = String(h.ip);
    const ipId = nodeId('ip', ip);
    addNode({ id: ipId, type: 'ip', label: ip });
    for (const p of (h.ports as Array<Record<string, unknown>>) ?? []) {
      const portId = nodeId('port', `${ip}:${p.port}`);
      addNode({ id: portId, type: 'port', label: `${p.port}/${p.protocol}` });
      link(ipId, portId, 'open-port');
    }
  }
}
