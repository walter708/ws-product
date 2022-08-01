import React, {useState, useEffect, useCallback} from 'react'
import "./EventDailyPlot.scss"
import dayjs from 'dayjs'
import PlotGraph from '../PlotGraph/PlotGraph';
import {useFetch, Error} from '../../constant';



function EventDailyPlot({url}) {
  const {data, loading, error} = useFetch(url)
  const [xvalues, setXvalues] = useState([])
  const [yvalues, setYvalues] = useState([])
  const processData = useCallback(() =>{
     let events = [] 
     let days = []
     data && data.forEach((item) => {
      days.push(dayjs(item.date).format("MMMM D, YYYY"))
      events.push(item.events)
     })
     setXvalues(days)
     setYvalues(events)
    },[data])
  
  useEffect(()=>{
    processData()
 },[processData])
  if(loading) return <p>Loading</p>
  if (error) return <Error  message={error.message} status={error.response.status}/>
  return (
     xvalues && <PlotGraph xvalues={xvalues}  yvalues={yvalues} xTitle="Hours" yTitle="events" title ="Event Daily Plot"/> 
  )
}

export default EventDailyPlot
