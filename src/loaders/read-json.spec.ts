import { readJsonFile } from './read-json.js';
import { writeFileSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

describe('readJsonFile', () => {
  it('reads json', () => {
    const p = join(tmpdir(), `hx-graph-${Date.now()}.json`);
    writeFileSync(p, '{"a":1}');
    expect(readJsonFile(p)).toEqual({ a: 1 });
    unlinkSync(p);
  });
});
