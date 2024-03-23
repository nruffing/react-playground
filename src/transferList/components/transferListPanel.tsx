import { useEffect, useRef } from "react"
import { TransferListItem } from "./transferList"

export interface TransferListPanelProps {
  id: string,
  items: TransferListItem[],
  onItemToggled: (item: TransferListItem) => void,
  onSelectAllToggled: () => void,
  onItemAdded: (label: string) => void
}

export default function TransferListPanel({ id, items, onItemToggled, onSelectAllToggled, onItemAdded }: TransferListPanelProps) {
  const selectAllRef = useRef<HTMLInputElement>(null)

  const selected = items.filter(i => i.selected)
  const allChecked = selected.length === items.length
  const noneChecked = !selected.length

  useEffect(() => {
    selectAllRef.current!.indeterminate = !noneChecked && !allChecked
  })

  const onAddKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      const input = event.target as HTMLInputElement
      const value = input?.value?.trim()
      if (value) {
        onItemAdded(value)
        input.value = ''
      }
    }
  }

  return (
    <div className="transfer-list-panel">
      <input
        type="text"
        placeholder="Add new item"
        aria-label="Add new item"
        onKeyDown={onAddKeydown}
      />
      <span className="bordered select-all-row">
        <input id={`${id}-select-all`} ref={selectAllRef} type="checkbox" checked={allChecked} onChange={onSelectAllToggled}></input>
        <label htmlFor={`${id}-select-all`}>{selected.length}/{items.length} Selected</label>
      </span>
      <span className="transfer-list-items">
        {
          items.map(i => {
            const itemId = `${id}-${i.label}`
            return (
              <span key={itemId}>
                <input id={itemId} type="checkbox" checked={i.selected} onChange={() => onItemToggled(i)}></input>
                <label htmlFor={itemId}>{i.label}</label>
              </span>
            )
          })
        }
      </span>
    </div>
  )
}
