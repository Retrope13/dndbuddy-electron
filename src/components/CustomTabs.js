// CustomTabs.js
import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function CustomTabs() {
  const [key, setKey] = useState("home");

  return (
    <div id="tabs-container">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab id="home-tab" eventKey="home" title="Home">
          <div className="tabContent">fjdksalfjdklafjsdkl</div>
        </Tab>
        <Tab id="profile-tab" eventKey="profile" title="Profile">
          <div className="tabContent">Tab content for Profile</div>
        </Tab>
        <Tab id="contact-tab" eventKey="contact" title="Contact">
          <div className="tabContent">Tab content for Contact</div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default CustomTabs;
