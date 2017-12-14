import React from 'react'

const ControlPanel = props => (
  <div>
    <button
      className="button"
      onClick={ () => console.log("Add 1") }
    >+</button>
    <button
      className="button"
      onClick={ () => console.log("Take 1") }
    >-</button>
  </div>
)

export default ControlPanel
