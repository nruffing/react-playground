import { describe, test, expect } from 'vitest'
import { quickSort } from './sort'

describe('quickSort', () => {
  test('more than two elements', () => {
    expect(quickSort([4, 5, 6, 1, 2, 3])).toEqual([1, 2, 3, 4, 5, 6]);
  })
})
