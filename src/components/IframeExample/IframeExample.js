import './IframeExample.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function IframeExample() {

  const [chartLink, setChartLink] = useState("");
  const [charts, setCharts] = useState([]);
  const [selectedChartId, setSelectedChartId] = useState("")
  const [dashboards, setDashboards] = useState([]);
  const [selectedDashboardId, setSelectedDashboard] = useState("");

  const host = 'http://localhost:32001'

  useEffect(() => {
    if (selectedDashboardId !== "" && dashboards !== []) {
      axios.get(host + '/' + selectedDashboardId +'/chart').then(response => setCharts(response.data.result)).catch(e => {
        console.log(e)
        setCharts([])
        return []
      }).then(charts => {
        if (charts.every(chart => selectedChartId !== chart.id)) {
          setChartLink("")
        }
      })
    } else {
      axios.get(host + '/chart').then(response => setCharts(response.data.result)).catch(e => {
        console.log(e)
        setCharts([])
        return []
      })
    }
  }, [selectedDashboardId, dashboards])

  useEffect(() => {
    axios.get(host + '/dashboard').then(response => setDashboards(response.data.result)).catch(e => {
      console.log(e)
      setDashboards([])
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
    setSelectedDashboard(e.target.value)
  }

  return (<>
    <select
          name="Available dashboards"
          onChange={e => handleDashboardSelect(e)}
          value={selectedDashboardId}
    >
      <option value="">Select the dashboard</option>
      {dashboards.map((dashboard, key) => (
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
      {charts.map((chart, key) => (
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
