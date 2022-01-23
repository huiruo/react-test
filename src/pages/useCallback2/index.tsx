// BAD，不进行优化的时候
// import React, { Component, useState, useEffect, useCallback } from 'react';
// function ListItem(props) {
//   let addItem = props.addItem
//   useEffect(()=>{
//     console.log('子组件ListItem 加载')
//   },[])
//   useEffect(()=>{
//     console.log('子组件render')
//   })
//   return (
//     <div onClick={ addItem }> { props.children } </div>
//   )
// }

// GOOD shouldComponentUpdate  用useCallback和memo优化以后的代码
import React, { useState, memo, useEffect, useCallback } from 'react';
type MyProps = {
  addItem: () => void
  children: string
  // children: JSX.Element  //如果是节点的话优化不生效
}
const ListItem = memo((props: MyProps) => {
  let addItem = props.addItem
  useEffect(() => {
    console.log('子组件ListItem 加载')
  }, [])
  useEffect(() => {
    console.log('子组件render', props.children)
  })
  return (
    <div onClick={addItem}> {props.children} </div>
  )
})
let count = 0
function List() {
  let [list, setList] = useState<string[]>([])
  let [name, setName] = useState<string>('Kevin');
  useEffect(() => {
    setList([
      '6点起床',
      '7点上班',
      '8点早会'
    ])
  }, []);
  /**
   * useCallback的第一个参数称为"内联回调函数"，第二个参数称为"依赖项"数组。
   * 返回的函数被称为memoized回调函数，该回调函数仅在某个依赖项改变时才会更新。
   *
   * 在子组件里面调用了useCallback返回的addI这个方法后，会执行内联回调函数；
   * 然后setState，整个组件更新，addI方法也会相应的更新。
   */
  const addI = useCallback(() => {
    list.push('行程 ' + count++);
    setList([...list])
  }, [list])
  const modifyName = () => {
    setName('K3VIN' + (++count))
  }
  return (
    <>
      {
        list.map((item, index) => {
          return (
            <ListItem key={index} addItem={addI}>
              {/*<span>{item}</span>*/}
              {item}
            </ListItem>
          )
        })
      }
      <div>
        <button onClick={() => addI()}>修改列表</button>
      </div>
      现在的名字： {name}  <button onClick={modifyName}> 点击修改名字 </button>
    </>
  )
}
export default List