import { useState, useRef } from 'react'
import { scriptInfo } from './Dummy'

const sceneNum = scriptInfo.scene.length
const dialogNums = scriptInfo.scene.map((value) => {
  return value.dialogs.length
})

export const ControllScript = () => {
  const script = scriptInfo
  const [curIdx, setCurIdx] = useState({ scene: 0, dialog: 0, idx: 0 })
  const refs = useRef<null[] | HTMLDivElement[]>([])

  function moveScript() {
    changeIdx()
    moveScroll()
  }

  function changeIdx() {
    if (curIdx.dialog < dialogNums[curIdx.scene] - 1) {
      setCurIdx((prev) => ({
        ...prev,
        dialog: prev.dialog + 1,
        idx: prev.idx + 1,
      }))
    } else if (curIdx.scene < sceneNum - 1) {
      setCurIdx({ scene: curIdx.scene + 1, dialog: 0, idx: curIdx.idx + 1 })
    }
  }

  function moveScroll() {
    if (refs.current.length > 0) {
      refs.current[curIdx.idx]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }

  return { script, curIdx, refs, moveScript }
}
