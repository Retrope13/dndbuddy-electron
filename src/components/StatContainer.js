import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { playerCharacterInstance } from "./CharacterContainer";

export function StatContainer() {
  //Handle change when modifying any of the text boxes for character info.
  function handleChange(event) {
    event.preventDefault();
    const placeholder = event.target.placeholder;
    const value = event.target.value;
    //Uses the placeholder variable to call setter functions to change the value of the member variable
    playerCharacterInstance[`_${placeholder}`] = value;
    console.log(playerCharacterInstance);
  }

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
            type="number"
            placeholder="PlayerName"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="CharacterName" label="Character Name">
          <Form.Control
            className="controlForms"
            type="number"
            placeholder="CharacterName"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Character Race"
          className="mb-3"
        >
          <Form.Control
            className="controlForms"
            type="number"
            placeholder="CharacterRace"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Character Class"
          className="mb-3"
        >
          <Form.Control
            className="controlForms"
            type="number"
            placeholder="CharacterClass"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Alignment"
          className="mb-3"
        >
          <Form.Control
            className="controlForms"
            type="number"
            placeholder="Alignment"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Level" className="mb-3">
          <Form.Control
            className="controlForms"
            type="number"
            placeholder="Level"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Gold" className="mb-3">
          <Form.Control
            className="controlForms"
            type="number"
            placeholder="Gold"
            id="goldInput"
            onChange={handleChange}
          />
        </FloatingLabel>
        <div id="buttonDiv">
          <button type="submit" className="CharBtn">
            Save
          </button>
          <button type="submit" className="CharBtn">
            Import
          </button>
        </div>
      </div>
    </div>
  );
}
