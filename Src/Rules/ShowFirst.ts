import { IRule } from "../Contracts/IRule";

import { Configs } from "../Configs";

class ShowFirst implements IRule {
  private readonly size: number;

  public constructor(size: number) {
    this.size = size;
  }

  // tslint:disable-next-line: no-any
  public execute(value: any): string {
    const newValue = String(value);

    if (value === "") {
      return "";
    }

    const hideSize = newValue.length - this.size;

    return `${newValue.substring(0, this.size)}${Configs.MASK_CHAR.repeat(hideSize)}`;
  }
}
export { ShowFirst };
