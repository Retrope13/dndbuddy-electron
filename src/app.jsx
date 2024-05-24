import React, { useState } from "react";
import ReactDOM from "react-dom";
import CustomTabs from "./components/CustomTabs"; // Import your custom component\
import { StatBlock } from "./components/StatBlock";
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

  //&The item JSONS
  let WeaponStoreJSON = require("./itemFiles/Weapons.json");
  let ArmorStoreJSON = require("./itemFiles/Armor.json");
  let SpellStoreJSON = require("./itemFiles/Spells.json");
  //this will be for later when I import characters. I'm hoping I can use all of the same functions for the store and character
  let CharJSON;

  const itemStates = {
    weapon: [setInventoryWeapons],
    armor: [setInventoryArmor],
    spell: [setInventorySpell],
  };

  function addItemToInv(item) {
    let itemType = item.damage ? "weapon" : "armor"; // if it has damage it might be a weapon
    itemType = item.school ? "spell" : itemType; // if it has a school then it's a spell
    const [setInventory] = itemStates[itemType];
    //I need to come up with a way to caluclate the number of spaces needed to align the info buttons?
    setInventory((prevInventory) => [
      ...prevInventory,
      <div key={item.id}>
        {item.name}
        <button className="infoButtons" onClick={() => handleInfoClick(item)}>
          <InfoCircleFill className="infoIcons" />
        </button>
        <button
          className="InvSellButtons"
          onClick={(event) => handleSellClick(event, item)}
        >
          Sell
        </button>
      </div>,
    ]);
    setItems(itemType, item);
    console.log(itemType);
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
    removeItem(itemType, item);
  }

  function handleBuyClick(element) {
    const PlayerGold = getGold();
    if (PlayerGold >= Number(element.price)) {
      setGold(PlayerGold - Number(element.price));
      addItemToInv(element);
    } else if (element.price == undefined) {
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
    WeaponStoreJSON: [WeaponStoreList, setWeaponStoreList],
    ArmorStoreJSON: [ArmorStoreList, setArmorStoreList],
    SpellStoreJSON: [SpellStoreList, setSpellStoreList],
  };

  function readItemFile(itemFile) {
    //Figures out which JSON was just passed into the function
    let JSONFile =
      itemFile == WeaponStoreJSON ? "WeaponStoreJSON" : "ArmorStoreJSON";
    JSONFile = itemFile == SpellStoreJSON ? "SpellStoreJSON" : JSONFile;

    //Sets the "storeList" arr and "setStoreList" function to the appropriate StoreList
    const [storeList, setStoreList] = itemStoreStates[JSONFile];

    //maps each element of the item file to a new storeList and then sets the original store list to the modified, populated one
    if (storeList.length === 0) {
      const newStoreList = itemFile.map((element, i) => (
        <div className="Item" key={element.name + i}>
          {element.name}
          <button
            className="infoButtons"
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
      setStoreList(newStoreList);
    }
  }

  readItemFile(WeaponStoreJSON);
  readItemFile(ArmorStoreJSON);
  readItemFile(SpellStoreJSON);
  return (
    <div id="wrapperDiv">
      <h1>Welcome to the DNDBuddy!</h1>
      <CharacterContainer />
      <br></br>
      {/* I want stat block to be to the right of the CharacterContainer but we'll see */}
      <StatBlock />
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
