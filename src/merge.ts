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

function nodeId(type: string, label: string) {
  return `${type}:${label.toLowerCase()}`;
}

export function mergeJsonArtifacts(paths: string[], payloads: unknown[]): EngagementGraph {
  const nodes = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];

  const addNode = (n: GraphNode) => nodes.set(n.id, n);
  const link = (from: string, to: string, rel: string) => edges.push({ from, to, rel });

  for (const raw of payloads) {
    const data = raw as Record<string, unknown>;

    if (Array.isArray(data.subdomains)) {
      const domain = String(data.domain ?? 'unknown');
      addNode({ id: nodeId('domain', domain), type: 'domain', label: domain });
      for (const sub of data.subdomains as string[]) {
        const id = nodeId('domain', sub);
        addNode({ id, type: 'domain', label: sub });
        link(nodeId('domain', domain), id, 'subdomain');
      }
    }

    if (Array.isArray(data)) {
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

    if (data.hosts && Array.isArray(data.hosts)) {
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

    if (data.findings && Array.isArray(data.findings)) {
      for (const f of data.findings as Array<Record<string, unknown>>) {
        const fid = nodeId('finding', String(f.id ?? f.title));
        addNode({ id: fid, type: 'finding', label: String(f.title ?? f.id), meta: f });
      }
    }
  }

  return {
    nodes: [...nodes.values()],
    edges,
    sources: paths,
  };
}
