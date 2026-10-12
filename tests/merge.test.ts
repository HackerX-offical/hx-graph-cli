import { mergeJsonArtifacts } from '../src/merge.js';

describe('mergeJsonArtifacts', () => {
  it('links subdomains', () => {
    const g = mergeJsonArtifacts(['a.json'], [{ domain: 'example.com', subdomains: ['www.example.com'] }]);
    expect(g.nodes.length).toBeGreaterThanOrEqual(2);
    expect(g.edges.length).toBeGreaterThanOrEqual(1);
  });
});
