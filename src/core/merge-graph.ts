import type { EngagementGraph, GraphEdge, GraphNode } from '../types.js';
import { ingestSubdomains } from '../ingest/subdomains.js';
import { ingestAliveList } from '../ingest/alive.js';
import { ingestHosts } from '../ingest/hosts.js';
import { ingestFindings } from '../ingest/findings.js';

export function mergeJsonArtifacts(paths: string[], payloads: unknown[]): EngagementGraph {
  const nodes = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];
  const addNode = (n: GraphNode) => nodes.set(n.id, n);
  const link = (from: string, to: string, rel: string) => edges.push({ from, to, rel });

  for (const raw of payloads) {
    const data = raw as Record<string, unknown>;
    ingestSubdomains(data, addNode, link);
    ingestAliveList(raw, addNode, link);
    ingestHosts(data, addNode, link);
    ingestFindings(data, addNode);
  }

  return { nodes: [...nodes.values()], edges, sources: paths };
}
