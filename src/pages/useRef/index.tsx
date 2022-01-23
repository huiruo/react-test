// import './Component1.css';
import React, { useRef, useState, useEffect } from 'react';

function App() {
  //用法1:用useRef获取 React JSX 中的 DOM 元素
  const inputEl = useRef<any>('')
  const onButtonClick = () => {
    console.log(inputEl)       //输出获取到的DOM节点
    console.log(inputEl.current)
    inputEl.current.value = "Hello"
  }
  //用法2：用useRef来保存变量（但是一般不建议这样来作，React 界面的变化可以通过状态来控制。）
  /*
  先声明一个textRef变量，他其实就是useRef函数。
  然后使用useEffect函数实现每次状态变化都进行变量修改，并打印。
  */
  const [text, setText] = useState('小妹妹')
  const textRef = useRef<string>()
  useEffect(() => {
    textRef.current = text;
    console.log('textRef.current:', textRef.current)
  })
  return (
    <>
      {/*用法1:获取dom元素*/}
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>在input上展示文字</button>
      {/*用法2：useRef可以保存 React 中的变量，这个操作在实际开发中用的并不多*/}
      {/*
      这里就写一个文本框，文本框用来改变text状态。又用useRef把text状态进行保存，最后打印在控制台上。
      写这段代码你会觉的很绕，其实显示开发中没必要这样写，用一个 state 状态就可以搞定，这里只是为了展示知识点。
      */}
      <br />
      <br />
      <input value={text} onChange={(e) => { setText(e.target.value) }} />
    </>
  );
}

export default App;