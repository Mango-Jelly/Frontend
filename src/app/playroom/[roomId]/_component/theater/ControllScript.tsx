import { useState, useRef, useEffect } from 'react'
import { scriptInfo } from './data/Dummy'
import axios from 'axios'

const sceneNum = scriptInfo.scenes.length
// 길이를 나타내는 코드
// const dialogNums = scriptInfo.scenes.map((value) => {
//   return value.dialogs.length
// })
// 한 씬의 길이


export const ControllScript = () => {
  const [script, setScript] = useState<any> (scriptInfo)
  const [dialogNums, setDialogNums] = useState<Number[]> ( scriptInfo.scenes.map((value) => {
    return value.dialogs.length
  }))
  // let script = scriptInfo
  useEffect(
    () => {
      axios.get(
        'https://mangotail.shop/api/v1/script',
        {params : {scriptId : 2}},
      ).then((res) => {
        setScript(res.data.data)

      }) .catch ((e) => {console.log(e)})
      
    }, []
  )

  useEffect(
    () => {
      console.log(script)
      setDialogNums (script.scenes.map((value) => {
        return value.dialogs.length
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
