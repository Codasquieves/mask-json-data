import { Configs } from "../Configs";
import { IRule } from "../Contracts/IRule";

class FullName implements IRule {
  // tslint:disable-next-line: no-any
  public execute(value: any): string {
    const name = String(value);

    // tslint:disable-next-line: no-magic-numbers
    const hide = name.length - Configs.FULL_NAME_SIZE * 2;

    return [
      name.substring(0, Configs.FULL_NAME_SIZE),
      "*".repeat(hide),
      name.substring(name.length - Configs.FULL_NAME_SIZE),
    ].join("");
  }
}
export { FullName };
