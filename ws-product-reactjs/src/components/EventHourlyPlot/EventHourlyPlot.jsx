import React, {useState, useEffect, useCallback} from 'react'
import "./EventHourlyPlot.scss"
import dayjs from 'dayjs'
import PlotGraph from '../PlotGraph/PlotGraph';
import Select from '../Select/Select';

import {useFetch, Error} from '../../constant';

function EventHourlyPlot({url}) {
  const {data, loading, error} = useFetch(url)
  const [points, setPoints] = useState({})
  const [xvalues, setXvalues] = useState([])
  const [yvalues, setYvalues] = useState([])
  const [value, setValues] = useState("")
  
  const processData = useCallback(() =>{
    let tmp_val = {}
    let firstKey = ''
    let flag = true
    data.forEach(item => {
      let newDate = dayjs(item.date).format("MMMM D, YYYY")
      if(flag){
        firstKey = newDate
        flag = false
      }
      if(!(newDate in tmp_val)){
        tmp_val[newDate] = {events: [] , hours :[]}
     }
     tmp_val[newDate].events.push(item.events)
     tmp_val[newDate].hours.push(item.hour)
  })
  setPoints(tmp_val)
  setXvalues(tmp_val[firstKey]?.hours)
  setYvalues(tmp_val[firstKey]?.events)
  
},[data])
  
  useEffect(()=>{
    processData()
 },[processData])
 

  if(loading) return <p>Loading...</p>
  if (error) return <Error  message={error.message} status={error.response.status}/>
  
  const handleChange = (e) =>{
    let id = e.target.value
    let set = points[id]
    setValues(id)
    setXvalues(set.hours)
    setYvalues(set.events)
  }
  let dateKeys = Object.keys(points)

   return (
     <>
     <div className='plot'>
      <div className='plot__option'>
      <label>
        Select a Day
      </label>
        <Select value={value} onChange={handleChange} options={dateKeys}/>
      </div>
      {xvalues && <PlotGraph xvalues={xvalues}  yvalues={yvalues} xTitle="hours" yTitle="events" title ="Event Hourly Plot"/>}
     </div>
     
     </>
  )}


export default EventHourlyPlot