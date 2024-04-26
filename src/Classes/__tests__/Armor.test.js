import { Armor } from "../Armor";

// Create const which contains expected values for PlayerCharacter attributes
const expectedArmorVals = ["armor name", 13, 1000, "armor notes"];

describe("1: [Armor]", () => {
  it("should create an instance of Armor", () => {
    const playerArmor = new Armor("armor name", 13, 1000, "armor ntoes");

    expect(playerArmor).toBeInstanceOf(Armor);
  });

  describe("2: [Armor]", () => {
    it("should create and instance of PlayerCharacter and check the name is correct", () => {
      const playerArmor = new Armor("armor name", 13, 1000, "armor ntoes");

      expect(playerArmor.name).toBe("armor name");
    });
  });
});
