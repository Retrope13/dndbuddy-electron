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
    //Uses the placeholder value to change the dict key pair with the same name
    statsDict[placeholder] = value;
    //then changes the stats using the stats setter
    playerCharacterInstance.setStats = statsDict;
    console.log(playerCharacterInstance);
  }

  return (
    <div id="statsWrapperDiv">
      <div id="statsFlexContainer">
        {/* These floating labels are what allow the input fields to shrink the placeholder text */}
        <FloatingLabel
          controlId="floatingInput"
          label="Str"
          className="statLabel"
        >
          {/* This is what allows the form to be submitted */}
          <Form.Control
            className="statInput"
            type="number"
            placeholder="Strength"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="CharacterName" label="Dex">
          <Form.Control
            className="statInput"
            type="number"
            placeholder="Dexterity"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Con"
          className="statLabel"
        >
          <Form.Control
            className="statInput"
            type="number"
            placeholder="Constitution"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Int"
          className="statLabel"
        >
          <Form.Control
            className="statInput"
            type="number"
            placeholder="Intelligence"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Wis"
          className="statLabel"
        >
          <Form.Control
            className="statInput"
            type="number"
            placeholder="Wisdom"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Char"
          className="statLabel"
        >
          <Form.Control
            className="statInput"
            type="number"
            placeholder="Charisma"
            onChange={handleChange}
          />
        </FloatingLabel>
      </div>
    </div>
  );
}
