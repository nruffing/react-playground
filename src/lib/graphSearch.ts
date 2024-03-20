import { Queue } from "./queue"

/**
 * https://www.greatfrontend.com/questions/javascript/breadth-first-search?list=data-structures-algorithms
 * @param graph The adjacency list representing the graph.
 * @param source The source node to start traversal from. Has to be a valid node if graph is non-empty.
 * @return A BFS-traversed order of nodes.
 */
export default function breadthFirstSearch(
  graph: Record<string, Array<string>>,
  source: string,
): Array<string> {
  if (!Object.keys(graph).length) {
    return []
  }
  const result = [] as string[]
  const queue = new Queue<string>()
  queue.enqueue(source)
  const visited = new Set();

  while (!queue.isEmpty()) {
    const current = queue.dequeue() as string
    if (visited.has(current)) {
      continue
    }
    visited.add(current)
    result.push(current)
    for (const child of graph[current] ?? []) {
      queue.enqueue(child)
    }
  }

  return result
}
