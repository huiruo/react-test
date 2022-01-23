import React, { useReducer } from 'react'
import Child from './child'
import { user, counter, reducer } from './reducer'
import { AppContext } from './app_useReducer'
// import './Component1.css';

// export const AppContext = createContext<any>(null) //必须导出，以便页面使用，获取状态，类似connect
function App() {
  const initialState = { ...user, ...counter }
  const [exampleState, exampleDispatch] = useReducer(reducer, initialState)
  return (
    <div className="container">
      我是父组件
      <div>
        <AppContext.Provider
          value={{ exampleState, dispatch: exampleDispatch }}
        >
          <Child />
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;