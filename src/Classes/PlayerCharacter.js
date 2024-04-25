class PlayerCharacter {
  constructor(
    name = "",
    race = "",
    char_class = "",
    level = 1,
    stats = [],
    ac = 0,
    weapons = [],
    armors = [],
    spells = [],
    gold = 0
  ) {
    this._name = name;
    this._race = race;
    this._char_class = char_class;
    this._level = level;
    this._stats = stats;
    this._ac = ac;
    this._weapons = weapons;
    this._armors = armors;
    this._spells = spells;
    this._gold = gold;
  }

  //   Name getter and setter
  get name() {
    return this._name;
  }

  set name(newName) {
    this._name = newName;
  }

  //   Race getter and setter
  get race() {
    return this._race;
  }

  set race(newRace) {
    return (this._race = newRace);
  }

  // character class getter and setter
  get char_class() {
    return this._char_class;
  }

  set char_class(newClass) {
    return (this._char_class = newClass);
  }

  // level getter and setter
  get level() {
    return this._level;
  }

  set level(newLevel) {
    return (this._level = newLevel);
  }

  // stats getter and setter
  get stats() {
    return this._stats;
  }

  set stats(newStats) {
    return (this._stats = newStats);
  }

  // ac getter and setter
  get ac() {
    return this._ac;
  }

  set ac(newAc) {
    return (this._ac = newAc);
  }

  // weapons getter and setter
  get weapons() {
    return this._weapons;
  }

  set weapons(newWeapons) {
    return (this._weapons = newWeapons);
  }

  // Armors getter and setter
  get armors() {
    return this.armors;
  }

  set armors(newArmors) {
    return (this._armors = newArmors);
  }

  // Spells getter and setter;
  get spells() {
    return this._spells;
  }

  set spells(newSpells) {
    return (this._spells = newSpells);
  }

  // gold getter and setter
  get gold() {
    return this._gold;
  }

  set gold(newGold) {
    return (this._gold = newGold);
  }

  // PC printer
  get PC() {
    return {
      name: this._name,
      race: this._race,
      char_class: this._char_class,
      level: this._level,
      stats: this._stats,
      ac: this._ac,
      weapons: this._weapons,
      armors: this._armors,
      spells: this._spells,
      gold: this._gold,
    };
  }
}
