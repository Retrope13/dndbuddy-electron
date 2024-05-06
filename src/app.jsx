import React from "react";
import ReactDOM from "react-dom";
import CustomTabs from "./components/CustomTabs"; // Import your custom component
import CharacterContainer from "./components/CharacterContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { PlayerCharacter } from "./Classes/PlayerCharacter";

function App() {
  return (
    <div id="wrapperDiv">
      <h1>Example heading</h1>
      <CharacterContainer />
      <br></br>
      <CustomTabs />
    </div>
  );
}

// Render the dynamic component
ReactDOM.render(<App />, document.body);
