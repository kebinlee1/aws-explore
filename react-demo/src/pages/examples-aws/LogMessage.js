import React from 'react'
import './logMessage.css'

function Log(props) {
  let title = props.title || "Message"
  return (
    <div className="log">      
      <p style={{ color: 'green', fontWeight: 'bold' }}>{title}</p>
      <p>{props.msg}</p>
    </div>
  )
}

export default Log