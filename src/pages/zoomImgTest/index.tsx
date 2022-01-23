import React, { useRef } from 'react'
import Zoom from './zoom'

//封装的Hooks⽤用use开头
/*
const useChangeTitle = (title) => {
  useEffect(() => {
    document.title = title
  }, [title])
}
*/

const App = (() => {

  const zoomComRef = useRef<any>(null)
  const onGetRef = () => {
    console.log("ref-com", zoomComRef)
    console.log("ref-com", zoomComRef.current.getZoomImg)
    // console.log("ref-com", zoomComRef.current.getZoomImg())
    const zoomImgRef = zoomComRef.current.getZoomImg()
    console.log("1.zoomImgRef", zoomImgRef)
    const transformZoom = zoomComRef.current.getTransformZoom()
    console.log("2.transformZoom", transformZoom)
    // console.log("ref-com", zoomComRef.current.zoomComCall)
  }
  return (
    <>
      <div>
        测试图片放大
      </div>
      {/* <div style={{ width: '300px', height: '300px' }}> */}
      <div onClick={() => onGetRef()}>获取子组件</div>
      <div>
        <Zoom ref={zoomComRef} />
      </div>
    </>
  );
})

export default App;