import { Configs } from "../Configs";
import { IRule } from "../Contracts/IRule";
import { ShowFirst } from "./ShowFirst";

class Email implements IRule {
  // tslint:disable-next-line: no-any
  public execute(value: any): string {
    const newValue = String(value);

    if (newValue.indexOf("@") === -1) {
      return Configs.INVALID_EMAIL;
    }

    const values = newValue.split("@");

    const showFirst = new ShowFirst(Configs.EMAIL_MAX_SIZE);

    return `${showFirst.execute(values[0])}@${values[1]}`;
  }
}
export { Email };
