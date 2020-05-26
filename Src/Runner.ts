import { IMaskSchema } from "./Contracts/IMaskSchema";
import { IRule } from "./Contracts/IRule";
import { IsArray } from "./Utils/IsArray";
import { IsNullOrUndefined } from "./Utils/IsNullOrUndefined";
import { IsObject } from "./Utils/IsObject";

// tslint:disable: no-any
class Runner {
  public static Apply(data: object, schema: IMaskSchema): object {
    const copyData = { ...data };

    const keys = Object.keys(copyData);

    const newObject = {};

    for (const key of keys) {
      const value = copyData[key];
      const rule = schema[key];

      newObject[key] = Runner.Mask(value, rule);
    }

    return newObject;
  }

  private static Mask(data: object, rule: IRule | undefined | object): any {
    if (IsNullOrUndefined(data) || IsNullOrUndefined(rule)) {
      return data;
    }

    if (!IsNullOrUndefined(rule) && !IsObject(data)) {
      return (rule as IRule).execute(data);
    }

    if (IsArray(data)) {
      return (data as []).map((item: object): any => Runner.Mask(item, rule));
    }

    const newObject = {};

    for (const key of Object.keys(data)) {
      const newRule = (rule as object)[key];
      const value = data[key];

      newObject[key] = Runner.Mask(value, newRule);
    }

    return newObject;
  }
}

export { Runner };
