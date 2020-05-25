import { MaskRules } from "../Mask";

interface IMaskSchema {
  [key: string]: MaskRules | undefined;
}

export { IMaskSchema };
