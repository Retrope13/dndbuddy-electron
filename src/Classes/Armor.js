export class Armor {
  constructor(name = "", ac = 0, price = 0, notes = "") {
    this._name = name;
    this._ac = ac;
    this._price = price;
    this._notes = notes;
  }

  //   name getter and setter
  get name() {
    return this._name;
  }

  set name(newName) {
    return (this._name = newName);
  }

  //   ac getter and setter

  get ac() {
    return this._ac;
  }

  set ac(newAc) {
    return (this._ac = newAc);
  }

  //   price getter and setter
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
