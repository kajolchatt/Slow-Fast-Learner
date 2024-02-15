import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import RouteApp from "./components/RouteApp.js";
function App() {
  return (
    <Router>
      <div className="App">
        <RouteApp />
      </div>
    </Router>
  );
}

export default App;
