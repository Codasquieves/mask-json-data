import { IMaskSchema } from "./Contracts/IMaskSchema";
import { IRule } from "./Contracts/IRule";
import { IsArray } from "./Utils/IsArray";
import { IsNullOrUndefined } from "./Utils/IsNullOrUndefined";
import { IsObject } from "./Utils/IsObject";

class Runner {
  private readonly schema: IMaskSchema;

  public constructor(schema: IMaskSchema) {
    this.schema = schema;
  }

  public Apply(data: object): object {
    const copyData = { ...data };

    const keys = Object.keys(copyData);

    const newObject = {};

    for (const key of keys) {
      const value = copyData[key];
      const rule = this.schema[key];

      newObject[key] = this.mask(value, rule);
    }

    return newObject;
  }

  // tslint:disable-next-line: no-any
  private mask(data: any, rule?: IRule): any {
    if (IsArray(data)) {
      return data.map((item: object): object => this.mask(item, rule));
    }

    if (IsNullOrUndefined(data)) {
      return data;
    }

    if (!IsObject(data)) {
      if (!IsNullOrUndefined(rule)) {
        return rule?.execute(data);
      }

      return data;
    }

    const keys = Object.keys(data);

    const result = {};

    for (const key of keys) {
      const value = data[key];

      const newRule = this.schema[key];

      // tslint:disable-next-line: strict-boolean-expressions
      result[key] = this.mask(value, newRule || rule);
    }

    return result;
  }
}

export { Runner };
