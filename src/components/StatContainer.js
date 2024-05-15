import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { playerCharacterInstance } from "./CharacterContainer";

export const statsDict = {
  Strength: 0,
  Dexterity: 0,
  Constitution: 0,
  Intelligence: 0,
  Wisdom: 0,
  Charisma: 0,
};

export function StatContainer() {
  //Handle change when modifying any of the text boxes for character info.
  function handleChange(event) {
    event.preventDefault();
    const placeholder = event.target.placeholder;
    const value = event.target.value;
    //^I need to figure out how to make this work for an array of stats
    statsDict[placeholder] = value;
    playerCharacterInstance.setStats = statsDict;
    console.log(playerCharacterInstance);
  }

  return (
    <div id="statWrapperDiv">
      <div id="flexContainer">
        {/* These floating labels are what allow the input fields to shrink the placeholder text */}
        <FloatingLabel
          controlId="floatingInput"
          label="Strength"
          className="mb-3"
        >
          {/* This is what allows the form to be submitted */}
          <Form.Control
            className="controlForms"
            type="number"
            placeholder="Strength"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="CharacterName" label="Dexterity">
          <Form.Control
            className="controlForms"
            type="number"
            placeholder="Dexterity"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Constitution"
          className="mb-3"
        >
          <Form.Control
            className="controlForms"
            type="number"
            placeholder="Constiturion"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Intelligence"
          className="mb-3"
        >
          <Form.Control
            className="controlForms"
            type="number"
            placeholder="Intelligence"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Wisdom"
          className="mb-3"
        >
          <Form.Control
            className="controlForms"
            type="number"
            placeholder="Wisdom"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Charisma"
          className="mb-3"
        >
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
