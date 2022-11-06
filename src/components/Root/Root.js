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
        <Routes>
          <Route exact path="/" />
          <Route path="/sdk" element={<SdkExample/>} />
          <Route path="/iframe" element={<IframeExample/>} />
        </Routes>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/sdk">Sdk</Link>
            </li>
            <li>
              <Link to="/Iframe">Iframe</Link>
            </li>
          </ul>
        </div>
      </Router>
    </>);
}

export default Root;
