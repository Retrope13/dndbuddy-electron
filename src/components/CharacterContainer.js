// FlexContainer.js
import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function CharacterContainer() {
  const [formData, setFormData] = useState({
    PlayerName: "",
    CharacterName: "",
    CharacterRace: "",
    CharacterClass: "",
    Alignment: "",
    ExperiencePoints: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    const placeholder = event.target.placeholder;
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [placeholder]: value,
    }));
    console.log(formData);
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
            onChange={handleSubmit}
          />
        </FloatingLabel>
        <FloatingLabel controlId="CharacterName" label="Character Name">
          <Form.Control
            className="controlForms"
            type="CharName"
            placeholder="CharacterName"
            onChange={handleSubmit}
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
            onChange={handleSubmit}
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
            onChange={handleSubmit}
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
            onChange={handleSubmit}
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
            onChange={handleSubmit}
          />
        </FloatingLabel>
        <div id="buttonDiv">
          <button type="submit" className="CharBtn" onClick={handleSubmit}>
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
