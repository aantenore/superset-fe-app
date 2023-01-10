import './IframeExample.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver'

function IframeExample() {

  const availableFormat = ["csv", "json"]
  
  const [chartLink, setChartLink] = useState("");
  const [charts, setCharts] = useState([]);
  const [selectedChartId, setSelectedChartId] = useState("")
  const [dashboards, setDashboards] = useState([]);
  const [selectedDashboardId, setSelectedDashboard] = useState("");
  const [format, setFormat] = useState("csv")

  const host = 'http://localhost:32001'

  useEffect(() => {
    if (charts?.every(chart => selectedChartId !== chart.id)) {
      setSelectedChartId("")
    }
  }, [charts])

  useEffect(() => {
    if (selectedDashboardId !== "" && dashboards !== []) {
      axios.get(host + '/' + selectedDashboardId +'/chart').then(response => setCharts(response.data.result)).catch(e => {
        console.log(e)
        setCharts([])
      })
    } else {
      axios.get(host + '/chart').then(response => setCharts(response.data.result)).catch(e => {
        console.log(e)
        setCharts([])
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
    dashboards?.filter(d => {
      return d.id?.toString() === e.target.value?.toString();
    })?.map(d => setChartLink(d.url))
    setSelectedDashboard(e.target.value)
  }

  var download = () => {
    if (chartLink.length>0) {
      axios.get(host + '/chart/' + selectedChartId + "/link?format=" + format)
      .then(response => saveAs(response.data.link))
      .catch(e => {
        console.log(e)
      })
    }
  }

  return (<>
    <div style={{"display":"flex", "justify-content": "center"}}>
    <select
          name="Available dashboards"
          onChange={e => handleDashboardSelect(e)}
          value={selectedDashboardId}
          style = {{"margin": "0.1%"}}
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
          style = {{"margin": "0.1%"}}
    >
      <option value="">Select the chart</option>
      {charts.map((chart, key) => (
        <option key={key} value={chart.id}>
          {chart.slice_name}
        </option>
      ))}
    </select>
    </div>
    {chartLink.length > 0?
    <>
    <iframe
      title="chartIframe"
      seamless
      frameBorder="0"
      scrolling="no"
      src={chartLink}
    >
    </iframe>
    <select
          name="Available format"
          onChange={e => setFormat(e.target.value)}
          value={format}
          style = {{"margin": "0.1%"}}
    >
    {
      availableFormat.map(format => {
        return <option value={format}>{format}</option>
      })
    }
    </select><button style = {{"margin": "0.1%"}} onClick={download}>Download</button>
    </>
    :<></>}
  </>);
}

export default IframeExample;
