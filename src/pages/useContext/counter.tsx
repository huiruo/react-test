import { useContext } from 'react';
import { CountContext } from './countContext'

/*
已经有了上下文变量,如何接收。
接收这个直接使用 useContext 就可以，但是在使用前需要新进行引入useContext
*/
function Counter() {

  const count = useContext<number>(CountContext)

  return (
    <div className="container">
      <span> 子组件:{count} </span>
    </div>
  );
}

export default Counter;