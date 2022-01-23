import React, { useContext } from 'react'
import { AppContext } from './app_useReducer'
// import './Component1.css';

function App() {
  const exampleContext = useContext(AppContext)
  const { isLogin, dataArray, data } = exampleContext.exampleState
  return (
    <div style={{ background: "yellow" }}>
      我是子-子组件
      <div>
        <div>hello, {isLogin ? <span>汤姆</span> : <span>请登录</span>}</div>
        <ul>
          {dataArray.map((item:any, index:number) => {
            return <li key={index}>{item}</li>
          })}
        </ul>
        <ul>
          {data && data.map((item:any, index:number) => {
            return <li key={index}>{item}</li>
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;