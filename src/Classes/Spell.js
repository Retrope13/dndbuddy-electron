export class Spell {
  constructor(name = "", damage = "", damageType = "", notes = "") {
    this._name = name;
    this._damage = damage;
    this._damageType = damageType;
    this._notes = notes;
  }

  //   name getter and setter
  get name() {
    return this._name;
  }

  set name(newName) {
    return (this._name = newName);
  }

  //   damage getter and setter

  get damage() {
    return this._damage;
  }

  set damage(newDamage) {
    return (this._damage = newDamage);
  }

  //   damageType getter and setter
  get damageType() {
    return this._damageType;
  }

  set damageType(newDamageType) {
    return (this._price = newDamageType);
  }

  //   notes getter and setter
  get notes() {
    return this._notes;
  }

  set notes(newNotes) {
    return (this._notes = newNotes);
  }
}
