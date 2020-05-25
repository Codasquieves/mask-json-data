import { Configs } from "../Configs";
import { IRule } from "../Contracts/IRule";

class NumberRule implements IRule {
  // tslint:disable-next-line: no-any
  public execute(value: any): string {
    const numberValue = parseFloat(value);

    return isNaN(numberValue) ? Configs.INVALID_NUMBER : Configs.VALID_NUMBER;
  }
}
export { NumberRule };
