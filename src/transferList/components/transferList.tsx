import '../styles/transferList.css'
import TransferListPanel from './transferListPanel'

export interface TransferListItem {
  label: string,
  selected: boolean,
}

export type TransferListChangedHandler = (items: TransferListItem[]) => void

export interface TransferListItemProps {
  id: string,
  left: TransferListItem[],
  right: TransferListItem[],
  onLeftChanged: TransferListChangedHandler,
  onRightChanged: TransferListChangedHandler,
}

export default function TransferList({ id, left, right, onLeftChanged, onRightChanged }: TransferListItemProps) {

  const onItemToggled = (list: TransferListItem[], onChanged: TransferListChangedHandler, item: TransferListItem) => {
    onChanged(list.map(i => i === item ? { ...i, selected: !i.selected } : i))
  }

  const onSelectAll = (list: TransferListItem[], onChanged: TransferListChangedHandler, selected: TransferListItem[]) => {
    const selectAll = list.length !== selected.length
    onChanged(list.map(i => { return { ...i, selected: selectAll } }))
  }

  const move = (from: TransferListItem[], to: TransferListItem[], onFromChanged: TransferListChangedHandler, onToChanged: TransferListChangedHandler) => {
    const newFrom = [] as TransferListItem[]
    const newTo = [...to.map(t => { return { ...t }})] as TransferListItem[]

    for (var item of from) {
      if (item.selected) {
        const existing = newTo.find(i => i.label === item.label)
        if (existing) {
          existing.selected = true
        } else {
          newTo.push(item)
        }
      } else {
        newFrom.push(item)
      }
    }

    onFromChanged(newFrom)
    onToChanged(newTo)
  }

  const add = (to: TransferListItem[], onChanged: TransferListChangedHandler, label: string) => {
    const newTo = [] as TransferListItem[]

    let found = false
    for (const item of to) {
      if (item.label === label) {
        if (item.selected) {
          found = true
          newTo.push({ ...item, selected: false })
        } else {
          return
        }
      } else {
        newTo.push(item)
      }
    }

    if (!found) {
      newTo.push({ label, selected: false })
    }

    onChanged(newTo)
  }

  const leftSelected = left.filter(i => i.selected)
  const rightSelected = right.filter(i => i.selected)
  const canMoveRight = !!leftSelected.length
  const canMoveLeft = !!rightSelected.length

  return (
    <div className="transfer-list">
      <TransferListPanel
        id={`${id}-left`}
        items={left}
        onItemToggled={(item) => onItemToggled(left, onLeftChanged, item)}
        onSelectAllToggled={() => onSelectAll(left, onLeftChanged, leftSelected)}
        onItemAdded={(label) => add(left, onLeftChanged, label)}
      />
      <div className='transfer-buttons'>
        <button
          onClick={() => move(right, left, onRightChanged, onLeftChanged)}
          disabled={!canMoveLeft}
          aria-label="move selected items left"
        >
          &lt;
        </button>
        <button
          onClick={() => move(left, right, onLeftChanged, onRightChanged)}
          disabled={!canMoveRight}
          aria-label="move selected items right"
        >
          &gt;
        </button>
      </div>
      <TransferListPanel
        id={`${id}-right`}
        items={right}
        onItemToggled={(item) => onItemToggled(right, onRightChanged, item)}
        onSelectAllToggled={() => onSelectAll(right, onRightChanged, rightSelected)}
        onItemAdded={(label) => add(right, onRightChanged, label)}
      />
    </div>
  )
}
