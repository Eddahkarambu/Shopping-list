import React from "react";
import Paths from "./Components/Router";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Paths />
      </Router>
    </div>
  );
}

export default App;
