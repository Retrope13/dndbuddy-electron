export class PlayerCharacter {
  constructor(
    player_name = "",
    char_name = "",
    char_race = "",
    char_class = "",
    char_alignment = "",
    char_exp = 0,
    level = 1,
    stats = [],
    ac = 0,
    weapons = [],
    armors = [],
    spells = [],
    gold = 0
  ) {
    this._player_name = player_name;
    this._char_name = char_name;
    this._char_race = char_race;
    this._char_class = char_class;
    this._char_alignment = char_alignment;
    this._char_exp = char_exp;
    this._level = level;
    this._stats = stats;
    this._ac = ac;
    this._weapons = weapons;
    this._armors = armors;
    this._spells = spells;
    this._gold = gold;
  }

  //  Player Name getter and setter
  get getPlayerName() {
    return this._player_name;
  }

  get getPlayerNameString() {
    return `${this._player_name}`;
  }

  set setPlayerName(newPlayerName) {
    this._player_name = newPlayerName;
  }

  // Character name getter and setter
  get getCharName() {
    return this._char_name;
  }

  set setCharName(newCharName) {
    this._char_name = newCharName;
  }

  //   Race getter and setter
  get getCharRace() {
    return this._char_race;
  }

  set setCharRace(newCharRace) {
    return (this._char_race = newCharRace);
  }

  // character class getter and setter
  get getCharClass() {
    return this._char_class;
  }

  set setCharClass(newClass) {
    return (this._char_class = newClass);
  }

  get getCharAlignment() {
    return this._char_alignment;
  }

  set setCharAlignment(newCharAlignment) {
    return (this._char_alignment = newCharAlignment);
  }

  // level getter and setter
  get getLevel() {
    return this._level;
  }

  set setLevel(newLevel) {
    return (this._level = newLevel);
  }

  // stats getter and setter
  get getStats() {
    return this._stats;
  }

  set setStats(newStats) {
    return (this._stats = newStats);
  }

  // ac getter and setter
  get getAc() {
    return this._ac;
  }

  set setAc(newAc) {
    return (this._ac = newAc);
  }

  // weapons getter and setter
  get getWeapons() {
    return this._weapons;
  }

  set setWeapons(newWeapons) {
    return (this._weapons = newWeapons);
  }

  // Armors getter and setter
  get getArmors() {
    return this.armors;
  }

  set setArmors(newArmors) {
    return (this._armors = newArmors);
  }

  // Spells getter and setter;
  get getSpells() {
    return this._spells;
  }

  set setSpells(newSpells) {
    return (this._spells = newSpells);
  }

  // gold getter and setter
  get getGold() {
    return this._gold;
  }

  set setGold(newGold) {
    return (this._gold = newGold);
  }

  // PC printer
  get PC() {
    return {
      player_name: this.player_name,
      char_name: this._char_name,
      char_race: this._char_race,
      char_class: this._char_class,
      char_alignment: this._char_alignment,
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

export default PlayerCharacter;
