// FlexContainer.js
import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import PlayerCharacter from "../Classes/PlayerCharacter";

function CharacterContainer() {
  const playerCharacterInstance = new PlayerCharacter();

  //Handle change when modifying any of the text boxes for character info.
  function handleChange(event) {
    event.preventDefault();
    const placeholder = event.target.placeholder;
    const value = event.target.value;
    playerCharacterInstance[`_${placeholder}`] = value;
    console.log(playerCharacterInstance);
  }

  //Handle creating the JSON file and the creation of the character.
  //There is a lot more to do here

  //There are several more character attributes to set here
  function handleSave(event) {
    event.preventDefault();

    console.log(playerCharacterInstance);
    createJSON();
  }

  function createJSON() {
    const jsonData = JSON.stringify(playerCharacterInstance);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download =
      playerCharacterInstance.getPlayerNameString +
      "-" +
      playerCharacterInstance.getCharNameString +
      ".json";
    a.click();

    // Clean up by revoking the URL object
    URL.revokeObjectURL(url);
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
            type="text"
            placeholder="PlayerName"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="CharacterName" label="Character Name">
          <Form.Control
            className="controlForms"
            type="CharName"
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
            type="text"
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
            type="text"
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
            type="text"
            placeholder="Alignment"
            onChange={handleChange}
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
            placeholder="ExperiencePoints"
            onChange={handleChange}
          />
        </FloatingLabel>
        <div id="buttonDiv">
          <button type="submit" className="CharBtn" onClick={handleSave}>
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

export default CharacterContainer;
