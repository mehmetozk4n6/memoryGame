import "./App.css";
import React from "react";
import PlayGround from "./components/PlayGround";
import Pointer from "./components/Pointer";

function App() {
  return (
    <div id="app" className="App">
      <Pointer />
      <PlayGround />
    </div>
  );
}

export default App;
