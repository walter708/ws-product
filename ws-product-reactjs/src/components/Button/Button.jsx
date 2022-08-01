import React from 'react'
import './Button.scss'

function Button({Pagefunction, disabled , value}) {
  return (
    <button type='button' className='btn__layout' onClick={() => Pagefunction()} disabled={disabled}>{value}</button>
  )
}

export default Button