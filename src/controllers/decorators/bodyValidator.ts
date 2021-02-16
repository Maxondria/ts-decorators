import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";

export function BodyValidator(...props: string[]) {
  return function (target: any, key: string, _descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.validator, props, target, key);
  };
}
