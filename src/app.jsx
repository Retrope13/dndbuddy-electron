import React from "react";
import ReactDOM from "react-dom";
import CustomTabs from "./components/CustomTabs"; // Import your custom component
import CharacterContainer from "./components/CharacterContainer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div id="wrapperDiv">
      <h1>Example heading</h1>
      <CharacterContainer />
      <br></br>
      <CustomTabs weapons={"mace"} armor={"leather"} spells={"magic missle"} />
    </div>
  );
}

// Render the dynamic component
ReactDOM.render(<App />, document.body);
