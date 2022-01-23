import React from 'react'
import './spin.css'
import './index.css'

const Spin =()=>{
  return (
    <div>
      <div className="example">

        <div className="ant-spin ant-spin-spinning">
          <span className="ant-spin-dot ant-spin-dot-spin">
            <i className="ant-spin-dot-item"></i>
            <i className="ant-spin-dot-item"></i>
            <i className="ant-spin-dot-item"></i>
            <i className="ant-spin-dot-item"></i>
          </span>
        </div>

      </div>
    </div>
  );
}

export default Spin;