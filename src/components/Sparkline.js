import React, {useEffect, useRef} from 'react'



const Sparkline = (props) => {
    const canvasRef = useRef(null)

    const newData = props.data.price.map(price => price)

    const highest = Math.max(...newData)
    // const lowest = Math.min(...newData)
    const GRAPH_TOP = 5;  
    // const GRAPH_BOTTOM = 375;  
    const GRAPH_LEFT = 5;  
    const GRAPH_RIGHT = 75;   
    
    const GRAPH_HEIGHT = 100;   
    // const GRAPH_WIDTH = 450;  
  
    
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        

        

        const draw = ctx => {
            ctx.lineJoin='round'
            ctx.strokeStyle = 'red'
            ctx.beginPath()
            ctx.moveTo(0, 0)
            for( let i = 1; i < newData.length; i++) {
                ctx.lineTo( GRAPH_RIGHT / newData.length * i + GRAPH_LEFT, ( GRAPH_HEIGHT - newData[ i ] / highest * GRAPH_HEIGHT ) + GRAPH_TOP );
            }
            ctx.stroke()
          }

        draw(context)

    }, [])

    return (
        <div>
        <canvas ref={canvasRef} {...props} />
        </div>
    )
}

export default Sparkline