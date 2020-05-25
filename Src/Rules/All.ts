import { Configs } from "../Configs";
import { IRule } from "../Contracts/IRule";

class All implements IRule {
  // tslint:disable-next-line: no-any
  public execute(value: any): string {
    const newValue = String(value);

    return Configs.MASK_CHAR.repeat(newValue.toString().length);
  }
}

export { All };
