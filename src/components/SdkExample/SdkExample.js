import './SdkExample.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { embedDashboard } from "@superset-ui/embedded-sdk";

function SdkExample() {
  const SUPERSET_CONTAINER_ID = "superset-container";

  let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7Imxhc3RfbmFtZSI6IlJvc3NpIiwidXNlcm5hbWUiOiJtcm9zc2kiLCJmaXJzdF9uYW1lIjoiTWFyaW8ifSwicmVzb3VyY2VzIjpbeyJpZCI6IjExNTkzMzk0LWY3MWYtNGUwNS1hNTllLWM4MzE3NGJiMDJiZSIsInR5cGUiOiJkYXNoYm9hcmQifV0sInJsc19ydWxlcyI6W10sImlhdCI6MTY3MzM4MjA1NC42NzQ2NDQyLCJleHAiOjE2NzMzODIzNTQuNjc0NjQ0MiwiYXVkIjoiaHR0cDovL3N1cGVyc2V0OjgwODgvIiwidHlwZSI6Imd1ZXN0In0.HYONgV8_sCTyxB_keU_K-tTRh6hmqMZzqOatXWg8nIc'
  
  let embedDashboardOnClick = () => embedDashboard({
      id: "11593394-f71f-4e05-a59e-c83174bb02be",
      supersetDomain: "http://localhost:32000",
      mountPoint: document.getElementById(SUPERSET_CONTAINER_ID),
      fetchGuestToken: () => token,
      dashboardUiConfig: { hideTitle: true }
  });

  return <>
  <div id = {SUPERSET_CONTAINER_ID}></div>
  <button onClick= {embedDashboardOnClick}>Embed</button>
  </>
}

export default SdkExample;
