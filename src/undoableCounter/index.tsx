import './index.css'

// https://www.greatfrontend.com/questions/user-interface/undoable-counter

import { Fragment, useState } from "react"

enum Operation {
  HALF = '/2',
  DECREMENT = '-1',
  INCREMENT = '+1',
  DOUBLE = 'x2',
}

let nextKey = 0

interface OperationHistory {
  key: number,
  operation: Operation,
  previousValue: number,
}

const executeOperation = (op: OperationHistory) => {
  switch (op.operation) {
    case Operation.HALF:
      return op.previousValue / 2
    case Operation.DECREMENT:
      return op.previousValue - 1
    case Operation.INCREMENT:
      return op.previousValue + 1
    case Operation.DOUBLE:
      return op.previousValue * 2
  }
}

const getInverseOperation = (op: Operation) => {
  switch (op) {
    case Operation.HALF:
      return Operation.DOUBLE
    case Operation.DECREMENT:
      return Operation.INCREMENT
    case Operation.INCREMENT:
      return Operation.DECREMENT
    case Operation.DOUBLE:
      return Operation.HALF
  }
}

export default function UndoableCounter() {
  const initialValue = 0
  const [current, setCurrent] = useState(initialValue)
  const [history, setHistory] = useState<OperationHistory[]>([])
  const [future, setFuture] = useState<OperationHistory[]>([])

  function undo() {
    const entry = history[0]
    setHistory(history.slice(1))
    setFuture([entry!, ...future])
    setCurrent(executeOperation({
      ...entry!,
      operation: getInverseOperation(entry!.operation),
    }))
  }

  function redo() {
    execute(future[0].operation)
    setFuture(future.slice(1))
  }

  function reset() {
    setCurrent(initialValue)
    setHistory([])
    setFuture([])
  }

  function execute(op: Operation) {
    const entry = {
      operation: op,
      previousValue: current,
      key: nextKey++,
    } as OperationHistory

    setHistory([entry, ...history])
    setCurrent(executeOperation(entry))
  }

  return <>
    <a href="https://www.greatfrontend.com/questions/user-interface/undoable-counter" target="_blank">Great Frontend</a>
    <div className="undoable-counter centered">
      <span>
        <button onClick={undo} disabled={!history.length}>Undo</button>
        <button onClick={redo} disabled={!future.length}>Redo</button>
        <button onClick={reset}>Reset</button>
      </span>
      <span className="bordered">
        <button onClick={() => execute(Operation.HALF)}>{Operation.HALF}</button>
        <button onClick={() => execute(Operation.DECREMENT)}>{Operation.DECREMENT}</button>
        <span className="current-value">{current}</span>
        <button onClick={() => execute(Operation.INCREMENT)}>{Operation.INCREMENT}</button>
        <button onClick={() => execute(Operation.DOUBLE)}>{Operation.DOUBLE}</button>
      </span>
      <span className="history-grid">
        <span className="grid-label">Operation</span>
        <span className="grid-label">Old</span>
        <span className="grid-label">New</span>
        {
          history.map(h => {
            return <Fragment key={h.key}>
              <span>{h.operation}</span>
              <span>{h.previousValue}</span>
              <span>{executeOperation(h)}</span>
            </Fragment>
          })
        }
      </span>
    </div>
  </>
}
