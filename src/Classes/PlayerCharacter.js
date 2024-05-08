export class PlayerCharacter {
  constructor(
    PlayerName = "",
    CharacterName = "",
    CharacterRace = "",
    CharacterClass = "",
    Alignment = "",
    ExperiencePoints = 0,
    level = 1,
    stats = [],
    ac = 0,
    weapons = [],
    armors = [],
    spells = [],
    gold = 0
  ) {
    this._PlayerName = PlayerName;
    this._CharacterName = CharacterName;
    this._CharacterRace = CharacterRace;
    this._CharacterClass = CharacterClass;
    this._Alignment = Alignment;
    this._ExperiencePoints = ExperiencePoints;
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
      PlayerName: this.PlayerName,
      CharacterName: this._CharacterName,
      CharacterRace: this._CharacterRace,
      CharacterClass: this._CharacterClass,
      Alignment: this._Alignment,
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
