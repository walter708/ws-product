import React from 'react'

import './Error.scss'

function Error({message, status}) {
  return (
    <div className='error_container'>
      <h1>Error: {status}</h1>
      <p>{message}</p>
    </div>
  )
}

export default Error