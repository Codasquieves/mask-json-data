import { Configs } from "../Configs";
import { IRule } from "../Contracts/IRule";

class Regex implements IRule {
  private readonly pattern: RegExp;

  public constructor(pattern: RegExp) {
    this.pattern = pattern;
  }

  // tslint:disable-next-line: no-any
  public execute(value: any): string {
    return String(value).replace(this.pattern, Configs.MASK_CHAR);
  }
}
export { Regex };
