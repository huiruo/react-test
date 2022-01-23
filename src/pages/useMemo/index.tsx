// import './Component1.css';
/*
反例:
import React from 'react';
export default function WithoutMemo() {
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');
 
    function expensive() {
        console.log('compute');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) {
            sum += i;
        }
        return sum;
    }
    return <div>
        <h4>{count}-{val}-{expensive()}</h4>
        <div>
            <button onClick={() => setCount(count + 1)}>+c1</button>
            <input value={val} onChange={event => setValue(event.target.value)}/>
        </div>
    </div>;
}
创建了两个state，然后通过expensive函数，执行一次昂贵的计算，拿到count对应的某个值。
我们可以看到：无论是修改count还是val，由于组件的重新渲染，都会触发expensive的执行(能够在控制台看到，
  即使修改val，也会打印)；但是这里的昂贵计算只依赖于count的值，在val修改的时候，是没有必要再次计算的。
  在这种情况下，我们就可以使用useMemo，只在count的值修改时，执行expensive计算：
*/
import React, { useState, useMemo } from 'react';
function App() {

  const [count, setCount] = useState(1);
  const [val, setValue] = useState('');

  const expensive = useMemo(() => {
    console.log('compute---->useMemo');
    let sum = 0;
    for (let i = 0; i < count * 100; i++) {
      sum += i;
    }
    return sum;
  }, [count]);

  return (
    <div>
      <h4>{count}-{expensive}</h4>
      {val}
      <div>
        <button onClick={() => setCount(count + 1)}>+c1</button>
        <input value={val} onChange={event => setValue(event.target.value)} />
      </div>
    </div>
  );
}
/*
上面我们可以看到，使用useMemo来执行昂贵的计算，然后将计算值返回，并且将count作为依赖值传递进去。
这样，就只会在count改变的时候触发expensive执行，在修改val的时候，返回上一次缓存的值。
*/
export default App;