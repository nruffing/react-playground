// https://www.greatfrontend.com/questions/javascript/event-emitter?list=data-structures-algorithms

interface IEventEmitter {
  on(eventName: string, listener: Function): IEventEmitter;
  off(eventName: string, listener: Function): IEventEmitter;
  emit(eventName: string, ...args: Array<any>): boolean;
}

// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export is correct.
export default class EventEmitter implements IEventEmitter {
  handlerMap = new Map<string, Function[]>()

  getHandlersForEvent(eventName: string) {
    let handlers = this.handlerMap.get(eventName)
    if (!handlers) {
      handlers = []
      this.handlerMap.set(eventName, handlers)
    }
    return handlers
  }

  on(eventName: string, listener: Function): IEventEmitter {
    const handlers = this.getHandlersForEvent(eventName)
    handlers.push(listener)
    return this
  }

  off(eventName: string, listener: Function): IEventEmitter {
    const handlers = this.getHandlersForEvent(eventName)
    const index = handlers.findIndex(l => l === listener)
    if (index >= 0) {
      handlers.splice(index, 1)
    }
    return this
  }

  emit(eventName: string, ...args: Array<any>): boolean {
    const handlers = this.getHandlersForEvent(eventName)
    for (const handler of handlers) {
      handler(...args)
    }
    return !!handlers.length
  }
}
