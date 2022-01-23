/*
1.没有闪烁，当点击 div，count 更新为 0，此时页面并不会渲染，而是等待useLayoutEffect内部状态修改后，才会去更新页面，所以页面不会闪烁。
2.但是也可以发现页面更新的比较卡顿，因为useLayoutEffect会阻塞浏览器渲染，正好本例中useLayoutEffect的实参函数里有个耗时操作，所以页面更新比较卡顿。
*/
// /*
import { useState, useEffect, useLayoutEffect } from 'react'
function App() {
  const [count, setCount] = useState(0);
  // /*
  useLayoutEffect(() => {
    // console.log(`useLayoutEffect - count=${count}`)
    // console.log("耗时操作开始：")
    // 耗时的操作
    const pre = Date.now();
    while (Date.now() - pre < 500) { }
    // console.log("耗时操作结束：")
    if (count === 0) {
      setCount(10 + Math.random() * 200);
    }
  }, [count]);
  // */

  useEffect(() => {
    console.log('useEffect 执行...');
    return () => {
      console.log('useEffect 销毁...');
    }
  });

  useLayoutEffect(() => {
    console.log('useLayoutEffect 执行...');
    return () => {
      console.log('useLayoutEffect 销毁...');
    }
  });

  return (
    <>
      {console.log('Com 渲染')}
      <div onClick={() => setCount(0)}>{count}</div>
    </>
  );
}
export default App;
// */
//2.用useEffect实现
/*
可以看到展示0的过程。
*/
/*
import { useState, useEffect, useLayoutEffect } from 'react'

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`useEffect - count=${count}`)
    // 耗时的操作
    const pre = Date.now();
    while (Date.now() - pre < 500) { }

    // count为0时重新生成个随机数
    if (count === 0) {
      console.log("Math.random() * 200):", Math.random() * 200)
      setCount(10 + Math.random() * 200);
    }
  }, [count]);

  // 点击DIV重置count
  return (
    <div onClick={() => setCount(0)}>{count}</div>
  );
}
*/