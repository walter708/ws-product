import React, { useState } from 'react'
import "./Tabs.scss"

function Tabs({children}) {
  const [selected, setSelected] = useState(0)
  
  const handleChange = (idx) => {
    setSelected(idx)
  }
  return (
    <div className='tabs'>
      <ul className='tabs__list'>
        {children.map((child, index) => {
          let style = index === selected ? "current":""
          return(
            <li
             key = {index}
             className ={style}
             onClick={() => handleChange(index)}
            >
              {child.props.title}
            </li>
          )
        }
        )}
        </ul>
        <div className='tabs__content'>{children[selected]}</div>
     
    </div>
  )
}

export default Tabs