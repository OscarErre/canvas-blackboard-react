import React from 'react'
import './index.scss'

const Controls = ({lineWidth, onChangeColor, onChangeLineWidth, onClear, onChangeDrawingMode}) => {
    return <div className="controls-container">
        <div className="utils">
            <img className="utils__button" src='img/draw.png' alt="draw" onClick={()=> {onChangeDrawingMode('line')}}></img>
            <img className="utils__button" src='img/erase.png' alt="erase" onClick={()=> {onChangeDrawingMode('erase')}}></img>
            <div className="utils__button" onClick={()=>{onChangeLineWidth(lineWidth)}}>
                <div className="size" style={{width:lineWidth+"px", height:lineWidth+"px"}}></div>
            </div>
            <div className="utils__button" onClick={()=>{onClear()}}>
                🗑
            </div>
            <div className="utils__button" onClick={()=>{onChangeDrawingMode('rect')}}>
                <div className="square"></div>
            </div>
            <div className="utils__button" onClick={()=>{onChangeDrawingMode('circle')}}>
                <div className="circle"></div>
            </div>
        </div>
        <div className="colors">
            <div className="colors__option colors__option--black" onClick={()=> {onChangeColor('black')}}></div>
            <div className="colors__option colors__option--white" onClick={()=> {onChangeColor('white')}}></div>
            <div className="colors__option colors__option--red" onClick={()=> {onChangeColor('red')}}></div>
            <div className="colors__option colors__option--blue" onClick={()=> {onChangeColor('blue')}}></div>
            <div className="colors__option colors__option--yellow" onClick={()=> {onChangeColor('yellow')}}></div>
            <div className="colors__option colors__option--green" onClick={()=> {onChangeColor('green')}}></div>
            <div className="colors__option colors__option--orange" onClick={()=> {onChangeColor('orange')}}></div>
            <div className="colors__option colors__option--magenta" onClick={()=> {onChangeColor('magenta')}}></div>
        </div>
    </div>
}

export default Controls