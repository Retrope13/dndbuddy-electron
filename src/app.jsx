import React, { useState } from "react";
import ReactDOM from "react-dom";
import CustomTabs from "./components/CustomTabs"; // Import your custom component
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  CharacterContainer,
  getGold,
  setGold,
} from "./components/CharacterContainer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [inventoryWeapons, setInventoryWeapons] = useState([]);
  const tempWeaponsInv = [];
  const [show, setShow] = useState(false);
  const [WeaponStoreList, setWeaponStoreList] = useState([]);
  const [ArmorStoreList, setArmorStoreList] = useState([]);
  let WeaponStoreJSON = require("./itemFiles/Weapons.json");
  let ArmorStoreJSON = require("./itemFiles/Armor.json");
  let i = 0;
  //this will be for later when I import characters. I'm hoping I can use all of the same functions for the store and character
  let CharJSON;
  function addItemToInv(item) {
    if (item.damage) {
    }
    //I need to come up with a way to caluclate the number of spaces needed to align all of the damage, prices, etc vertically
    setInventoryWeapons(
      <div key={item.id}>
        {item.name}
        {item.damage && (
          <>
            {" "}
            {item.damage} {item.damageType && item.damageType}
          </>
        )}
        <button
          className="InvSellButtons"
          onClick={(event) => handleSellClick(event, item)}
        >
          Sell
        </button>
      </div>
    );
  }

  function handleSellClick(event, weapon) {
    const button = event.target;
    const parentDiv = button.parentElement;
    const PlayerGold = getGold();
    setGold(PlayerGold + Number(weapon.price));
    parentDiv.remove();
  }

  //I might be able to make this useful for all items
  function handleBuyClick(element) {
    const PlayerGold = getGold();
    if (PlayerGold >= Number(element.price)) {
      setGold(PlayerGold - Number(element.price));
      addItemToInv(element);
    } else if (PlayerGold < Number(element.price)) {
      handleShow();
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function readWeapons(WeaponFile) {
    if (WeaponStoreList.length === 0) {
      const newWeaponStoreList = WeaponFile.map((element, i) => (
        <div className="Item" key={element.name + i}>
          {element.name} {element.damage} {element.damageType + " "}
          {element.price}
          <button
            className="StoreButtons"
            onClick={() => handleBuyClick(element)}
          >
            Buy
          </button>
        </div>
      ));
      setWeaponStoreList(newWeaponStoreList);
    }
  }

  function readArmor(ArmorFile) {
    if (ArmorStoreList.length === 0) {
      const newArmorStoreList = ArmorFile.map((element, i) => (
        <div className="Item" key={element.name + i}>
          {element.name} {element.AC} {element.price}
          <button
            className="StoreButtons"
            onClick={() => handleBuyClick(element)}
          >
            Buy
          </button>
        </div>
      ));
      setArmorStoreList(newArmorStoreList);
    }
  }

  function readSpells() {
    //var SpellsJSON = require("./itemFiles/Spells.json");
  }

  //T
  readWeapons(WeaponStoreJSON);
  readArmor(ArmorStoreJSON);
  return (
    <div id="wrapperDiv">
      <h1>Example heading</h1>
      <CharacterContainer />
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
          armor={ArmorStoreList}
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
