import { IRule } from "./Contracts/IRule";

import { All } from "./Rules/All";
import { Email } from "./Rules/Email";
import { FullName } from "./Rules/FullName";
import { NumberRule } from "./Rules/NumberRule";
import { Regex } from "./Rules/Regex";
import { ShowFirst } from "./Rules/ShowFirst";
import { ShowLast } from "./Rules/ShowLast";

class Mask {
  public static All(): IRule {
    return new All();
  }

  public static Email(): IRule {
    return new Email();
  }

  public static FullName(): IRule {
    return new FullName();
  }

  public static Number(): IRule {
    return new NumberRule();
  }

  public static Regex(pattern: RegExp): IRule {
    return new Regex(pattern);
  }

  public static ShowFirst(size: number): IRule {
    return new ShowFirst(size);
  }

  public static ShowLast(size: number): IRule {
    return new ShowLast(size);
  }
}

export { Mask };
