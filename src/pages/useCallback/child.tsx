import React, { useState, useEffect } from 'react';
// import './Component1.css';
interface childType{
  callback:()=> void
}
function Child({ callback }:childType) {

  const [count, setCount] = useState(() => callback());

  useEffect(() => {

    console.log("child旧值：", count)
    console.log("callback()当前值：", callback())

    setCount(callback());

  }, [callback]);

  // useEffect(() => console.log('mounted or updated'));

  return (
    <div>
      子组件：{count}
    </div>
  )
}

export default Child;