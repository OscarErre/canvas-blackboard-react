import React, { useState }  from 'react';
import './index.scss';
import Board from '../Board'
import Controls from '../Controls'

function App () {

  const [color, setColor] = useState('red')
  const [lineWidth, setLineWidth] = useState(5)

  function handleChangeColor (color) {
    setColor(color)
  }

  function handleChangeLineWidth (width) {
    setLineWidth(width < 25 ? width + 2 : 3)
  }

  return <>
    <Controls lineWidth={lineWidth} onChangeColor={handleChangeColor} onChangeLineWidth={handleChangeLineWidth}/>
    <Board width="600" height="300" color={color} lineWidth={lineWidth}/>
  </>
}

export default App;
