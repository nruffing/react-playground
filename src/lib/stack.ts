export default class Stack<T> {
  items: T[]

  constructor() {
    this.items = []
  }

  /**
   * Pushes an item onto the top of the stack.
   */
  push(item: T): number {
    this.items.push(item)
    return this.items.length
  }

  /**
   * Remove an item at the top of the stack.
   */
  pop(): T | undefined {
    return this.items.pop()
  }

  /**
   * Determines if the stack is empty.
   */
  isEmpty(): boolean {
    return !this.items.length
  }

  /**
   * Returns the item at the top of the stack without removing it from the stack.
   */
  peek(): T | undefined {
    return this.items[this.items.length - 1]
  }

  /**
   * Returns the number of items in the stack.
   */
  length(): number {
    return this.items.length
  }
}