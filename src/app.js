import React, { useState } from "react";
import ReactDOM from "react-dom";
import CustomTabs from "./components/CustomTabs"; // Import your custom component\
import { StatBlock } from "./components/StatBlock";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import {
  CharacterContainer,
  getGold,
  playerCharacterInstance,
  removeItem,
  setGold,
  setItems,
} from "./components/CharacterContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { InfoCircleFill } from "react-bootstrap-icons";

function DNDBuddy() {
  //&These are the state variables for inventories
  const [inventoryWeapons, setInventoryWeapons] = useState([]);
  const [inventoryArmor, setInventoryArmor] = useState([]);
  const [inventorySpell, setInventorySpell] = useState([]);
  const [inventoryEquiped, setInventoryEquiped] = useState([]);
  //&These are the state variables for modal visibility
  const [showGoldModal, setShowGoldModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [equipChecked, setEquipChecked] = useState(false);
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

  //Handle when user clicks the info icon
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

  //When a player sells any type of item
  function handleSellClick(event, item) {
    let itemType = item.damage ? "weapon" : "armor"; // if it has damage it might be a weapon
    itemType = item.school ? "spell" : itemType; // if it has a school then it's a spell
    const button = event.target;
    const parentDiv = button.parentElement;
    const PlayerGold = getGold();
    setGold(PlayerGold + Number(item.price));
    parentDiv.remove();
    removeItem(itemType, item);
  }

  //Add item to equiped tab
  function handleEquip(parentEvent, item) {
    if (parentEvent.currentTarget.checked) {
      setInventoryEquiped((prevEquiped) => [
        ...prevEquiped,
        <div key={item.id}>
          {item.name}
          <button className="infoButtons" onClick={() => handleInfoClick(item)}>
            <InfoCircleFill className="infoIcons" />
          </button>
          <Form.Check
            aria-label="Checkbox"
            checked={parentEvent.target.checked}
            onChange={(event) => handleUnequip(event, parentEvent, item)}
          />
        </div>,
      ]);
    } else {
      handleUnequip(event, parentEvent, item);
    }
  }

  function handleUnequip(event, parentEvent, item) {
    parentEvent.target.checked = false;
    if (inventoryEquiped.length != 0) {
      setInventoryEquiped((prevEquiped) => {
        // Check if the item exists in the array
        const itemExists = prevEquiped.some((i) => i.id === item.id);
        if (itemExists) {
          console.warn(
            `Item with id ${item.id} not found in inventoryEquiped.`
          );
          prevEquiped.filter((i) => i.id !== item.id);
        }
      });
    } else if (inventoryEquiped) {
      setInventoryEquiped([]);
    }
  }

  //Add the HTML to display the item in the correct inv
  function addItemToInv(item, bought = true) {
    const itemStates = {
      weapon: [setInventoryWeapons],
      armor: [setInventoryArmor],
      spell: [setInventorySpell],
    };
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
        <Form.Check
          aria-label="Checkbox"
          onChange={(event) => handleEquip(event, item)}
        />
      </div>,
    ]);
    if (bought) {
      setItems(itemType, item);
    }
  }

  //When a player buys an item from any store
  function handleBuyClick(element) {
    const PlayerGold = getGold();
    if (PlayerGold >= Number(element.price)) {
      setGold(PlayerGold - Number(element.price));
      addItemToInv(element, true);
    } else if (element.price == undefined) {
      addItemToInv(element, true);
      setGold(PlayerGold);
    } else if (PlayerGold < Number(element.price)) {
      handleShowGoldModal();
    }
  }

  const handleCloseGoldModal = () => setShowGoldModal(false);
  const handleShowGoldModal = () => setShowGoldModal(true);

  const handleCloseInfoModal = () => setShowInfoModal(false);
  const handleShowInfoModal = () => setShowInfoModal(true);

  const itemStoreStates = {
    WeaponStoreJSON: [WeaponStoreList, setWeaponStoreList],
    ArmorStoreJSON: [ArmorStoreList, setArmorStoreList],
    SpellStoreJSON: [SpellStoreList, setSpellStoreList],
  };

  readItemFile(WeaponStoreJSON);
  readItemFile(ArmorStoreJSON);
  readItemFile(SpellStoreJSON);
  DNDBuddy.addItemToInv = addItemToInv;
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
          equiped={inventoryEquiped}
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

export function addItemsFromImport() {
  for (let i = 0; i < playerCharacterInstance._Weapons.length; i++) {
    DNDBuddy.addItemToInv(playerCharacterInstance._Weapons[i], false);
  }
  for (let i = 0; i < playerCharacterInstance._Armors.length; i++) {
    DNDBuddy.addItemToInv(playerCharacterInstance._Armors[i], false);
  }
  for (let i = 0; i < playerCharacterInstance._Spells.length; i++) {
    DNDBuddy.addItemToInv(playerCharacterInstance._Spells[i], false);
  }
}

// Render the dynamic component
ReactDOM.render(<DNDBuddy />, document.body);
