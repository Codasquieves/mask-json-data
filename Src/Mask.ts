import { IRule } from "./Contracts/IRule";

import { All } from "./Rules/All";
import { Email } from "./Rules/Email";
import { FullName } from "./Rules/FullName";
import { NumberRule } from "./Rules/NumberRule";
import { Regex } from "./Rules/Regex";
import { ShowFirst } from "./Rules/ShowFirst";
import { ShowLast } from "./Rules/ShowLast";

class MaskRules {
  private readonly rules: IRule[];

  public constructor() {
    this.rules = [];
  }

  public All(): MaskRules {
    this.rules.push(new All());

    return this;
  }

  public Email(): MaskRules {
    this.rules.push(new Email());

    return this;
  }

  // tslint:disable-next-line: no-any
  public execute(value?: any): string {
    let newValue = "";

    for (const rule of this.rules) {
      newValue = rule.execute(value);
    }

    return newValue;
  }

  public FullName(): MaskRules {
    this.rules.push(new FullName());

    return this;
  }

  public Number(): MaskRules {
    this.rules.push(new NumberRule());

    return this;
  }

  public Regex(pattern: RegExp): MaskRules {
    this.rules.push(new Regex(pattern));

    return this;
  }

  public ShowFirst(size: number): MaskRules {
    this.rules.push(new ShowFirst(size));

    return this;
  }

  public ShowLast(size: number): MaskRules {
    this.rules.push(new ShowLast(size));

    return this;
  }
}

const Mask = (): MaskRules => new MaskRules();

export { Mask, MaskRules };
