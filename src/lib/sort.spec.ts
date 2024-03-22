import { describe, test, expect } from 'vitest'
import { heapSort, quickSort } from './sort'

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
