import { useState, useRef } from 'react'
import { scriptInfo } from '../data/Dummy'

const sceneNum = scriptInfo.scene.length
const dialogNums = scriptInfo.scene.map((value) => {
  return value.dialogs.length
})

export const ControllScript = () => {
  const script = scriptInfo
  const [curSelection, setCurSelection] = useState({
    scene: 0,
    dialog: 0,
    idx: 0,
  })
  const refs = useRef<null[] | HTMLDivElement[]>([])

  function moveScript() {
    changeIdx()
    moveScroll()
  }

  function changeIdx() {
    if (curSelection.dialog < dialogNums[curSelection.scene] - 1) {
      setCurSelection((prev) => ({
        ...prev,
        dialog: prev.dialog + 1,
        idx: prev.idx + 1,
      }))
    } else if (curSelection.scene < sceneNum - 1) {
      setCurSelection({
        scene: curSelection.scene + 1,
        dialog: 0,
        idx: curSelection.idx + 1,
      })
    }
  }

  function moveScroll() {
    if (refs.current.length > 0) {
      refs.current[curSelection.idx]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }

  return { script, curIdx: curSelection, refs, moveScript }
}
