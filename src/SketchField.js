import React, { Component } from 'react';
import {SketchField, Tools} from 'react-sketch';

class Canvas extends React.Component {
     render() {
        return (
            <SketchField
                         className='sketch-field'
                         width='100vw'
                         height='100vh'
                         tool={Tools.Rectangle}
                         lineColor='#f4ecea'
                         color='#f4ecea'
                         lineWidth={6}/>
        )
     }
}


export default Canvas;
