import { Weapon } from "../Weapon";

// Create const which contains expected values for PlayerCharacter attributes
const expectedWeaponVals = [
  "weapon name",
  "damage",
  "damage type",
  "weapon notes",
];

describe("1: [Weapon]", () => {
  it("should create an instance of Weapon", () => {
    const playerWeapon = new Weapon(
      "weapon name",
      "damage",
      "damage type",
      "weapon notes"
    );

    expect(playerWeapon).toBeInstanceOf(Weapon);
  });

  describe("2: [Weapon]", () => {
    it("should create and instance of Weapon and check the name is correct", () => {
      const playerWeapon = new Weapon(
        "weapon name",
        "damage",
        "damage type",
        "weapon notes"
      );

      expect(playerWeapon.name).toBe("weapon name");
    });
  });
});
