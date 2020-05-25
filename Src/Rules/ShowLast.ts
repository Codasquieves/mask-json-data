import { IRule } from "../Contracts/IRule";

import { Configs } from "../Configs";

class ShowLast implements IRule {
  private readonly size: number;

  public constructor(size: number) {
    this.size = size;
  }

  public execute(value: string): string {
    const hideSize = value.toString().length - this.size;

    return Configs.MASK_CHAR.repeat(hideSize) + value.substring(hideSize, value.length);
  }
}
export { ShowLast };
