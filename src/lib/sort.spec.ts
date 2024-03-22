import { describe, test, expect } from 'vitest'
import { heapSort, quickSort, topologicalSort } from './sort'

describe('quickSort', () => {
  test('more than two elements', () => {
    expect(quickSort([4, 5, 6, 1, 2, 3])).toEqual([1, 2, 3, 4, 5, 6]);
  })
})

describe('heapSort', () => {
  test('two elements', () => {
    expect(heapSort([2, 1])).toEqual([1, 2])
  })
})

describe('topologicalSort', () => {
  test('empty graph', () => {
    expect(topologicalSort({})).toEqual([]);
  });

  test('graphs with one node', () => {
    expect(topologicalSort({ A: [] })).toEqual(['A']);
  });

  test.only('graphs with two nodes', () => {
    expect(topologicalSort({ A: ['B'], B: [] })).toEqual(['A', 'B']);
    expect(topologicalSort({ A: [], B: ['A'] })).toEqual(['B', 'A']);
  });
});
