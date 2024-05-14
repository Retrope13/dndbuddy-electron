export class Spell {
  constructor(name = "", score = 0, modifier = 0) {
    this._name = name;
    this._score = score;
    try {
      this._modifier = (score - 10) / 2;
    } catch {
      this._modifier = 0;
    }
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
