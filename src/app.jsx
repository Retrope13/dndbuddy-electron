import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import CustomTabs from "./components/CustomTabs"; // Import your custom component
import CharacterContainer from "./components/CharacterContainer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [WeaponStoreList, setWeaponStoreList] = useState([]);
  let WeaponStoreJSON = require("./itemFiles/Weapons.json");
  //this will be for later when I import characters. I'm hoping I can use all of the same functions for the store and character
  let CharJSON;
  function readWeapons(WeaponFile) {
    WeaponFile.forEach((element) =>
      WeaponStoreList.push(
        <div className="WeaponItem" key={element.name}>
          {element.name} {element.damage} {element.damageType} {element.price}
          <button onClick={() => handleButtonClick(element)}>Buy</button>
        </div>
      )
    );
    console.log(WeaponStoreList);
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
      <CharacterContainer />
      <br></br>
      <label>Inventory</label>
      <label>Store</label>
      <div id="CustomTabsDiv">
        <CustomTabs
          id="invTabs"
          weapons={"mace"}
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
    </div>
  );
}

// Render the dynamic component
ReactDOM.render(<App />, document.body);
