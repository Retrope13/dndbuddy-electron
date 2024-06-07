// FlexContainer.js
import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { playerCharacterInstance } from "./CharacterContainer";
import DiceBox from "@3d-dice/dice-box";

export function DiceRoller() {
  const [diceBox, setDiceBox] = useState();
  //Handle change when modifying any of the text boxes for character info.

  document.addEventListener("DOMContentLoaded", async () => {
    let Box = new DiceBox("#wrapperDivDiceRoller", {
      assetPath: "/assets/dice-box/",
    });
    Box.init().then(() => {
      // create dat.gui controls
      const Controls = new BoxControls({
        themes: ["default", "rust", "diceOfRolling", "gemstone"],
        themeColor: world.config.themeColor,
        onUpdate: (updates) => {
          Box.updateConfig(updates);
        },
      });
      Controls.themeSelect.setValue(world.config.theme);
      Box.onThemeConfigLoaded = (themeData) => {
        if (themeData.themeColor) {
          Controls.themeColorPicker.setValue(themeData.themeColor);
        }
      };

      // create display overlay
      const Display = new DisplayResults("#wrapperDivDiceRoller");

      // create Roller Input
      const Roller = new AdvancedRoller({
        target: "#wrapperDivDiceRoller",
        onSubmit: (notation) => Box.roll(notation),
        onClear: () => {
          Box.clear();
          Display.clear();
        },
        onReroll: (rolls) => {
          // loop through parsed roll notations and send them to the Box
          rolls.forEach((roll) => Box.add(roll));
        },
        onResults: (results) => {
          Display.showResults(results);
        },
      });

      // pass dice rolls to Advanced Roller to handle
      Box.onRollComplete = (results) => {
        Roller.handleResults(results);
      };
    }); // end Box.init
  });

  // Initialize or setup your DiceBox instance here

  function handleRoll() {
    const diceBoxHolder = document.getElementById("wrapperDivDiceRoller");
    const diceBox = new DiceBox("#wrapperDivDiceRoller", {
      assetPath: "/assets/dice-box/",
    });
    diceBox.init().then(() => {
      console.log(diceBox.roll("2d20", { theme: `rust` }));
    });
  }

  return (
    <div id="wrapperDivDiceRoller">
      <div id="diceFlexContainer">
        <button onClick={handleRoll}>roll</button>
      </div>
    </div>
  );
}
