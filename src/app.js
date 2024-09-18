import React, { useState } from "react";
import ReactDOM from "react-dom";
import CustomTabs from "./components/CustomTabs";
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
import { SpellSlots } from "./components/SpellSlots";
import "bootstrap/dist/css/bootstrap.min.css";
import { InfoCircleFill } from "react-bootstrap-icons";

export function addItemsFromImport() {
  DNDBuddy.setInventoryWeapons([]);
  DNDBuddy.setInventoryArmor([]);
  DNDBuddy.setInventorySpell([]);
  for (let i = 0; i < playerCharacterInstance._Weapons.length; i++) {
    DNDBuddy.addItemToInv(playerCharacterInstance._Weapons[i], false);
  }
  for (let i = 0; i < playerCharacterInstance._Armors.length; i++) {
    DNDBuddy.addItemToInv(playerCharacterInstance._Armors[i], false);
  }
  for (let i = 0; i < playerCharacterInstance._Spells.length; i++) {
    DNDBuddy.addItemToInv(playerCharacterInstance._Spells[i], false);
  }
  for (let i = 0; i < playerCharacterInstance._Equipped.length; i++) {
    //^ Here is where i'm having issues - It won't populate the equip section. I realized that to properly update the equipped
    //^and unequipped stuff I'll have to save the items that are equipped and the items that are checked in the rest of their inventory at the moment of a save
    DNDBuddy.handleEquip(playerCharacterInstance._equipped[i], false);
  }
}

function DNDBuddy() {
  //&These are the state variables for inventories
  const [inventoryWeapons, setInventoryWeapons] = useState([]);
  const [inventoryArmor, setInventoryArmor] = useState([]);
  const [inventorySpell, setInventorySpell] = useState([]);
  const [inventoryEquipped, setinventoryEquipped] = useState([]);
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

  function readItemFile(itemFile) {
    let JSONFile =
      itemFile == WeaponStoreJSON ? "WeaponStoreJSON" : "ArmorStoreJSON";
    JSONFile = itemFile == SpellStoreJSON ? "SpellStoreJSON" : JSONFile;

    const [storeList, setStoreList] = itemStoreStates[JSONFile];
    if (JSONFile == "SpellStoreJSON") {
      itemFile.sort((a, b) => a.level - b.level);
    }

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

  function handleSellClick(event, item) {
    let itemType = item.damage ? "weapon" : "armor"; // if it has damage it might be a weapon
    itemType = item.school ? "spell" : itemType; // if it has a school then it's a spell
    const button = event.target;
    const parentDiv = button.parentElement;
    if (itemType != "spell") {
      const PlayerGold = getGold();
      setGold(PlayerGold + Number(item.price));
    }
    parentDiv.remove();
    removeItem(itemType, item);
  }

  function handleEquip(parentEvent, item) {
    if (parentEvent.currentTarget.checked) {
      setinventoryEquipped((prevequipped) => [
        ...prevequipped,
        <div key={item.id}>
          {item.name}
          <button className="infoButtons" onClick={() => handleInfoClick(item)}>
            <InfoCircleFill className="infoIcons" />
          </button>
        </div>,
        
      ]);
    } else {
      handleUnequip(parentEvent, item);
    }
  }

  function handleUnequip(parentEvent, item) {
    setinventoryEquipped((prevequipped) => [
      filterEquiped(prevequipped, item)
    ]);

    parentEvent.target.checked = false;

  }


  function filterEquiped(prevequipped, item) {
    let removed = false;
    try {
      return prevequipped.filter((currentItem) => {
        console.log(currentItem);
        const currentItemName = currentItem.props.children[0];
        if (currentItemName === item.name && !removed) {
          removed = true;
          return false;
        }
        return true;
      });

    } catch {
      console.error("Attempted to remove item that does not exist... Now in broken state.");
    }
  }


  function addItemToInv(item, bought = true) {
    const itemStates = {
      weapon: [setInventoryWeapons],
      armor: [setInventoryArmor],
      spell: [setInventorySpell],
    };
    let itemType = item.damage ? "weapon" : "armor"; // if it has damage it might be a weapon
    itemType = item.school ? "spell" : itemType; // if it has a school then it's a spell
    const [setInventory] = itemStates[itemType];
    //&I need to come up with a way to caluclate the number of spaces needed to align the info buttons?
    setInventory((prevInventory) => [
      ...prevInventory,
      <div key={item.id} className="invItemDiv">
        {item.name}
        <button
          className="InvInfoButtons"
          onClick={() => handleInfoClick(item)}
        >
          <InfoCircleFill className="infoIcons" />
        </button>
        <Form.Check
          className="equip-checkbox"
          aria-label="Checkbox"
          onChange={(event) => handleEquip(event, item)}
        />
        <button
          className="InvSellButtons"
          onClick={(event) => handleSellClick(event, item)}
        >
          Sell
        </button>
      </div>,
    ]);
    if (bought) {
      setItems(itemType, item);
    } else {
      setItems(itemType, item, false);
    }
  }

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
  DNDBuddy.handleEquip = handleEquip;
  DNDBuddy.setInventoryArmor = setInventoryArmor;
  DNDBuddy.setInventoryWeapons = setInventoryWeapons;
  DNDBuddy.setInventorySpell = setInventorySpell;
  DNDBuddy.setinventoryEquipped = setinventoryEquipped;
  return (
    <div id="wrapperDiv">
      <h1>Welcome to the DNDBuddy!</h1>
      <CharacterContainer />
      <br></br>
      <StatBlock />
      <label>Inventory</label>
      <label>Store</label>
      <div id="CustomTabsDiv">
        <CustomTabs
          id="invTabs"
          weapons={inventoryWeapons}
          armor={inventoryArmor}
          spells={inventorySpell}
          equipped={inventoryEquipped}
        />
        <SpellSlots id="SpellSlotsComponent"/>

        <CustomTabs
          id="storeTabs"
          weapons={WeaponStoreList}
          armor={ArmorStoreList}
          spells={SpellStoreList}
        />
      </div>

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

      <Modal show={showInfoModal} onHide={handleCloseInfoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Information:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Name: {elementName}</p>
          {elementDescription && (
            <>
              <p>Description: {elementDescription}</p>
            </>
          )}
          {elementLevel != null && (
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

ReactDOM.render(<DNDBuddy />, document.body);
