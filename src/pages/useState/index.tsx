import './index.css';
import React, { useState, useEffect } from 'react'
const App = () => {
  let [checkList, setCheckList] = useState<string[]>(["aa", "cc", "dd"])
  const [count, setCount] = useState(0)
  const changeList = () => {
    console.log(checkList)
    checkList = [...checkList, "ee"]
    setCheckList(checkList)
  }
  /*
 使用 hooks 模拟 componentDidMount
 useEffect 拥有两个参数，第一个参数作为回调函数会在浏览器布局和绘制完成后调用，因此它不会阻碍浏览器的渲染进程。
 第二个参数是一个数组
 - 当数组存在并有值时，如果数组中的任何值发生更改，则每次渲染后都会触发回调。
 - 当它不存在时，每次渲染后都会触发回调。
 - 当它是一个空列表时，回调只会被触发一次，类似于 componentDidMount。

 constructor() —> componentWillMount() —> render() -----> componentDidMount()
 componentWillMount方法的调用在constructor之后，在render之前，在这方法里的代码调用setState方法不会触发重渲染，所以它一般不会用来作加载数据之用，它也很少被使用到。
 componentDidMount方法中的代码，是在组件已经完全挂载到网页上才会调用被执行，所以可以保证数据的加载。此外，在这方法中调用setState方法，会触发重渲染。所以，官方设计这个方法就是用来加载外部数据用的，或处理其他的副作用代码
```
一般的从后台(服务器)获取的数据，都会与组件上要用的数据加载有关，所以都在componentDidMount方法里面作。
``` 
    shouldComponentUpdate(newProps, newState) {
        console.log("组件发生了更新，组件是否更新：shouldComponentUpdate：" + newState)
        return true;
    }
    getSnapshotBeforeUpdate(prevProps, prevState) { // 组件更新前触发
        console.log("组件更新前：getSnapshotBeforeUpdate")
    }
    componentDidUpdate(prevProps, prevState) {
        console.log("组件完成更新：componentDidUpdate")

    }
    componentWillUnmount() {
        console.log("组件被卸载：componentWillUnmount")
    }
  */
  //使用条件：useEffect的第二个参数是一个数组，只有当数组中的的值发生改变的时候才会调用effect，
  //如果执行在第一次挂载和卸载的时候调用，只需要传一个[]
  useEffect(() => {
    console.log('componentDidMount')
    return () => {
      console.log('componentWillUnmount');
    }
  }, []);
  //监控count变化，一旦变化立即执行
  useEffect(() => {
    console.log(`clicked ${count}`);
  }, [count])
  return (
    <div className="container">
      <ul>
        {checkList.map((item, index) => {
          return (
            <li key={index}>{item}</li>
          )
        })}
      </ul>
      <button onClick={changeList}>改变list</button>
      <button onClick={() => setCount(count + 1)}>增加count</button>
    </div>
  );
}

export default App;