export class PlayerCharacter {
  constructor(
    PlayerName = "",
    CharacterName = "",
    CharacterRace = "",
    CharacterClass = "",
    Alignment = "",
    level = "1",
    stats = {},
    ac = "0",
    weapons = [],
    armors = [],
    spells = [],
    gold = "0"
  ) {
    this._PlayerName = PlayerName;
    this._CharacterName = CharacterName;
    this._CharacterRace = CharacterRace;
    this._CharacterClass = CharacterClass;
    this._Alignment = Alignment;
    this._Level = level;
    this._Stats = stats;
    this._Ac = ac;
    this._Weapons = weapons;
    this._Armors = armors;
    this._Spells = spells;
    this._Gold = gold;
  }

  //  Player Name getter and setter
  get getPlayerName() {
    return this._PlayerName;
  }

  get getPlayerNameString() {
    return `${this._PlayerName}`;
  }

  set setPlayerName(newPlayerName) {
    this._PlayerName = newPlayerName;
  }

  // Character name getter and setter
  get getCharName() {
    return this._CharacterName;
  }

  get getCharNameString() {
    return `${this._CharacterName}`;
  }

  set setCharName(newCharName) {
    this._CharacterName = newCharName;
  }

  //   Race getter and setter
  get getCharRace() {
    return this._CharacterRace;
  }

  set setCharRace(newCharRace) {
    return (this._CharacterRace = newCharRace);
  }

  // character class getter and setter
  get getCharClass() {
    return this._CharacterClass;
  }

  set setCharClass(newClass) {
    return (this._CharacterClass = newClass);
  }

  get getCharAlignment() {
    return this._Alignment;
  }

  set setCharAlignment(newCharAlignment) {
    return (this._Alignment = newCharAlignment);
  }

  // level getter and setter
  get getLevel() {
    return this._Level;
  }

  set setLevel(newLevel) {
    return (this._Level = newLevel);
  }

  // stats getter and setter
  get getStats() {
    return this._Stats;
  }

  set setStats(newStats) {
    return (this._Stats = newStats);
  }

  // ac getter and setter
  get getAc() {
    return this._Ac;
  }

  set setAc(newAc) {
    return (this._Ac = newAc);
  }

  // weapons getter and setter
  get getWeapons() {
    return this._Weapons;
  }

  set setWeapons(newWeapons) {
    return (this._Weapons = newWeapons);
  }

  // Armors getter and setter
  get getArmors() {
    return this._Armors;
  }

  set setArmors(newArmors) {
    return (this._Armors = newArmors);
  }

  // Spells getter and setter;
  get getSpells() {
    return this._Spells;
  }

  set setSpells(newSpells) {
    return (this._Spells = newSpells);
  }

  // gold getter and setter
  get getGold() {
    return this._Gold;
  }

  set setGold(newGold) {
    return (this._Gold = newGold);
  }

  // PC printer
  get PC() {
    return {
      PlayerName: this.PlayerName,
      CharacterName: this._CharacterName,
      CharacterRace: this._CharacterRace,
      CharacterClass: this._CharacterClass,
      Alignment: this._Alignment,
      level: this._Level,
      stats: this._Stats,
      ac: this._ac,
      weapons: this._Weapons,
      armors: this._Armors,
      spells: this._Spells,
      gold: this._Gold,
    };
  }
}

export default PlayerCharacter;
