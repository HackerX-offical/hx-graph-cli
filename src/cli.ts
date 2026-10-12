#!/usr/bin/env node
import { writeFileSync } from 'node:fs';
import { Command } from 'commander';
import { mergeJsonArtifacts } from './merge.js';
import { readJsonFile } from './loaders/read-json.js';
import { graphToJson } from './reporters/json.js';
import { summarizeGraph } from './analysis/summarize-graph.js';

const program = new Command();
program.name('hx-graph').description('Engagement graph merge engine').version('1.0.0');

program
  .command('merge')
  .description('Merge JSON files from hx-dns, hx-alive, hx-parse, hx-jwt, etc.')
  .argument('<files...>', 'JSON artifact paths')
  .option('-o, --out <path>', 'write merged graph JSON')
  .action((files: string[], opts: { out?: string }) => {
    const payloads = files.map((f) => readJsonFile(f));
    const graph = mergeJsonArtifacts(files, payloads);
    const json = graphToJson(graph);
    if (opts.out) writeFileSync(opts.out, json, 'utf8');
    else console.log(json);
    const s = summarizeGraph(graph);
    console.error(`nodes=${s.nodeCount} edges=${s.edgeCount}`);
  });

program.parse();
