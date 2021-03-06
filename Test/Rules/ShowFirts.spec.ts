import { assert } from "chai";
import { Mask } from "../../Src/Mask";
import { Runner } from "../../Src/Runner";

// tslint:disable: no-magic-numbers
describe("Rules: ShowFirts", (): void => {
  const schema = {
    paragraph: Mask.ShowFirst(3),
  };

  it("Should mask a string value", (): void => {
    // Given
    const text = {
      paragraph: "In the new year",
    };

    // When
    const result = Runner.Apply(text, schema);

    // Then
    assert.deepEqual(result, {
      paragraph: "In ************",
    });
  });

  it("Should mask a string empty", (): void => {
    // Given
    const text = {
      paragraph: 10239102938,
    };

    // When
    const result = Runner.Apply(text, schema);

    // Then
    assert.deepEqual(result, {
      paragraph: "102********",
    });
  });

  it("Should mask a string undefined", (): void => {
    // Given
    const text = {
      paragraph: undefined,
    };

    // When
    const result = Runner.Apply(text, schema);

    // Then
    assert.deepEqual(result, {
      paragraph: undefined,
    });
  });

  it("Should mask a string null", (): void => {
    // Given
    const text = {
      paragraph: null,
    };

    // When
    const result = Runner.Apply(text, schema);

    // Then
    assert.deepEqual(result, {
      paragraph: null,
    });
  });
});
