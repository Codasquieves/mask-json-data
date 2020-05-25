import { assert } from "chai";
import { Mask } from "../../Src/Mask";
import { Runner } from "../../Src/Runner";

// tslint:disable: no-identical-functions
describe("Rules: Email", (): void => {
  let runner: Runner;

  before((): void => {
    const schema = {
      email: Mask().Email(),
    };

    runner = new Runner(schema);
  });

  it("Should mask a valid email", (): void => {
    // Given
    const person = {
      email: "teste@email.com",
    };

    // When
    const result = runner.Apply(person);

    // Then
    assert.deepEqual(result, {
      email: "tes**@email.com",
    });
  });

  it("Should mask a invalid email", (): void => {
    // Given
    const person = {
      email: "testeemail.com",
    };

    // When
    const result = runner.Apply(person);

    // Then
    assert.deepEqual(result, {
      email: "*invalid_email*",
    });
  });

  it("Should mask a number value", (): void => {
    // Given
    const person = {
      email: 100,
    };

    // When
    const result = runner.Apply(person);

    // Then
    assert.deepEqual(result, {
      email: "*invalid_email*",
    });
  });

  it("Should mask a invalid undefined", (): void => {
    // Given
    const person = {
      email: undefined,
    };

    // When
    const result = runner.Apply(person);

    // Then
    assert.deepEqual(result, {
      email: undefined,
    });
  });

  it("Should mask a invalid null", (): void => {
    // Given
    const person = {
      email: null,
    };

    // When
    const result = runner.Apply(person);

    // Then
    assert.deepEqual(result, {
      email: null,
    });
  });
});
