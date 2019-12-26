import React from 'react'
import './logMessage.css'

function createMarkup(html) {
  return { __html: html };
}

function Log(props) {
  let title = props.title || "Message"
  let type = (props.type === 'html')? 'html' : 'text'
  return (
    <div className="log">      
      <p style={{ color: 'green', fontWeight: 'bold' }}>{title}</p>
      <div dangerouslySetInnerHTML={createMarkup(props.msg)} />
      {/* {
        (type === 'text')
        ? <p>{props.msg}</p>
        : <div dangerouslySetInnerHTML={createMarkup(props.msg)} />
      } */}
    </div>
  )
}

export default Log