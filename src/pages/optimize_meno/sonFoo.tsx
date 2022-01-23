import React, { memo } from "react";

interface sonFootype{
  reset:any;
}

// ### memo的作用是在组件重新渲染前确认内部传入的组件是否需要重新渲染。 这里将Pure组件用memo方法进行嵌套。
const SonFoo = memo(function SonFoo(props:sonFootype) {
  
  console.log('Foo render...');
  return (
    <button onClick={props.reset}>
      reset
    </button>
  )
})

export default SonFoo;