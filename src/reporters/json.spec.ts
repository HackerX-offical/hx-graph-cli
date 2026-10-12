import { graphToJson } from './json.js';

describe('graphToJson', () => {
  it('serializes', () => {
    expect(JSON.parse(graphToJson({ nodes: [], edges: [], sources: [] })).sources).toEqual([]);
  });
});
