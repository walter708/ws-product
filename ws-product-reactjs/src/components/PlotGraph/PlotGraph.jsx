import React from 'react'
import Plot from 'react-plotly.js';
import "./PlotGraph.scss"

function PlotGraph(props) {
  const {xvalues, yvalues, xTitle, yTitle, title } = props || {}
  
  return (
    <div className='plot__display'>
      <p>{title}</p>
        <Plot 
           data={[
             {
               x: xvalues,
               y: yvalues,
               type: 'bar',
              //  mode: 'lines+markers',
               marker: {color:'#87CEEB' },
             },
           ]}
           
          layout={{ xaxis:{title:`${xTitle}`},
                    yaxis:{title:`${yTitle}`} , 
                    width: 200, height: 200, 
                    // title: 'Event Hourly Plot',
                    font: {size: 5},
                    
                    margin:{t:20, l:20, r:20, b:50}
                   } 
                    }
                    
          config = {{responsive: true,  displaylogo: false,modeBarButtonsToRemove: ['pan2d','select2d','lasso2d']}}
         
         />
   </div>
  )
}

export default PlotGraph