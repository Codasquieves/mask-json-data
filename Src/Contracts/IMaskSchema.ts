import { IRule } from "./IRule";

interface IMaskSchema {
  [key: string]: IRule | undefined | object;
}

export { IMaskSchema };
