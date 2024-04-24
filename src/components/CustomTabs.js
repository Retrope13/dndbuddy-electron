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
          <div id="home-content">fjdksalfjdklafjsdkl</div>
        </Tab>
        <Tab id="profile-tab" eventKey="profile" title="Profile">
          Tab content for Profile
        </Tab>
        <Tab id="contact-tab" eventKey="contact" title="Contact">
          Tab content for Contact
        </Tab>
      </Tabs>
    </div>
  );
}

export default CustomTabs;
