export function nodeId(type: string, label: string): string {
  return `${type}:${label.toLowerCase()}`;
}
