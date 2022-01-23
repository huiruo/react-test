import React, { useState, useCallback } from 'react';
import Child from './child'

function App() {
  const [count, setCount] = useState(1);
  const [val, setVal] = useState('');

  const callback = useCallback(() => {
    return count;
  }, [count]);

  return (
    <div className="container">
      父组件
      <h4>{count}</h4>
      <Child callback={callback} />
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <input value={val} onChange={event => setVal(event.target.value)} />
      </div>
    </div>
  );
}

export default App;