import { assert } from "chai";
import { Mask } from "../../Src/Mask";
import { Runner } from "../../Src/Runner";

// tslint:disable: no-magic-numbers
describe("Rules: All", (): void => {
  const schema = {
    document: Mask.All(),
  };

  it("Should mask a string value", (): void => {
    // Given
    const person = {
      document: "1233123123",
    };

    // When
    const result = Runner.Apply(person, schema);

    // Then
    assert.deepEqual(result, {
      document: "*".repeat(10),
    });
  });

  it("Should mask a number", (): void => {
    // Given
    const person = {
      document: 1233123123,
    };

    // When
    const result = Runner.Apply(person, schema);

    // Then
    assert.deepEqual(result, {
      document: "*".repeat(10),
    });
  });

  it("Should mask a string undefined", (): void => {
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

  it("Should mask a string null", (): void => {
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

  it("Should mask a string empty", (): void => {
    // Given
    const person = {
      document: "",
      value: 100,
    };

    // When
    const result = Runner.Apply(person, schema);

    // Then
    assert.deepEqual(result, {
      document: "",
      value: 100,
    });
  });

  it("Should mask an object", (): void => {
    const moneySchema = {
      values: {
        currency: Mask.All(),
        value: {
          currency: Mask.All(),
          value: Mask.All(),
        },
      },
    };
    // Given
    const money = {
      datetime: "2020-05-25 00:00:00",
      values: {
        currency: "R$",
        value: {
          currency: "R$",
          value: "1000",
        },
      },
    };

    // When
    const result = Runner.Apply(money, moneySchema);

    // Then
    assert.deepEqual(result, {
      datetime: "2020-05-25 00:00:00",
      values: {
        currency: "**",
        value: {
          currency: "**",
          value: "****",
        },
      },
    });
  });
});
