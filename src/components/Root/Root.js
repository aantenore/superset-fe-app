import './Root.css';
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route
} from "react-router-dom";
import IframeExample from '../IframeExample/IframeExample';
import SdkExample from '../SdkExample/SdkExample';

function Root() {

  return (<>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li>
              <Link to="/sdk">Sdk</Link>
            </li> */}
            <li>
              <Link to="/iframe">Iframe</Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route exact path="/" element={
          <div style={{"padding": "0.2%", "width":"99.6%", "display":"flex", "justify-content": "space-between", "position": "absolute","bottom": 0, "left": 0}}>
            <img src='https://d11wkw82a69pyn.cloudfront.net/siteassets/images/logos/companies/blue-reply-logo.png' alt="No logo available"></img>
            <div style={{"align-self": "flex-end"}}>Apache Superset POT by Antonio Antenore</div>
          </div>
          }/>
          {/* <Route path="/sdk" element={<SdkExample/>} /> */}
          <Route path="/iframe" element={<IframeExample/>} />
        </Routes>
      </Router>
    </>);
}

export default Root;
