import React, { useEffect, useContext } from 'react'
import * as actions from './actionCreators'
import { AppContext } from './app_useReducer'
import NextChild from './nextChild'
import './child.css';

function App() {
  const ctx = useContext(AppContext)
  const { count, isLogin } = ctx.exampleState

  useEffect(() => {
    console.log(`you click ${count} times`)
  }, [count])

  useEffect(() => {
    console.log('child_useEffect--->1')
    setTimeout(() => {
      console.log('child_useEffect--->2')
      ctx.dispatch(actions.fetchData(['1', '2', '3']))
    }, 2000)
  }, [])

  return (
    <div className="child-content">
      我是子组件
      <div>
        <p>{count}</p>
        <button onClick={() => ctx.dispatch(actions.onChangeCount(count))}>
          click it
        </button>
        {isLogin ? (
          <button onClick={() => ctx.dispatch(actions.logout())}>
            退出
          </button>
        ) : (
          <button onClick={() => ctx.dispatch(actions.login())}>
            登录
          </button>
        )}
      </div>
      <NextChild />
    </div>
  );
}

export default App;
/*
useReducer的另外用法，在页面使用:
import React, { useEffect, useReducer } from 'react'
function Counter(props) {
    const [ isLogin, dispatch ] = useReducer((state, action) => {
        switch (action) {
            case 'login':
                return true
            case 'logout':
                return false
            default:
                return state
        }
    }, false)

    return (
        <div>
            <h2>Data</h2>
            <div>
                {isLogin ? (
                    <button onClick={() => dispatch('logout')}>退出</button>
                ) : (
                    <button onClick={() => dispatch('login')}>登录</button>
                )}
            </div>
        </div>
    )
}

export default Counter
*/