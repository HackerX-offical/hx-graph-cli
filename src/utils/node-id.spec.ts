import { nodeId } from './node-id.js';

describe('nodeId', () => {
  it('lowercases label', () => {
    expect(nodeId('domain', 'Example.COM')).toBe('domain:example.com');
  });
});
