import { assert } from "chai";
import { Mask } from "../../Src/Mask";
import { Runner } from "../../Src/Runner";

// tslint:disable: no-magic-numbers
describe("Rules: All", (): void => {
  let runner: Runner;

  before((): void => {
    const schema = {
      document: Mask().All(),
    };

    runner = new Runner(schema);
  });

  it("Should mask a string value", (): void => {
    // Given
    const person = {
      document: "1233123123",
    };

    // When
    const result = runner.Apply(person);

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
    const result = runner.Apply(person);

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
    const result = runner.Apply(person);

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
    const result = runner.Apply(person);

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
    const result = runner.Apply(person);

    // Then
    assert.deepEqual(result, {
      document: "",
      value: 100,
    });
  });

  it("Should mask an object", (): void => {
    // Given
    const person = {
      document: {
        currency: "R$",
        value: {
          currency: "R$",
          value: "1000",
        },
      },
      value: 100,
    };

    // When
    const result = runner.Apply(person);

    // Then
    assert.deepEqual(result, {
      document: {
        currency: "**",
        value: {
          currency: "**",
          value: "****",
        },
      },
      value: 100,
    });
  });
});
