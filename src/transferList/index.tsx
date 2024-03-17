import { useState } from 'react'
import TransferList, { type TransferListItem } from './components/transferList'

// https://www.greatfrontend.com/questions/user-interface/transfer-list-ii

export default function TransferListView() {
  const [left, setLeft] = useState<TransferListItem[]>([
    { label: 'HTML', selected: true },
    { label: 'JavaScript', selected: true },
    { label: 'CSS', selected: false },
    { label: 'TypeScript', selected: false },
  ])
  const [right, setRight] = useState<TransferListItem[]>([
    { label: 'React', selected: true },
    { label: 'Angular', selected: true },
    { label: 'Vue', selected: true },
    { label: 'Svelte', selected: true },
  ])
  return <>
    <a href="https://www.greatfrontend.com/questions/user-interface/transfer-list-ii" target="_blank">Great Frontend</a>
    <TransferList
      id="example-transfer-list"
      left={left}
      right={right}
      onLeftChanged={(items) => setLeft(items)}
      onRightChanged={(items) => setRight(items)} />
  </>
}
