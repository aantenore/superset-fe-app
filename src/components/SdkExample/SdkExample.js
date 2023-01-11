import './SdkExample.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { embedDashboard } from "@superset-ui/embedded-sdk";

function SdkExample() {
  const SUPERSET_CONTAINER_ID = "superset-container"
  const id = "11593394-f71f-4e05-a59e-c83174bb02be"
  const host = 'http://localhost:32001'

  useEffect(() => {
    embedDashboard({
      id: id,
      supersetDomain: "http://localhost:32000",
      mountPoint: document.getElementById(SUPERSET_CONTAINER_ID),
      fetchGuestToken: () => axios.get(host + '/guest_token/' + id).then(response => response.data.token),
      dashboardUiConfig: { hideTitle: true }
    })
  }, [])

  return <>
  <div id = {SUPERSET_CONTAINER_ID}></div>
  </>
}

export default SdkExample;
