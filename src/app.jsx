import React, { useState } from "react";
import ReactDOM from "react-dom";
import CustomTabs from "./components/CustomTabs"; // Import your custom component
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  CharacterContainer,
  getGold,
  removeItem,
  setGold,
  setItems,
} from "./components/CharacterContainer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [inventoryWeapons, setInventoryWeapons] = useState([]);
  const [inventoryArmor, setInventoryArmor] = useState([]);
  const [inventorySpell, setInventorySpell] = useState([]);
  const [show, setShow] = useState(false);
  const [WeaponStoreList, setWeaponStoreList] = useState([]);
  const [ArmorStoreList, setArmorStoreList] = useState([]);
  const [SpellStoreList, setSpellStoreList] = useState([]);
  let WeaponStoreJSON = require("./itemFiles/Weapons.json");
  let ArmorStoreJSON = require("./itemFiles/Armor.json");
  let SpellStoreJSON = require("./itemFiles/Spells.json");
  //this will be for later when I import characters. I'm hoping I can use all of the same functions for the store and character
  let CharJSON;

  const itemStates = {
    weapon: [inventoryWeapons, setInventoryWeapons],
    armor: [inventoryArmor, setInventoryArmor],
    spell: [inventorySpell, setInventorySpell],
  };

  function addItemToInv(item) {
    let itemType = item.damage ? "weapon" : "armor"; // if it has damage it might be a weapon
    itemType = item.school ? "spell" : itemType; // if it has a school then it's a spell
    const [inventory, setInventory] = itemStates[itemType];
    //I need to come up with a way to caluclate the number of spaces needed to align all of the damage, prices, etc vertically
    setInventory((prevInventory) => [
      ...prevInventory,
      <div key={item.id}>
        {item.name}
        {item.damage && (
          <>
            {" "}
            {item.damage} {item.damageType && item.damageType}
          </>
        )}
        {item.price && (
          <>
            {" "}
            {item.AC && item.AC} {item.price}
          </>
        )}
        <button
          className="InvSellButtons"
          onClick={(event) => handleSellClick(event, item)}
        >
          Sell
        </button>
      </div>,
    ]);
    setItems(itemType, item); //&I'm really trying to get the player's inventory to be updated when they buy a new weapon.
    //&I'm not sure whether to have a function that takes the entire set of weapons and adds it to the player or a single weapon and just pushes it.
  }

  function handleSellClick(event, item) {
    let itemType = item.damage ? "weapon" : "armor"; // if it has damage it might be a weapon
    itemType = item.school ? "spell" : itemType; // if it has a school then it's a spell
    const button = event.target;
    const parentDiv = button.parentElement;
    const PlayerGold = getGold();
    setGold(PlayerGold + Number(item.price));
    //I don't think that this is removing the item from the actual inventory, just from the viewport
    parentDiv.remove();
    removeItem(itemType, item); //^ I don't know how to make this work at the moment
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

  //I might be able to make all of the read functions into one dynamic one

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

  function readSpells(SpellFile) {
    if (SpellStoreList.length === 0) {
      const newSpellStoreList = SpellFile.map((element, i) => (
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
      setSpellStoreList(newSpellStoreList);
    }
  }

  readWeapons(WeaponStoreJSON);
  readArmor(ArmorStoreJSON);
  readSpells(SpellStoreJSON);
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
          armor={inventoryArmor}
          spells={inventorySpell}
        />
        <CustomTabs
          id="storeTabs"
          weapons={WeaponStoreList}
          armor={ArmorStoreList}
          spells={SpellStoreList}
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
