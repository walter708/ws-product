import React from 'react'
import "./Select.scss"
function Select({value, onChange, options}) {
  return (
   <div className="select_container">
   <select value={value} onChange={onChange}>
      {options.map((key_item) => <option key={key_item} value={key_item}>{key_item}</option>)}
   </select>
   </div>
  )
}

export default Select