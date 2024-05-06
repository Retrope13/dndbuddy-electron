// FlexContainer.js
import React, { useState } from "react";

function CharacterContainer() {
  return (
    <div id="flexContainer">
      <div class="input-group-a1">
        <input
          type="text"
          class="form-control"
          placeholder="Player Name"
          aria-label="Player Name"
          aria-describedby="basic-addon1"
        />
      </div>
      <div class="input-group-a1">
        <input
          type="text"
          class="form-control"
          placeholder="Character Name"
          aria-label="character Name"
          aria-describedby="basic-addon1"
        />
      </div>
      <div class="input-group-a1">
        <input
          type="text"
          class="form-control"
          placeholder="Class & level"
          aria-label="Class and level"
          aria-describedby="basic-addon1"
        />
      </div>
      <div class="input-group-a1">
        <input
          type="text"
          class="form-control"
          placeholder="Character Race"
          aria-label="Character Race"
          aria-describedby="basic-addon1"
        />
      </div>
      <div class="input-group-a1">
        <input
          type="text"
          class="form-control"
          placeholder="Alignment"
          aria-label="Alignment"
          aria-describedby="basic-addon1"
        />
      </div>
      <div class="input-group-a1">
        <input
          type="text"
          class="form-control"
          placeholder="EXP"
          aria-label="Class and level"
          aria-describedby="basic-addon1"
        />
      </div>
    </div>
  );
}

export default CharacterContainer;
