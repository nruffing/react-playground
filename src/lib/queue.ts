// From: https://www.greatfrontend.com/questions/javascript/breadth-first-search?list=data-structures-algorithms

/*  Auxiliary classes */

/**
 * A Queue class with O(1) enqueue and dequeue is provided for you.
 * You can use it directly should you wish to.
 *
 * Example usage:
 * const q = new Queue();
 * q.enqueue('a');
 * q.enqueue('b');
 * q.dequeue(); //'a'
 * q.isEmpty(); // False
 */
class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class Queue<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  enqueue(item: T): void {
    const newNode = new Node(item);
    if (this.isEmpty()) {
      this.head = newNode;
    } else if (this.tail) {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.length++;
  }

  dequeue(): T | null {
    if (this.isEmpty() || !this.head) {
      return null;
    } else {
      const removedNode = this.head;
      this.head = this.head.next;
      removedNode.next = null;
      this.length--;
      if (this.isEmpty()) {
        this.tail = null;
      }
      return removedNode.value;
    }
  }
}

// https://greatfrontend.com/questions/javascript/queue?list=data-structures-algorithms
export class MyQueue<T> {
  arr: T[] = []

  /**
   * Adds an item to the back of the queue.
   * @param {T} item The item to be pushed onto the queue.
   * @return {number} The new length of the queue.
   */
  enqueue(item: T): number {
    this.arr.push(item)
    return this.arr.length
  }

  /**
   * Removes an item from the front of the queue.
   * @return {T | undefined} The item at the front of the queue if it is not empty, `undefined` otherwise.
   */
  dequeue(): T | undefined {
    return this.arr.shift()
  }

  /**
   * Determines if the queue is empty.
   * @return {boolean} `true` if the queue has no items, `false` otherwise.
   */
  isEmpty(): boolean {
    return this.arr.length === 0
  }

  /**
   * Returns the item at the front of the queue without removing it from the queue.
   * @return {T | undefined} The item at the front of the queue if it is not empty, `undefined` otherwise.
   */
  front(): T | undefined {
    return this.isEmpty() ? undefined : this.arr[0]
  }

  /**
   * Returns the item at the back of the queue without removing it from the queue.
   * @return {T | undefined} The item at the back of the queue if it is not empty, `undefined` otherwise.
   */
  back(): T | undefined {
    return this.isEmpty() ? undefined : this.arr[this.arr.length - 1]
  }

  /**
   * Returns the number of items in the queue.
   * @return {number} The number of items in the queue.
   */
  length(): number {
    return this.arr.length
  }
}
