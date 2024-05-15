import React, { useState } from "react";
import ReactDOM from "react-dom";
import CustomTabs from "./components/CustomTabs"; // Import your custom component
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { StatContainer } from "./components/StatContainer";
import {
  CharacterContainer,
  getGold,
  setGold,
} from "./components/CharacterContainer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [inventoryWeapons, setInventoryWeapons] = useState([]);
  const [show, setShow] = useState(false);
  const [WeaponStoreList, setWeaponStoreList] = useState([]);
  let WeaponStoreJSON = require("./itemFiles/Weapons.json");
  let i = 0;
  //this will be for later when I import characters. I'm hoping I can use all of the same functions for the store and character
  let CharJSON;
  function addWeaponToInv(weapon) {
    //I need to come up with a way to caluclate the number of spaces needed to align all of the damage, prices, etc vertically
    setInventoryWeapons((prevInventoryWeapons) => {
      const updatedInventoryWeapons = [
        ...prevInventoryWeapons,
        <div key={weapon.id}>
          {weapon.name}
          {weapon.damage} {weapon.damageType} {weapon.price}
          <button
            className="WeaponInvButtons"
            onClick={(event) => handleSellClick(event, weapon)}
          >
            Sell
          </button>
        </div>,
      ];
    });
  }

  function handleSellClick(event, weapon) {
    const button = event.target;
    const parentDiv = button.parentElement;
    const PlayerGold = getGold();
    setGold(PlayerGold + Number(weapon.price));
    parentDiv.remove();
  }

  function handleBuyClick(element) {
    const PlayerGold = getGold();
    if (PlayerGold >= Number(element.price)) {
      setGold(PlayerGold - Number(element.price));
      addWeaponToInv(element);
    } else if (PlayerGold < Number(element.price)) {
      handleShow();
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function readWeapons(WeaponFile) {
    //find the longest name for spacing reasons below
    let longestNameLength = 0;
    WeaponFile.forEach((element) => {
      if (longestNameLength < element.name.length) {
        longestNameLength = element.name.length;
      }
    });
    let i = 0;
    if (WeaponStoreList.length == 0) {
      WeaponFile.forEach((element) => {
        const spacesNeeded = 20 - element.name.length; //I really don't understand why this doesn't look right
        const spaces = "  ".repeat(spacesNeeded);
        WeaponStoreList.push(
          <div className="WeaponItem" key={element.name + i}>
            {element.name} {spaces} {element.damage} {element.damageType + " "}
            {element.price}
            <button
              className="WeaponStoreButtons"
              onClick={() => handleBuyClick(element)}
            >
              Buy
            </button>
          </div>
        );
        i++;
      });
    }
  }

  function readArmor() {
    //var ArmorJSON = require("./itemFiles/Armor.json");
  }

  function readSpells() {
    //var SpellsJSON = require("./itemFiles/Spells.json");
  }

  //T
  readWeapons(WeaponStoreJSON);
  return (
    <div id="wrapperDiv">
      <h1>Example heading</h1>
      <div id="containerContainer">
        <CharacterContainer />
        <StatContainer />
      </div>
      <br></br>
      <label>Inventory</label>
      <label>Store</label>
      <div id="CustomTabsDiv">
        <CustomTabs
          id="invTabs"
          weapons={inventoryWeapons}
          armor={"leather"}
          spells={"magic missle"}
        />
        <CustomTabs
          id="storeTabs"
          weapons={WeaponStoreList}
          armor={"leather"}
          spells={"magic missle"}
        />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Oopsies!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You don't have enough gold to buy this item!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// Render the dynamic component
ReactDOM.render(<App />, document.body);
