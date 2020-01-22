import React, { useState }  from 'react';
import './index.scss';
import Board from '../Board'
import Controls from '../Controls'

function App () {

  const [color, setColor] = useState('white')
  const [backColor] = useState ('#1f1e1e')
  const [lineWidth, setLineWidth] = useState(5)
  const [canvasRef, setCanvasRef] = useState()
  const [drawingMode, setDrawingMode] = useState('line')
  const [actionsChain] = useState([])

  let startX;
  let startY;
  let finishX;
  let finishY;
  let canvas, ctx;
  const canvasWidth = 700;
  const canvasHeigth = 500

  let painting = false;

  function handleClearBoard () {
      ctx && ctx.clearRect(0,0,canvasWidth, canvasHeigth)
      actionsChain.push('clear')
      console.log('ACTIONS CHAIN: ', actionsChain);
  }

  function startDrawing (event) {
      painting = true;
      startX = event.clientX-canvasRef.current.getBoundingClientRect().x;
      startY = event.clientY-canvasRef.current.getBoundingClientRect().y;
      actionsChain.push(drawingMode)
      actionsChain.push([startX,startY])
      draw(event)
  }

  function finishDrawing () {
      painting = false;
      if (drawingMode === 'rect') {
        ctx.rect(startX, startY, finishX, finishY)
        ctx.stroke()
      } else if (drawingMode === 'circle') {
        ctx.ellipse(startX, startY, Math.abs(finishX), Math.abs(finishY), 0, 0, 2 * Math.PI)
        ctx.stroke()
      }
      actionsChain.push('end')
      actionsChain.push([finishX,finishY])
      console.log('ACTIONS CHAIN: ', actionsChain);
      ctx.beginPath()
  }

  function draw (event) {
      if (!painting) return;
      
      canvas = canvasRef.current
      ctx = canvas.getContext('2d')

      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      switch (drawingMode) {
        case 'line':
          ctx.strokeStyle = color;
          finishX = event.clientX-canvasRef.current.getBoundingClientRect().x;
          finishY = event.clientY-canvasRef.current.getBoundingClientRect().y;
          ctx.lineTo(finishX, finishY);
          ctx.stroke();
          actionsChain.push([finishX, finishY])
          break;
        case 'erase':
          ctx.strokeStyle = backColor;
          finishX = event.clientX-canvasRef.current.getBoundingClientRect().x;
          finishY = event.clientY-canvasRef.current.getBoundingClientRect().y;
          ctx.lineTo(finishX, finishY);
          ctx.stroke();
          actionsChain.push([finishX, finishY])
          break;
        case 'rect':
        case 'circle':
          ctx.strokeStyle = color;
          finishX = parseInt(event.clientX-canvasRef.current.getBoundingClientRect().x - startX);
          finishY = parseInt(event.clientY-canvasRef.current.getBoundingClientRect().y - startY);    
          break;
        default: break;
      }
  }

  function handleChangeColor (color) {
    setColor(color)
    actionsChain.push(color)
    console.log('ACTIONS CHAIN: ', actionsChain);
  }

  function handleChangeLineWidth (width) {
    setLineWidth(width < 25 ? width + 2 : 3)
    if (isNaN(actionsChain[actionsChain.length-1])) actionsChain.push(width)
    else actionsChain[actionsChain.length-1] = width;
    console.log('ACTIONS CHAIN: ', actionsChain);
  }

  function handleChangeDrawingMode (mode) {
    setDrawingMode(mode);
  }

  return <>
    <header className="header">
      <h1 className="header__title">Canvas blackboard</h1>
    </header>
    <main className="blackboard">
        <section className="blackboard__controls">
            <Controls lineWidth={lineWidth} 
                  onChangeColor={handleChangeColor} 
                  onChangeLineWidth={handleChangeLineWidth}
                  onClear={handleClearBoard}
                  onChangeDrawingMode={handleChangeDrawingMode}/>
        </section>
        <section className="blackboard__board">
            <Board  width={canvasWidth} 
                height={canvasHeigth}
                setCanvasRef={setCanvasRef}
                draw={draw}
                startDrawing={startDrawing}
                finishDrawing={finishDrawing}/>
        </section>
    </main>
  </>
}

export default App;
