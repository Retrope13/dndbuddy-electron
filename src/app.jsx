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
import { InfoCircleFill } from "react-bootstrap-icons";

function App() {
  //&These are the state variables for inventories
  const [inventoryWeapons, setInventoryWeapons] = useState([]);
  const [inventoryArmor, setInventoryArmor] = useState([]);
  const [inventorySpell, setInventorySpell] = useState([]);
  //&These are the state variables for modal visibility
  const [showGoldModal, setShowGoldModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  //&These are the state variables for the information modal details
  const [elementName, setElementName] = useState("");
  const [elementDescription, setElementDescription] = useState("");
  const [elementLevel, setElementLevel] = useState("");
  const [elementSchool, setElementSchool] = useState("");
  const [elementDamage, setElementDamage] = useState("");
  const [elementDamageType, setElementDamageType] = useState("");
  const [elementPrice, setElementPrice] = useState("");
  const [elementAC, setElementAC] = useState("");
  //&These are the state variables for the store items
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

  function handleBuyClick(element) {
    const PlayerGold = getGold();
    if (PlayerGold >= Number(element.price) || element.price === undefined) {
      setGold(PlayerGold - Number(element.price));
      addItemToInv(element);
    } else if (PlayerGold < Number(element.price)) {
      handleShowGoldModal();
    }
  }

  function handleInfoClick(element) {
    setElementName(element.name);
    setElementDescription(element.description);
    setElementLevel(element.level);
    setElementSchool(element.school);
    setElementDamage(element.damage);
    setElementDamageType(element.damageType);
    setElementPrice(element.price);
    setElementAC(element.AC);
    handleShowInfoModal();
  }

  const handleCloseGoldModal = () => setShowGoldModal(false);
  const handleShowGoldModal = () => setShowGoldModal(true);

  const handleCloseInfoModal = () => setShowInfoModal(false);
  const handleShowInfoModal = () => setShowInfoModal(true);

  //I might be able to make all of the read functions into one dynamic one

  const itemStoreStates = {
    WeaponStoreJSON: [inventoryWeapons, setInventoryWeapons],
    ArmorStoreJSON: [inventoryArmor, setInventoryArmor],
    SpellStoreJSON: [inventorySpell, setInventorySpell],
  };

  function readItemFile(itemFile) {
    //The below is the approach I want to have but instead of changing it so it matches the inventory tab it matches the store tab
    // let fileType = itemFile == WepaonStoreJSON ? "weapon" : "armor";
    // fileType = itemFile == SpellStoreJSON ? "spell" : itemType;
    // const [store, setStore] = itemStoreStates[fileType];
    //I'm going to check which file it is, then change the storeList that is being modified.
  }

  function readWeapons(WeaponFile) {
    if (WeaponStoreList.length === 0) {
      const newWeaponStoreList = WeaponFile.map((element, i) => (
        <div className="Item" key={element.name + i}>
          {element.name} {element.damage} {element.damageType + " "}
          {element.price}
          <button
            className="StoreButtons"
            onClick={() => handleInfoClick(element)}
          >
            <InfoCircleFill className="infoIcons" />
          </button>
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
            onClick={() => handleInfoClick(element)}
          >
            <InfoCircleFill className="infoIcons" />
          </button>
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
            onClick={() => handleInfoClick(element)}
          >
            <InfoCircleFill className="infoIcons" />
          </button>
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
      <h1>Welcome to the DNDBuddy!</h1>
      <CharacterContainer />
      <br></br>
      <label>Inventory</label>
      <label>Store</label>
      <div id="CustomTabsDiv">
        {/* Inventory */}
        <CustomTabs
          id="invTabs"
          weapons={inventoryWeapons}
          armor={inventoryArmor}
          spells={inventorySpell}
        />

        {/* Store */}
        <CustomTabs
          id="storeTabs"
          weapons={WeaponStoreList}
          armor={ArmorStoreList}
          spells={SpellStoreList}
        />
      </div>

      {/* Gold modal */}
      <Modal show={showGoldModal} onHide={handleCloseGoldModal}>
        <Modal.Header closeButton>
          <Modal.Title>Oopsies!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You don't have enough gold to buy this item!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseGoldModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/*Information modal */}
      <Modal show={showInfoModal} onHide={handleCloseInfoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Information:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Name: {elementName}</p>
          {/* Below are the conditions for rendering the infromation text */}
          {elementDescription && (
            <>
              <p>Description: {elementDescription}</p>
            </>
          )}
          {elementLevel && (
            <>
              <p>Level: {elementLevel}</p>
            </>
          )}
          {elementSchool && (
            <>
              <p>School: {elementSchool}</p>
            </>
          )}
          {elementDamage && (
            <>
              <p>Damage: {elementDamage}</p>
            </>
          )}
          {elementDamageType && (
            <>
              <p>Damage Type: {elementDamageType}</p>
            </>
          )}
          {elementPrice && (
            <>
              <p>Price: {elementPrice}</p>
            </>
          )}
          {elementAC && (
            <>
              <p>AC: {elementAC}</p>
            </>
          )}
          {/* Make these conditionally render^^ */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseInfoModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// Render the dynamic component
ReactDOM.render(<App />, document.body);
