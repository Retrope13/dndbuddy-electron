export class Weapon {
  // damage is a string because of the syntax 1d6, 1d4, 2d8, etc.
  //   you don't need to add toHit because you should take care of that... Unless you're creating a Weapon obj for every one in the list then don't bother
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

  //   Price getter and setter
  get price() {
    return this._price;
  }

  set price(newPrice) {
    return (this._price = newPrice);
  }

  //   Notes getter and setter
  get notes() {
    return this._notes;
  }

  set notes(newNotes) {
    return (this._notes = newNotes);
  }
}
