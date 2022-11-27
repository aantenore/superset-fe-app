import './IframeExample.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function IframeExample() {

  const [chartLink, setChartLink] = useState("");
  const [chartIds, setChartIds] = useState([]); 
  const [selectedChartId, setSelectedChartId] = useState("")

  const host = 'http://localhost:32001'

  useEffect(() => {
    axios.get(host + '/chart').then(response => setChartIds(response.data.ids))
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

  return (<>
    <select
          name="Available charts"
          onChange={e => handleChartSelect(e)}
          value={selectedChartId}
    >
      <option value="">Select the chart</option>
      {chartIds.map((chartId, key) => (
        <option key={key} value={chartId}>
          {chartId}
        </option>
      ))}
    </select>
    {chartLink.length > 0?
    <iframe
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
