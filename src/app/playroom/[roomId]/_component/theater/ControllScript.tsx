import { useState, useRef, useEffect } from 'react'
import { scriptInfo } from './data/Dummy'
import axios from 'axios'

const sceneNum = scriptInfo.scenes.length
// 길이를 나타내는 코드
// const dialogNums = scriptInfo.scenes.map((value) => {
//   return value.dialogs.length
// })
// 한 씬의 길이

type Props = {
  scriptIdx: number
}

export const ControllScript = (Props : Props) => {
  const [script, setScript] = useState<any> (scriptInfo)
  const [dialogNums, setDialogNums] = useState<Number[]> ( scriptInfo.scenes.map((value) => {
    return value.dialogs.length
  }))
  const [sceneNum, setSceneNum] = useState<number> (scriptInfo.scenes.length)
  // let script = scriptInfo
  useEffect(
    () => {
      axios.get(
        'https://mangotail.shop/api/v1/script',
        {params : {scriptId : Props.scriptIdx === 999 ? 2 : Props.scriptIdx}},
      ).then((res) => {
      console.log(res.data.data)
        setScript(res.data.data)
        setSceneNum(res.data.data.scenes.length)

      }) .catch ((e) => {console.log(e)})
      
    }, []
  )

  useEffect(
    () => {
      setDialogNums (script.scenes.map((value) => {
        return value.dialogs.length
      }))
      setCurSelection((prev) => ({
          scene: 0,
          dialog: 0,
          idx: 0,
      }))
    }
    ,[script]
  )


  const [curSelection, setCurSelection] = useState({
    scene: 0,
    dialog: 0,
    idx: 0,
  })

  // 씬이 바뀐거는 scene을 통해 알 수 있다
  const refs = useRef<null[] | HTMLDivElement[]>([])

  function moveScript() {
    changeIdx()
    moveScroll()
  }

  function changeIdx() {
    console.log(dialogNums)
    if (curSelection.dialog < dialogNums[curSelection.scene] - 1) {
      setCurSelection((prev) => ({
        ...prev,
        dialog: prev.dialog + 1,
        idx: prev.idx + 1,
      }))
    } else if (curSelection.scene < sceneNum - 1) {
      setCurSelection((prev) => ({
        scene: curSelection.scene + 1,
        dialog: 0,
        idx: curSelection.idx + 1,
      }))
    }
    console.log(curSelection)
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
