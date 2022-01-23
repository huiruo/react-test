import React, { useCallback, useState } from "react";
// import SonFoo from './sonFoo.tsx'
import SonFoo from './sonFoo'
import SonPure from './sonPure'

function Optimize_meno() {

  const [count, setCount] = useState(0)

  //### useCallback:useCallback的作用是缓存一个函数，并传入相关的依赖项，只有在依赖项改变的时候才会重载函数
  /*
  const reset = () =>{
    setCount(0);
  }
  发现即使嵌套了memo，Foo组件还是会不断重新渲染，原因是我们从父组件传入的reset在父组件重载的过程中也被重载了，
  新的reset !== 上次传入的reset，由于属性发生了更改， 因此被认为有必要进行重新渲染，这时就应该用useCallback
  将reset方法进行缓存，阻止这种不必要的重新渲染:
  */
  const reset = useCallback(() => {
    setCount(0)
  }, [])

  console.log("Optimize_meno_render")
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>add</button>
      <SonFoo reset={reset} />
      <SonPure />
    </div>
  );
}

export default Optimize_meno;
