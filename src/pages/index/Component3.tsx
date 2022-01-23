function App(props:any) {
  const onUseState = () => {
    props.history.push("/useState")
  }
  const onUseContext = () => {
    props.history.push("/useContext")
  }
  const onUseReducer = () => {
    props.history.push("/useReducer")
  }
  const onUseCallback = () => {
    props.history.push("/useCallback")
  }
  const onUseCallback2 = () => {
    props.history.push("/useCallback2")
  }
  const onUseMemo = () => {
    props.history.push("/useMemo")
  }
  const onUseRef = () => {
    props.history.push("/useRef")
  }
  const onUseLayoutEffect = () => {
    props.history.push("/useLayoutEffect")
  }
  const onZidingyiHook = () => {
    props.history.push("/zidingyiHook")
  }

  const onZoomImgTest = () => {
    props.history.push("/ZoomImgTest")
  }

  const onAntdesignTest = () => {
    props.history.push("/antdesignTest")
  }

  const onVideoTest = () => {
    props.history.push("/videoTest")
  }

  return (
    <div className="container">
      <p>Component1</p>
      <div>
        <button onClick={() => onUseState()}>useState</button>
      </div>
      <div>
        <button onClick={() => onUseContext()}>useContext</button>
      </div>
      <div>
        <button onClick={() => onUseReducer()}>useReducer</button>
      </div>
      <div>
        <button onClick={() => onUseCallback()}>useCallback</button>
      </div>
      <div>
        <button onClick={() => onUseCallback2()}>useCallback2</button>
      </div>
      <div>
        <button onClick={() => onUseMemo()}>useMemo</button>
      </div>
      <div>
        <button onClick={() => onUseRef()}>useRef</button>
      </div>
      <div>
        <button onClick={() => onUseLayoutEffect()}>useLayoutEffect</button>
      </div>
      <div>
        <button onClick={() => onZidingyiHook()}>zidingyiHook</button>
      </div>
      <div>
        ------------这是分割线-----------
      </div>
      <div>
        <button onClick={() => onZoomImgTest()}>图片放大测试</button>
      </div>
      <div>
        <button onClick={() => onAntdesignTest()}>antdesign测试</button>
      </div>
      <div>
        <button onClick={() => onVideoTest()}>video测试</button>
      </div>
    </div>
  );
}

export default App;