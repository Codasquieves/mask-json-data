import { assert } from "chai";
import { Mask } from "../Src/Mask";
import { Runner } from "../Src/Runner";

// tslint:disable: no-magic-numbers no-big-function
describe.only("Runner", (): void => {
  let runner: Runner;

  before((): void => {
    const schema = {
      document: Mask().All(),
      numbers: Mask().All(),
    };

    runner = new Runner(schema);
  });

  describe("Simple object", (): void => {
    it("Should mask null property", (): void => {
      // Given
      const person = {
        document: null,
      };

      // When
      const result = runner.Apply(person);

      // Then
      assert.deepEqual(result, {
        document: null,
      });
    });

    it("Should mask undefined property", (): void => {
      // Given
      const person = {
        document: undefined,
      };

      // When
      const result = runner.Apply(person);

      // Then
      assert.deepEqual(result, {
        document: undefined,
      });
    });

    it("Should mask object", (): void => {
      // Given
      const person = {
        document: "1233123123",
        value: 300.5,
      };

      // When
      const result = runner.Apply(person);

      // Then
      assert.deepEqual(result, {
        document: "*".repeat(10),
        value: 300.5,
      });
    });
  });

  describe("Composite object", (): void => {
    it("Should mask composite object", (): void => {
      // Given
      const person = {
        document: {
          number: 10000,
          type: {
            description: "SSP",
            origin: undefined,
          },
        },
      };

      // When
      const result = runner.Apply(person);

      // Then
      assert.deepEqual(result, {
        document: {
          number: "*****",
          type: {
            description: "***",
            origin: undefined,
          },
        },
      });
    });

    it("Should parse array of numbers property", (): void => {
      // Given
      const person = {
        document: [1, 2, 3, 4, 5, 6, 7],
        name: "Test",
        numbers: [1, 2, 3, 4, 5],
      };

      // When
      const result = runner.Apply(person);

      // Then
      assert.deepEqual(result, {
        document: ["*", "*", "*", "*", "*", "*", "*"],
        name: "Test",
        numbers: ["*", "*", "*", "*", "*"],
      });
    });

    it("Should pase array of objects property", (): void => {
      // Given
      const person = {
        document: [
          {
            number: "10000000",
            type: 1,
          },
        ],
        name: "Test",
      };

      // When
      const result = runner.Apply(person);

      // Then
      assert.deepEqual(result, {
        document: [
          {
            number: "********",
            type: "*",
          },
        ],
        name: "Test",
      });
    });
  });

  describe("person", (): void => {
    let personRuner: Runner;

    before((): void => {
      const schema = {
        email: Mask().All(),
        fullName: Mask().FullName(),
        neighborhood: Mask().ShowLast(4),
        number: Mask().Number(),
        obs: Mask().Regex(/\s/g),
        password: Mask().All(),
        secondaryEmail: Mask().Email(),
        streetName: Mask().ShowFirst(3),
        tags: Mask().ShowFirst(1),
        temperature: Mask().ShowFirst(1),
        value: Mask().Number(),
      };

      personRuner = new Runner(schema);
    });

    it("Should mask person", (): void => {
      // Given
      const person = {
        address: {
          datetime: "2020-03-25 10:00:06",
          neighborhood: "Marble Hill",
          number: 100,
          streetName: "Four",
        },
        datetime: "2020-05-25 18:22:00",
        email: "test@email.com",
        fullName: "Sylvester Stallone",
        obs: "    ",
        // tslint:disable-next-line: no-hardcoded-credentials
        password: "Pass@*word",
        secondaryEmail: "test2email.com",
        tags: ["day", "collor", "dark"],
        temperature: [
          {
            type: "Celsius",
            value: "32",
          },
          {
            type: "Fahrenheit",
            value: "0",
          },
        ],
      };

      // When
      const result = personRuner.Apply(person);

      // Then
      assert.deepEqual(result, {
        address: {
          datetime: "2020-03-25 10:00:06",
          neighborhood: "*******Hill",
          number: "*number*",
          streetName: "Fou*",
        },
        datetime: "2020-05-25 18:22:00",
        email: "**************",
        fullName: "Syl************one",
        obs: "****",
        // tslint:disable-next-line: no-hardcoded-credentials
        password: "**********",
        secondaryEmail: "*invalid_email*",
        tags: ["d**", "c*****", "d***"],
        temperature: [
          {
            type: "C******",
            value: "*number*",
          },
          {
            type: "F*********",
            value: "*number*",
          },
        ],
      });
    });
  });
});
