import { Spell } from "../Spell";

// Create const which contains expected values for PlayerCharacter attributes
const expectedSpellVals = [
  "spell name",
  "damage",
  "damage type",
  "weapon notes",
];

describe("1: [Spell]", () => {
  it("should create an instance of spell", () => {
    const playerSpell = new Spell(
      "spell name",
      "damage",
      "damage type",
      "weapon notes"
    );

    expect(playerSpell).toBeInstanceOf(Spell);
  });

  describe("2: [Spell]", () => {
    it("should create and instance of Spell and check the name is correct", () => {
      const playerSpell = new Spell(
        "spell name",
        "damage",
        "damage type",
        "weapon notes"
      );

      expect(playerSpell.name).toBe("spell name");
    });
  });
});
