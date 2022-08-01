import "./StatHourlyPlot.scss"
import dayjs from 'dayjs'
import {useFetch, Error} from '../../constant';
import { useEffect, useState, useCallback} from "react"
import PlotGraph from '../PlotGraph/PlotGraph';
import Select from '../Select/Select';

function StatHourlyPlot({url}) {
  const {data, loading, error} = useFetch(url)
  const xvalues = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19, 20, 21, 22, 23]
  const [points, setPoints] = useState({})
  const [yvalues, setYvalues] = useState([])
  const [day, setDay] = useState("")
  const [attr, setAttr] = useState("")
    const processData = useCallback(() =>{
      let tmp_val = {}
      let flag = true
      let firstKey = ""
      data.forEach(item => {
        let newDate = dayjs(item.date).format("MMMM D, YYYY")
        if(flag){
          firstKey = newDate
          flag = false
        }
        if(!(newDate in tmp_val)){
          tmp_val[newDate] = {impressions: [] , clicks :[], revenue:[]}
       }
       tmp_val[newDate].impressions.push(item.impressions)
       tmp_val[newDate].clicks.push(item.clicks)
       tmp_val[newDate].revenue.push(item.revenue)
    })
    setPoints(tmp_val)
    setYvalues(tmp_val[firstKey]?.impressions)
    setAttr("impressions")
    setDay(firstKey)
    
  },[data])
  useEffect(()=>{
    processData()
 },[processData])
 
 if(loading) return <p>Loading...</p>
 if (error) return <Error  message={error.message} status={error.response.status}/>
 let dateKeys = Object.keys(points)
 let id = dateKeys[0] || ""
 let row = points[id] || {} 
 let attrKeys = Object.keys(row) || []

 
 const handleDayChange = (e) =>{
  let current = e.target.value
  setDay(current)
  let dayItem = points[current]
  setYvalues(dayItem[attr])
}
const handleAttrChange = (e) =>{
  let value = e.target.value
  setAttr(value)
  let dayItem = points[day]
  setYvalues(dayItem[value])
}
 return (
   <>
   <div className='plot'>
    <div className='plot__option'>
    <label>
      Select a Day
      </label>
      {dateKeys && <Select value={day} onChange={(e) => handleDayChange(e)} options={dateKeys} />}
           
     <label>
      Select an Attribute
      </label>
      {attrKeys && <Select value={attr} onChange={(e) => handleAttrChange(e)} options={attrKeys}/>}
          
   
    
    </div>
    {yvalues && <PlotGraph xvalues={xvalues}  yvalues={yvalues} xTitle="hours" yTitle={attr} title ="Stats Hourly Plot"/>}
   </div>
   
   </>
)}


export default StatHourlyPlot