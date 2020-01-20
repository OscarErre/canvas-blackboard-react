import React, { useRef } from 'react'
import './index.scss'

const Board = ({width, height, color, lineWidth}) => {

    const canvasRef = useRef(null)
    let startX;
    let startY;
    let rectWidth;
    let rectHeigth;
    let canvas, ctx;

    let painting = false;

    function startDrawing (event) {
        painting = true;
        startX = event.clientX-canvasRef.current.getBoundingClientRect().x;
        startY = event.clientY-canvasRef.current.getBoundingClientRect().y;
        draw(event)
    }

    function finishDrawing () {
        painting = false;
        //ctx.rect(startX, startY, rectWidth, rectHeigth)
        //ctx.stroke()
        ctx.beginPath()
    }

    function draw (event) {
        if (!painting) return;
        
        canvas = canvasRef.current
        ctx = canvas.getContext('2d')

        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;

        ctx.lineTo(event.clientX-canvasRef.current.getBoundingClientRect().x, event.clientY-canvasRef.current.getBoundingClientRect().y);
        //rectWidth = parseInt(event.clientX-canvasRef.current.getBoundingClientRect().x - startX);
        //rectHeigth = parseInt(event.clientY-canvasRef.current.getBoundingClientRect().y - startY);
        ctx.stroke()
        
    }
    
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