export class Spell {
  constructor(name = "", damage = "", damageType = "", level = 0, notes = "") {
    this._Name = name;
    this._Damage = damage;
    this._DamageType = damageType;
    this._Level = level;
    this._Notes = notes;
  }

  //   name getter and setter
  get name() {
    return this._Name;
  }

  set name(newName) {
    return (this._Name = newName);
  }

  //   damage getter and setter

  get damage() {
    return this._Damage;
  }

  set damage(newDamage) {
    return (this._Damage = newDamage);
  }

  //   damageType getter and setter
  get damageType() {
    return this._DamageType;
  }

  set damageType(newDamageType) {
    return (this._DamageType = newDamageType);
  }

  get getLevel() {
    return this._Level;
  }

  set setLevel(newLevel) {
    return (this._Level = newLevel);
  }

  //   notes getter and setter
  get notes() {
    return this._Notes;
  }

  set notes(newNotes) {
    return (this._Notes = newNotes);
  }
}
