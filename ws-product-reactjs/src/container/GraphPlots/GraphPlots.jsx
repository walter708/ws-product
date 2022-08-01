import React from 'react'
import "./GraphPlots.scss"
import {EventDailyPlot, StatHourlyPlot, EventHourlyPlot,StatDailyPlot,Tabs, Panel} from "../../components"

function GraphPlots() {
  return (
    <Tabs>
    <Panel title ="EventHourlyPlot"><EventHourlyPlot url="http://localhost:5555/events/hourly" /></Panel>
    <Panel title ="EventDailyPlot"><EventDailyPlot url="http://localhost:5555/events/daily" /></Panel>
    <Panel title ="StatHourlyPlot"><StatHourlyPlot url="http://localhost:5555/stats/hourly" /></Panel>
    <Panel title ="StatDailyPlot"><StatDailyPlot url="http://localhost:5555/stats/daily" /></Panel>
   </Tabs>
  )
}

export default GraphPlots