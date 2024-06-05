import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import PlayerCharacter from "../Classes/PlayerCharacter";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { addItemsFromImport } from "../app";
import { InfoCircleFill } from "react-bootstrap-icons";

export function SpellSlots() {
  const [showSSModal, setShowSSModal] = useState(false);
  const FirstLevelCheckboxes = [
    { id: "inline-checkbox-1", disabled: false },
    { id: "inline-checkbox-1", disabled: false },
    { id: "inline-checkbox-1", disabled: false },
    { id: "inline-checkbox-1", disabled: false },
  ];
  const SecondtoFifthLevelCheckboxes = [
    { id: "inline-checkbox-2", disabled: false },
    { id: "inline-checkbox-2", disabled: false },
    { id: "inline-checkbox-2", disabled: false },
  ];
  const SixthAndSeventhLevelCheckboxes = [
    { id: "inline-checkbox-3", disabled: false },
    { id: "inline-checkbox-3", disabled: false },
  ];
  const EigthAndNinthLevelCheckboxes = [
    { id: "inline-checkbox-3", disabled: false },
  ];

  const handleCloseSSModal = () => setShowSSModal(false);
  const handleShowSSModal = () => setShowSSModal(true);

  function handleSSModal() {
    setShowSSModal(true);
  }
  return (
    <div id="wrapperDiv">
      <div id="flexContainer">
        <h3>Spell Slots:</h3>
        <button id="spellSlotInfoButton" onClick={handleSSModal()}>
          <InfoCircleFill className="infoIcons" />
        </button>
        <Form className="SpellSlotForm">
          <label class="SpellSlotLabel">1st level</label>
          {FirstLevelCheckboxes.map((checkbox) => (
            <div key={`inline-checkbox`} className="cb-3">
              <Form.Check
                key={checkbox.id}
                inline
                name="group1"
                type={"checkbox"}
                id={checkbox.id}
                disabled={checkbox.disabled}
              />
            </div>
          ))}
        </Form>

        <Form className="SpellSlotForm">
          <label class="SpellSlotLabel">2nd level</label>
          {SecondtoFifthLevelCheckboxes.map((checkbox) => (
            <div key={`inline-checkbox`} className="cb-3">
              <Form.Check
                key={checkbox.id}
                inline
                name="group1"
                type={"checkbox"}
                id={checkbox.id}
                disabled={checkbox.disabled}
              />
            </div>
          ))}
        </Form>

        <Form className="SpellSlotForm">
          <label class="SpellSlotLabel">3rd level</label>
          {SecondtoFifthLevelCheckboxes.map((checkbox) => (
            <div key={`inline-checkbox`} className="cb-3">
              <Form.Check
                key={checkbox.id}
                inline
                name="group1"
                type={"checkbox"}
                id={checkbox.id}
                disabled={checkbox.disabled}
              />
            </div>
          ))}
        </Form>

        <Form className="SpellSlotForm">
          <label class="SpellSlotLabel">4th level</label>
          {SecondtoFifthLevelCheckboxes.map((checkbox) => (
            <div key={`inline-checkbox`} className="cb-3">
              <Form.Check
                key={checkbox.id}
                inline
                name="group1"
                type={"checkbox"}
                id={checkbox.id}
                disabled={checkbox.disabled}
              />
            </div>
          ))}
        </Form>

        <Form className="SpellSlotForm">
          <label class="SpellSlotLabel">5th level</label>
          {SecondtoFifthLevelCheckboxes.map((checkbox) => (
            <div key={`inline-checkbox`} className="cb-3">
              <Form.Check
                key={checkbox.id}
                inline
                name="group1"
                type={"checkbox"}
                id={checkbox.id}
                disabled={checkbox.disabled}
              />
            </div>
          ))}
        </Form>

        <Form className="SpellSlotForm">
          <label class="SpellSlotLabel">6th level</label>
          {SixthAndSeventhLevelCheckboxes.map((checkbox) => (
            <div key={`inline-checkbox`} className="cb-3">
              <Form.Check
                key={checkbox.id}
                inline
                name="group1"
                type={"checkbox"}
                id={checkbox.id}
                disabled={checkbox.disabled}
              />
            </div>
          ))}
        </Form>

        <Form className="SpellSlotForm">
          <label class="SpellSlotLabel">7th level</label>
          {SixthAndSeventhLevelCheckboxes.map((checkbox) => (
            <div key={`inline-checkbox`} className="cb-3">
              <Form.Check
                key={checkbox.id}
                inline
                name="group1"
                type={"checkbox"}
                id={checkbox.id}
                disabled={checkbox.disabled}
              />
            </div>
          ))}
        </Form>

        <Form className="SpellSlotForm">
          <label class="SpellSlotLabel">8th level</label>
          {EigthAndNinthLevelCheckboxes.map((checkbox) => (
            <div key={`inline-checkbox`} className="cb-3">
              <Form.Check
                key={checkbox.id}
                inline
                name="group1"
                type={"checkbox"}
                id={checkbox.id}
                disabled={checkbox.disabled}
              />
            </div>
          ))}
        </Form>

        <Form className="SpellSlotForm">
          <label class="SpellSlotLabel">9th level </label>
          {EigthAndNinthLevelCheckboxes.map((checkbox) => (
            <div key={`inline-checkbox`} className="cb-3">
              <Form.Check
                key={checkbox.id}
                inline
                name="group1"
                type={"checkbox"}
                id={checkbox.id}
                disabled={checkbox.disabled}
              />
            </div>
          ))}
        </Form>

        <Modal show={showSSModal} onHide={handleCloseSSModal}>
          <Modal.Header closeButton>
            <Modal.Title>Oopsies!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You don't have enough gold to buy this item!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseSSModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
