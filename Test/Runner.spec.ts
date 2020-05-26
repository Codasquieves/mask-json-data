import { assert } from "chai";
import { IRule } from "../Src/Contracts/IRule";
import { Mask } from "../Src/Mask";
import { Runner } from "../Src/Runner";

// tslint:disable: no-magic-numbers no-big-function no-duplicate-string no-hardcoded-credentials
describe("Runner", (): void => {
  const schema = {
    document: Mask.All(),
    numbers: Mask.All(),
  };

  describe("Simple object", (): void => {
    it("Should mask null property", (): void => {
      // Given
      const person = {
        document: null,
      };

      // When
      const result = Runner.Apply(person, schema);

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
      const result = Runner.Apply(person, schema);

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
      const result = Runner.Apply(person, schema);

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
      const documentSchema = {
        document: {
          number: Mask.All(),
          type: {
            description: Mask.All(),
          },
        },
      };

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
      const result = Runner.Apply(person, documentSchema);

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
      const result = Runner.Apply(person, schema);

      // Then
      assert.deepEqual(result, {
        document: ["*", "*", "*", "*", "*", "*", "*"],
        name: "Test",
        numbers: ["*", "*", "*", "*", "*"],
      });
    });

    it("Should pase array of objects property", (): void => {
      // Given
      const documentSchema = {
        document: {
          number: Mask.All(),
          type: Mask.All(),
        },
      };

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
      const result = Runner.Apply(person, documentSchema);

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
    const personSchema = {
      address: {
        neighborhood: Mask.ShowLast(4),
        number: Mask.Number(),
        streetName: Mask.ShowFirst(3),
      },
      email: Mask.All(),
      fullName: Mask.FullName(),
      obs: Mask.Regex(/\s/g),
      others: {
        anothers: {
          day: {
            name: Mask.Email(),
          },
          lastUpdated: Mask.All(),
        },
      },
      password: Mask.All(),
      secondaryEmail: Mask.Email(),
      tags: Mask.ShowFirst(1),
      temperature: {
        type: Mask.ShowFirst(1),
        value: Mask.Number(),
      },
    };

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
        others: {
          anothers: {
            day: {
              code: "908234",
              name: "*invalid_email*",
            },
            lastUpdated: "2020-05-20 00:00:00",
          },
        },
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
      const result = Runner.Apply(person, personSchema);

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
        others: {
          anothers: {
            day: {
              code: "908234",
              name: "*invalid_email*",
            },
            lastUpdated: "*******************",
          },
        },
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

  describe("Custom rule", (): void => {
    it("Should apply custom rule", (): void => {
      class Sensitive implements IRule {
        // tslint:disable-next-line: no-any
        public execute(_value: any): string {
          return "*sensitive*";
        }
      }

      const userSchema = {
        password: new Sensitive(),
      };

      const user = {
        password: "Password",
        userName: "UserName",
      };

      const result = Runner.Apply(user, userSchema);

      assert.deepEqual(result, {
        password: "*sensitive*",
        userName: "UserName",
      });
    });
  });
});
