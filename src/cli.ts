#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { Command } from 'commander';
import { mergeJsonArtifacts } from './merge.js';

const program = new Command();
program.name('hx-graph').description('Engagement graph merge engine').version('1.0.0');

program
  .command('merge')
  .description('Merge JSON files from hx-dns, hx-alive, hx-parse, hx-jwt, etc.')
  .argument('<files...>', 'JSON artifact paths')
  .option('-o, --out <path>', 'write merged graph JSON')
  .action((files: string[], opts: { out?: string }) => {
    const payloads = files.map((f) => JSON.parse(readFileSync(f, 'utf8')));
    const graph = mergeJsonArtifacts(files, payloads);
    const json = JSON.stringify(graph, null, 2);
    if (opts.out) writeFileSync(opts.out, json, 'utf8');
    else console.log(json);
    console.error(`nodes=${graph.nodes.length} edges=${graph.edges.length}`);
  });

program.parse();
