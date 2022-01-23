import { useState } from 'react';
import { CountContext } from './countContext'
import Counter from './counter'

const App = () => {

  const [count, setCount] = useState<number>(0);

  return (
    <div>

      <p>You clicked {count} times</p>

      <button onClick={() => { setCount(count + 1) }}>click me</button>

      {/* 
      // 提供了一个 Context 对象，这个对象是可以被子组件共享的。
      当父组件的count变量发生变化时，子组件也会发生变化。
      */}
      <CountContext.Provider value={count}>

        <Counter />

      </CountContext.Provider>

    </div>
  )
}
export default App;