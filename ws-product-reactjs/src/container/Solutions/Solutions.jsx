import React, { useState } from 'react'
import {Button} from '../../components';
import './Solutions.scss'

function Solutions({children}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [disableNext, setDisableNext] = useState(false)
  const [disablePrevious, setDisablePrevious] = useState(false)
  
  const currentChild = children[currentIndex]
  
  const goToNext = () => {
    let nextIndex = currentIndex + 1
    if(nextIndex < children.length){
      setCurrentIndex(nextIndex)
      setDisablePrevious(false)
    }else{
      setDisableNext(true)
    }
  }
  
  const goToPrevious = () => {
    let previousIndex = currentIndex - 1
    if(previousIndex >= 0){
      setCurrentIndex(previousIndex)
      setDisableNext(false)
    }else{
      setDisablePrevious(true)
    }
  }
  return (
    <div className='soln__container'>
    {currentChild}
    <div className='soln__btns'>
    <Button  Pagefunction ={goToPrevious}  disabled ={disablePrevious}  value ='&#8249;' />
    <Button  Pagefunction ={goToNext}  disabled ={disableNext}  value ='&#8250;' />
    </div>
    </div>
  )

  
}

export default Solutions