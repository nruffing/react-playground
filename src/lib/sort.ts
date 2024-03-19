function swap<T>(x: number, y: number, arr: Array<T>) {
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

export default function insertionSort(arr: Array<number>): Array<number> {  
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
