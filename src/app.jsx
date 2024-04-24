import React from "react";
import ReactDOM from "react-dom";
import CustomTabs from "./components/CustomTabs"; // Import your custom component
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <h1>Example heading</h1>
      <CustomTabs />
    </div>
  );
}

// Render the dynamic component
ReactDOM.render(<App />, document.body);
