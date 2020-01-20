import React, { useState }  from 'react';
import './index.scss';
import Board from '../Board'
import Controls from '../Controls'

function App () {

  const [color, setColor] = useState('white')
  const [backColor, setBackColor] = useState ('#1f1e1e')
  const [lineWidth, setLineWidth] = useState(5)
  const [canvasRef, setCanvasRef] = useState()
  const [drawingMode, setDrawingMode] = useState('line')

  let startX;
  let startY;
  let rectWidth;
  let rectHeigth;
  let canvas, ctx;
  const canvasWidth = 700;
  const canvasHeigth = 500

  let painting = false;

  function handleClearBoard () {
      ctx.clearRect(0,0,canvasWidth, canvasHeigth)
  }

  function startDrawing (event) {
      painting = true;
      startX = event.clientX-canvasRef.current.getBoundingClientRect().x;
      startY = event.clientY-canvasRef.current.getBoundingClientRect().y;
      draw(event)
  }

  function finishDrawing () {
      painting = false;
      if (drawingMode === 'rect') {
        ctx.rect(startX, startY, rectWidth, rectHeigth)
        ctx.stroke()
      } else if (drawingMode === 'circle') {
        ctx.ellipse(startX, startY, Math.abs(rectWidth), Math.abs(rectHeigth), 0, 0, 2 * Math.PI)
        ctx.stroke()
      }
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
          ctx.lineTo(event.clientX-canvasRef.current.getBoundingClientRect().x, event.clientY-canvasRef.current.getBoundingClientRect().y);
          ctx.stroke();
          break;
        case 'erase':
          ctx.strokeStyle = backColor;
          ctx.lineTo(event.clientX-canvasRef.current.getBoundingClientRect().x, event.clientY-canvasRef.current.getBoundingClientRect().y);
          ctx.stroke();
          break;
        case 'rect':
        case 'circle':
          ctx.strokeStyle = color;
          rectWidth = parseInt(event.clientX-canvasRef.current.getBoundingClientRect().x - startX);
          rectHeigth = parseInt(event.clientY-canvasRef.current.getBoundingClientRect().y - startY);    
          break;
        default: break;
      }
  }

  function handleChangeColor (color) {
    setColor(color)
  }

  function handleChangeLineWidth (width) {
    setLineWidth(width < 25 ? width + 2 : 3)
  }

  function handleChangeDrawingMode (mode) {
    setDrawingMode(mode);
  }

  return <>
    <Controls lineWidth={lineWidth} 
              onChangeColor={handleChangeColor} 
              onChangeLineWidth={handleChangeLineWidth}
              onClear={handleClearBoard}
              onChangeDrawingMode={handleChangeDrawingMode}/>
    <Board  width={canvasWidth} 
            height={canvasHeigth}
            setCanvasRef={setCanvasRef}
            draw={draw}
            startDrawing={startDrawing}
            finishDrawing={finishDrawing}/>
  </>
}

export default App;
