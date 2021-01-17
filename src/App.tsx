import React from 'react';
import StackRoutes from './stacks'
import Nav from './components/Nav'

function App() {
  return <>
    <h1><a href='/'>Stack Router Demo</a></h1>
    <Nav />
    <StackRoutes />
  </>
}

export default App;
