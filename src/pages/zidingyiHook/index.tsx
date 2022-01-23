import React, { useEffect } from 'react'

// interface appType{
//   callback:()=> void
// }

//封装的Hooks⽤用use开头
const useChangeTitle = (title:string) => {
  useEffect(() => {
    document.title = title
  }, [title])
}

const App = ((props:any) => {
  useChangeTitle("⾃自定义修改标题Hooks")
  return (
    <div className="container">
      测试⾃自定义Hooks
    </div>
  );
})

export default App;