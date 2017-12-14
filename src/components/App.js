import React from 'react'
import logo from '../logo.svg'

import Counter from './Counter'
import ControlPanel from './ControlPanel'

const App = props => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>

    <Counter value={0} />
    <ControlPanel />

  </div>
)

export default App
