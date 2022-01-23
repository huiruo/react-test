import React, { memo} from "react";

// 纯函数组件
const SonPure = memo(function Pure() {


  console.log('SonPure pureComponent render...');

  return (
    <div>pureComponent</div>
  )
})

export default SonPure;