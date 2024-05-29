// FlexContainer.js
import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import PlayerCharacter from "../Classes/PlayerCharacter";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const playerCharacterInstance = new PlayerCharacter();

//!These need to be extended scope so I can use them in app.jsx. There's probably a better way of doing this but I don't now it
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
  const [showFileModal, setShowFileModal] = useState(false);

  const handleCloseFileModal = () => setShowFileModal(false);
  const handleShowFileModal = () => setShowFileModal(true);

  const fileInput = document.getElementById("PCFileInput");
  let selectedFile;

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

  function importJSON() {
    const fileInput = document.getElementById("PCFileInput");
    const type = fileInput.files[0].type;
    const fileContent = "";
    if (type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        fileContent = content;
      };
      console.log(fileContent);
    } else {
      handleShowFileModal();
    }
  }

  function handleFileChange(event) {
    selectedFile = event.target.files[0];
    console.log(selectedFile);
  }

  return (
    <div id="wrapperDiv">
      <div id="flexContainer">
        <Modal show={showFileModal} onHide={handleCloseFileModal}>
          <Modal.Header closeButton>
            <Modal.Title>Oopsies!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              I can only accept JSON files! Make sure you clicked the right
              file!
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseFileModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
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
          <input
            type="file"
            id="PCFileInput"
            accept="application/json"
            onChange={handleFileChange}
          ></input>
          <button className="CharBtn" onClick={importJSON}></button>
        </div>
      </div>
    </div>
  );
}
