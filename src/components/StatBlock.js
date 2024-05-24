// FlexContainer.js
import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { playerCharacterInstance } from "./CharacterContainer";

export function StatBlock() {
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
      <div id="statFlexContainer">
        {/* These floating labels are what allow the input fields to shrink the placeholder text */}
        <FloatingLabel controlId="floatingInput" label="Str" className="sb-1">
          {/* This is what allows the form to be submitted */}
          <Form.Control
            className="controlForms"
            type="number"
            placeholder="Strength"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Dex" className="sb-1">
          <Form.Control
            className="controlForms"
            type="number"
            placeholder="Dexterity"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Con" className="sb-1">
          <Form.Control
            className="controlForms"
            type="number"
            placeholder="Constitution"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Int" className="sb-1">
          <Form.Control
            className="controlForms"
            type="number"
            placeholder="Intelligence"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Wis" className="sb-1">
          <Form.Control
            className="controlForms"
            type="number"
            placeholder="Wisdom"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Char" className="sb-1">
          <Form.Control
            className="controlForms"
            type="number"
            placeholder="Charisma"
            onChange={handleChange}
          />
        </FloatingLabel>
      </div>
    </div>
  );
}
