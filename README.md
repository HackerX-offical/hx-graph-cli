# hx-graph-cli

Merge **multi-tool JSON artifacts** into one engagement knowledge graph for reporting
and downstream automation.

## Why this exists

HackerX CLIs each emit JSON (`hx-dns`, `hx-alive`, `hx-parse`, findings exports).
Copying fields by hand does not scale. This tool ingests known artifact shapes,
normalizes nodes and edges, and writes a single graph file for dashboards or custom
analytics.

## Features

- `merge` accepts multiple JSON files in one invocation
- Ingest adapters for subdomains, alive probes, hosts, and generic findings
- Stable node IDs for deduplication across runs
- stderr summary: `nodes=` / `edges=` counts

## Install

```bash
git clone https://github.com/HackerX-official/hx-graph-cli.git
cd hx-graph-cli
npm install
npm run build
npm link   # optional: global hx-graph
```

## Quick start

```bash
hx-graph merge dns.json alive.json findings.json -o engagement-graph.json
hx-dns subdomains target.com --json > dns.json
hx-alive batch --json < hosts.txt | hx-graph merge dns.json - -o graph.json
```

## Output

| Artifact   | Description                                             |
| ---------- | ------------------------------------------------------- |
| Graph JSON | `nodes[]`, `edges[]`, provenance from source files      |
| `-o` file  | Same JSON written to path; stdout omitted when `-o` set |
| stderr     | `nodes=N edges=M` after merge                           |

## Develop

```bash
npm run format
npm run build
npm test
npm run format:check
```

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for module layout and extension points.

## Ethics

Use only on systems and content you are **authorized** to test. See
[SECURITY.md](./SECURITY.md).

## License

Licensed under the [HackerX License](./LICENSE). Redistributions must retain copyright,
license text, and [NOTICE](./NOTICE) attribution per the license terms.
