export class Spell {
  constructor(name = "", score = 0, modifier = 0) {
    this._name = name;
    this._score = score;
    try {
      this._modifier = (score - 10) / 2;
    } catch {
      this._modifier = 0;
    }
  }

  //   name getter and setter
  get name() {
    return this._name;
  }

  set name(newName) {
    return (this._name = newName);
  }

  //   score and setter

  get getScore() {
    return this._score;
  }

  set setScore(newScore) {
    return (this._score = newScore);
  }

  //   modifier getter and setter
  get getModifier() {
    return this._modifier;
  }

  set setModifier(newModifier) {
    return (this.__modifier = newModifier);
  }
}
