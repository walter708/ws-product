import React from 'react'
import "./StatDailyPlot.scss"
import dayjs from 'dayjs'
import {useFetch, Error} from '../../constant';
import { useEffect, useState, useCallback} from "react"
import PlotGraph from '../PlotGraph/PlotGraph';
import Select from '../Select/Select';

function StatDailyPlot({url}) {
  const {data, loading, error} = useFetch(url)
  const [points, setPoints] = useState({})
  const [xvalues, setXvalues]= useState([])
  const [yvalues, setYvalues] = useState([])
  const [attr, setAttr] = useState("")
  
  const processData = useCallback(() =>{
    let tmp_val = {impressions: [] , clicks :[], revenue:[]}
    let dates = []
    data.forEach(item => {
      let newDate = dayjs(item.date).format("MMMM D, YYYY")
      dates.push(newDate)
      tmp_val.impressions.push(item.impressions)
      tmp_val.clicks.push(item.clicks)
      tmp_val.revenue.push(item.revenue)
  })
  setPoints(tmp_val)
  setYvalues(tmp_val?.impressions)
  setXvalues(dates)
  setAttr("impressions")
},[data])
 
  useEffect(()=>{
    processData()
 },[processData])
 
 if(loading) return <p>Loading...</p>
 if (error) return <Error  message={error.message} status={error.response.status}/>
 let attrKeys = Object.keys(points) 
 
 const handleAttrChange = (e) =>{
  let value = e.target.value
  setAttr(value)
  let attrItem = points[value]
  setYvalues(attrItem)
}
  
  return (
    <div className='plot'>
      <div className='plot__option'>
       <label>
            Select an Attribute
       </label>
            {attrKeys && <Select value={attr} onChange={(e) => handleAttrChange(e)}  options={attrKeys} /> }
                 
            
         
      </div>
       <PlotGraph xvalues={xvalues}  yvalues={yvalues} xTitle="days" yTitle={attr} title ="Stats Daily Plot" />
    </div>
  )
}

export default StatDailyPlot