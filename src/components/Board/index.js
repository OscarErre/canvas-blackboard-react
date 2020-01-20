import React, { useRef } from 'react'
import './index.scss'

const Board = ({width, height, setCanvasRef, draw, startDrawing, finishDrawing}) => {

    const canvasRef = useRef(null)
    setCanvasRef(canvasRef)

    return <canvas
                ref={canvasRef} 
                className="board" 
                width={width} 
                height={height}
                onMouseDown={(e)=>{
                    e.preventDefault();
                    startDrawing(e);
                }}
                onMouseUp={(e)=>{
                    e.preventDefault();
                    finishDrawing();
                }}
                onMouseMove={(e)=>{
                    e.preventDefault();
                    draw(e);
                }}>
            </canvas>
}

export default Board