import { describe, test, expect } from 'vitest'
import { MaxHeap } from './heap'

describe('MaxHeap', () => {
  test('MaxHeapify', () => {
    const heap = new MaxHeap([3, 9, 2, 1, 4, 5])
    expect(heap.arr).toEqual([9, 4, 5, 1, 3, 2]);
  })
})
