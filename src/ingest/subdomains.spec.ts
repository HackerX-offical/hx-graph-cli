import { ingestSubdomains } from './subdomains.js';
import type { GraphNode } from '../types.js';

describe('ingestSubdomains', () => {
  it('adds nodes', () => {
    const nodes: GraphNode[] = [];
    ingestSubdomains({ domain: 'd.com', subdomains: ['x.d.com'] }, (n) => nodes.push(n), () => {});
    expect(nodes.length).toBe(2);
  });
});
