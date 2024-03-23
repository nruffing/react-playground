import { swap } from './sort'

export class MaxHeap {
  arr: number[]

  constructor(arr: number[]) {
    this.arr = arr
    this.maxHeapify()
  }

  getLeftChildIndex(index: number): number | undefined {
    const child =  (2 * index) + 1
    return child < this.arr.length ? child : undefined
  }

  getRightChildIndex(index: number): number | undefined {
    const child =  (2 * index) + 2
    return child < this.arr.length ? child : undefined
  }

  getParentFromLeftIndex(index: number): number | undefined {
    const parent = Math.floor((index - 1) / 2)
    return parent < this.arr.length ? parent : undefined
  }

  getParentFromRightIndex(index: number): number | undefined {
    const parent = Math.floor((index - 2) / 2)
    return parent < this.arr.length ? parent : undefined
  }

  heapify(index: number) {
    if (index >= this.arr.length) {
      throw new Error('index not part of heap')
    }

    const leftChildIndex = this.getLeftChildIndex(index)
    const rightChildIndex = this.getRightChildIndex(index)

    const largestIndex = leftChildIndex === undefined
      ? rightChildIndex
      : rightChildIndex === undefined
        ? leftChildIndex
        : (this.arr[leftChildIndex] > this.arr[rightChildIndex])
          ? leftChildIndex
          : rightChildIndex

    const largestValue = this.arr[largestIndex!]
    if (largestValue > this.arr[index]) {
      swap(largestIndex!, index, this.arr)
      this.heapify(largestIndex === leftChildIndex ? this.getParentFromLeftIndex(index)! : this.getParentFromRightIndex(index)!)
    }
  }

  maxHeapify() {
    if (this.arr.length <= 1) {
      return
    }
    let index = this.arr.length === 2 ? 0 : Math.floor(this.arr.length / 2) + 1
    while (index >= 0) {
      this.heapify(index)
      index--
    }
  }
}
