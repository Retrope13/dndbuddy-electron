import { PlayerCharacter } from "../PlayerCharacter";

// Create const which contains expected values for PlayerCharacter attributes
const expectedPlayerVals = [
  "player name",
  "character name",
  "race",
  "class",
  5,
  [1, 2, 3, 4, 5, 6, 7],
  10,
  ["weapon1", "weapon2", "weapon3", "weapon4"],
  ["armor1", "armor2", "armor3"],
  ["spell1"],
  1000,
];

describe("1: [PlayerCharacter]", () => {
  it("should create an instance of PlayerCharacter", () => {
    const player = new PlayerCharacter(
      "player name",
      "character name",
      "race",
      "class",
      5,
      [1, 2, 3, 4, 5, 6, 7],
      10,
      ["weapon1", "weapon2", "weapon3", "weapon4"],
      ["armor1", "armor2", "armor3"],
      ["spell1"],
      1000
    );

    expect(player).toBeInstanceOf(PlayerCharacter);
  });

  describe("2: [PlayerCharacter]", () => {
    it("should create and instance of PlayerCharacter and check the name is correct", () => {
      const player = new PlayerCharacter(
        "player name",
        "character name",
        "race",
        "class",
        "alignment",
        "experience points",
        5,
        [1, 2, 3, 4, 5, 6, 7],
        10,
        ["weapon1", "weapon2", "weapon3", "weapon4"],
        ["armor1", "armor2", "armor3"],
        ["spell1"],
        1000
      );

      expect(player._PlayerName).toBe("player name");
    });
  });
});
