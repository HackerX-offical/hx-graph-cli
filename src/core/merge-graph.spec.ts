import { mergeJsonArtifacts } from './merge-graph.js';

describe('mergeJsonArtifacts', () => {
  it('merges subdomains', () => {
    const g = mergeJsonArtifacts(['a.json'], [{ domain: 'ex.com', subdomains: ['a.ex.com'] }]);
    expect(g.nodes.length).toBeGreaterThan(1);
  });
});
