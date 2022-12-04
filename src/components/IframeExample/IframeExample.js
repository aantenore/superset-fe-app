import './IframeExample.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function IframeExample() {

  const [chartLink, setChartLink] = useState("");
  const [chartIds, setChartIds] = useState([]);
  const [selectedChartId, setSelectedChartId] = useState("")
  const [dashboardIds, setDashboardIds] = useState([]);
  const [selectedDashboardId, setSelectedDashboardId] = useState("");

  const host = 'http://localhost:32001'

  useEffect(() => {
    if (selectedDashboardId !== "" && dashboardIds !== []) {
      axios.get(host + '/' + selectedDashboardId +'/chart').then(response => setChartIds(response.data.result)).catch(e => {
        console.log(e)
        setChartIds([])
      })
    } else {
      axios.get(host + '/chart').then(response => setChartIds(response.data.result)).catch(e => {
        console.log(e)
        setChartIds([])
      })
    }
  }, [selectedDashboardId, dashboardIds])

  useEffect(() => {
    axios.get(host + '/dashboard').then(response => setDashboardIds(response.data.result)).catch(e => {
      console.log(e)
      setDashboardIds([])
    })
  }, [])

  var handleChartSelect = (e) => {
    e.preventDefault()
    var chartId = e.target.value
    if (e?.target?.value?.length > 0) {
      axios.get(host + '/chart/' + chartId).then(response => {
        setChartLink(response.data.link)
      })
    } else {
      setChartLink("")
    }
    setSelectedChartId(chartId)
  }

  var handleDashboardSelect = (e) => {
    e.preventDefault()
    setSelectedDashboardId(e.target.value)
  }

  return (<>
    <select
          name="Available dashboards"
          onChange={e => handleDashboardSelect(e)}
          value={selectedDashboardId}
    >
      <option value="">Select the dashboard</option>
      {dashboardIds.map((dashboard, key) => (
        <option key={key} value={dashboard.id}>
          {dashboard.dashboard_title}
        </option>
      ))}
    </select>
    <select
          name="Available charts"
          onChange={e => handleChartSelect(e)}
          value={selectedChartId}
    >
      <option value="">Select the chart</option>
      {chartIds.map((chart, key) => (
        <option key={key} value={chart.id}>
          {chart.slice_name}
        </option>
      ))}
    </select>
    {chartLink.length > 0?
    <iframe
      title="chartIframe"
      seamless
      frameBorder="0"
      scrolling="no"
      src={chartLink}
    >
    </iframe>
    :<></>}
  </>);
}

export default IframeExample;
