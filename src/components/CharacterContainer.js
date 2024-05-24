// FlexContainer.js
import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import PlayerCharacter from "../Classes/PlayerCharacter";

export const playerCharacterInstance = new PlayerCharacter();

export function getGold() {
  return playerCharacterInstance._Gold;
}

export function setGold(newGold) {
  let goldInput = document.getElementById("goldInput");
  goldInput.value = newGold;
  playerCharacterInstance._Gold = newGold;
}

//& The function that adds items to the playerCharacterInstance inventory
export function setItems(itemType, item) {
  if (itemType == "weapon") {
    playerCharacterInstance._Weapons.push(item);
  } else if (itemType == "armor") {
    playerCharacterInstance._Armors.push(item);
  } else if (itemType == "spell") {
    playerCharacterInstance._Spells.push(item);
  }
  console.log(playerCharacterInstance);
}

//^ Function that removes an item from the playerCharacterInstance inventory without iteration
export function removeItem(itemType, item) {
  const indexOfItem = playerCharacterInstance._Weapons.indexOf(item);
  if (itemType == "weapon") {
    playerCharacterInstance._Weapons.splice(indexOfItem, indexOfItem);
    console.log(playerCharacterInstance._Weapons);
  } else if (itemType == "armor") {
    playerCharacterInstance._Armors.splice(indexOfItem, indexOfItem);
  } else if (itemType == "spell") {
    playerCharacterInstance._Spells.splice(indexOfItem, indexOfItem);
  }
}

export function CharacterContainer() {
  //Handle change when modifying any of the text boxes for character info.
  function handleChange(event) {
    event.preventDefault();
    const placeholder = event.target.placeholder;
    const value = event.target.value;
    //Uses the placeholder variable to call setter functions to change the value of the member variable
    playerCharacterInstance[`_${placeholder}`] = value;
    console.log(playerCharacterInstance);
  }

  function createJSON() {
    //Turn the playercharacter instance to a JSON string
    const jsonData = JSON.stringify(playerCharacterInstance);
    const blob = new Blob([jsonData], { type: "application/json" });
    //URL can be created using the JSON data
    const url = URL.createObjectURL(blob);

    //Create a link element, turn the href into a download link, name the file
    const a = document.createElement("a");
    a.href = url;
    a.download =
      playerCharacterInstance.getPlayerNameString +
      "-" +
      playerCharacterInstance.getCharNameString +
      ".json";
    //then click the download link
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
        <FloatingLabel controlId="floatingInput" label="Level" className="mb-3">
          <Form.Control
            className="controlForms"
            type="text"
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
          <button type="submit" className="CharBtn" onClick={createJSON}>
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
