// FlexContainer.js
import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function CharacterContainer() {
  return (
    <div id="wrapperDiv">
      <div id="flexContainer">
        {/* These floating labels are what allow the input fields to shrink the placeholder text */}
        <FloatingLabel
          controlId="floatingInput"
          label="Player Name"
          className="mb-3"
        >
          {/* This is what allows the form to be submitted */}
          <Form.Control
            className="controlForms"
            type="text"
            placeholder="Player Name"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floating Character Name"
          label="Character Name"
        >
          <Form.Control
            className="controlForms"
            type="CharName"
            placeholder="CharacterName"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Character Race"
          className="mb-3"
        >
          <Form.Control
            className="controlForms"
            type="text"
            placeholder="Character Race"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Character Class"
          className="mb-3"
        >
          <Form.Control
            className="controlForms"
            type="text"
            placeholder="Character Class"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Alignment"
          className="mb-3"
        >
          <Form.Control
            className="controlForms"
            type="text"
            placeholder="Alignment"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Experience Points"
          className="mb-3"
        >
          <Form.Control
            className="controlForms"
            type="text"
            placeholder="Experience Points"
          />
        </FloatingLabel>
        <div id="buttonDiv">
          <button className="CharBtn">Save</button>
          <button className="CharBtn">Import</button>
        </div>
      </div>
    </div>
  );
}

export default CharacterContainer;
