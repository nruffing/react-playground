import { MaxHeap } from "./heap"

export function swap<T>(x: number, y: number, arr: Array<T>) {
  const tmp = arr[x]
  arr[x] = arr[y]
  arr[y] = tmp
}

function insert<T>(at: number, value: T, arr: Array<T>): Array<T> {
  return [...arr.slice(0, at), value, ...arr.slice(at)]
}

export function selectionSort(arr: Array<number>): Array<number> {
  if (!arr.length) {
    return arr
  }

  let start = 0

  while (start < arr.length - 1) {
    let min = arr[start]
    let minIndex = start
    for (var i = start + 1; i < arr.length; i++) {
      let value = arr[i]
      if (value < min) {
        minIndex = i
        min = value
      }
    }
    swap(minIndex, start, arr)
    start++
  }

  return arr
}

export function insertionSort(arr: Array<number>): Array<number> {
  if (arr.length < 2) {
    return arr
  }

  let result = [arr[0]]
  for (var i = 1; i < arr.length; i++) {
    let value = arr[i]
    let end = i
    while ((end - 1) >= 0 && result[end - 1] > value) {
      end--;
    }

    if (result[end] > value) {
      result = insert(end, value, result)
    } else {
      result.push(value)
    }
  }

  return result
}

export function mergeSort(arr: Array<number>): Array<number> {
  if (arr.length <= 1) {
    return arr
  }

  const mid = Math.ceil(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))

  const result = []
  let leftIndex = 0
  let rightIndex = 0
  let leftValue = left[leftIndex]
  let rightValue = right[rightIndex]
  while (leftIndex < left.length && rightIndex < right.length) {
    if (leftValue < rightValue) {
      result.push(leftValue)
      leftIndex++
      leftValue = left[leftIndex]
    } else {
      result.push(rightValue)
      rightIndex++
      rightValue = right[rightIndex]
    }
  }

  while (leftIndex < left.length) {
    result.push(left[leftIndex++])
  }

  while (rightIndex < right.length) {
    result.push(right[rightIndex++])
  }

  return result
}

function isSorted(arr: Array<number>): boolean {
  if (arr.length <= 1) {
    return true
  }
  let previous = arr[0]
  for (var i = 1; i < arr.length; i++) {
    const current = arr[i]
    if (previous > current) {
      return false
    }
    previous = current
  }
  return true
}

export function quickSort(arr: Array<number>): Array<number> {
  if (arr.length <= 1) {
    return arr
  }

  if (arr.length === 2) {
    const zero = arr[0]
    const one = arr[1]
    return zero < one ? [zero, one] : [one, zero]
  }

  if (isSorted(arr)) {
    return arr
  }

  let pivotIndex = Math.floor(arr.length / 2)

  const partition = (): { lt: number[], gt: number[] } => {
    const lt = [] as number[]
    const gt = [] as number[]

    const pivot = arr[pivotIndex]
    for (var value of arr) {
      if (value <= pivot) {
        lt.push(value)
      } else {
        gt.push(value)
      }
    }

    if (lt.length === 0 || gt.length === 0) {
      pivotIndex++
      if (pivotIndex === arr.length) {
        pivotIndex = 0
      }
      return partition()
    }

    return { lt, gt }
  }

  const { lt, gt } = partition()
  return [...quickSort(lt), ...quickSort(gt)]
}

export function heapSort(arr: Array<number>): Array<number> {
  if (arr.length <= 1) {
    return arr
  }
  const result = [] as number[]
  const unsorted = [...arr]
  for (var i = 0; i <= arr.length - 1; i++) {
    new MaxHeap(unsorted)
    result.unshift(unsorted.shift()!)
  }
  return result
}
