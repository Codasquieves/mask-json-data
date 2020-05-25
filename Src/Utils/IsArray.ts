import { IsNullOrUndefined } from "./IsNullOrUndefined";
import { IsObject } from "./IsObject";

// tslint:disable-next-line: no-any
const IsArray = (value: any): boolean => !IsNullOrUndefined(value) && IsObject(value) && value.length !== undefined;

export { IsArray };
