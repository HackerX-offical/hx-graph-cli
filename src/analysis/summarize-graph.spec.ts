import { summarizeGraph } from './summarize-graph.js';

describe('summarizeGraph', () => {
  it('counts', () => {
    const s = summarizeGraph({
      nodes: [{ id: '1', type: 'ip', label: '1' }],
      edges: [],
      sources: [],
    });
    expect(s.nodeCount).toBe(1);
  });
});
