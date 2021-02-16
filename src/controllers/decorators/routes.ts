import "reflect-metadata";
import { RequestHandler } from "express";
import { MetadataKeys } from "./MetadataKeys";
import { Methods } from "./Methods";

/**
 * Make sure that every function using this decorator satisfies this interface
 * {descriptor.value} basically must be a real route handler otherwise,
 * ts will warn us
 */
interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(method: string) {
  return function (path: string) {
    return function (
      target: any,
      key: string,
      _descriptor: RouteHandlerDescriptor
    ) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
}

export const Get = routeBinder(Methods.GET);
export const Post = routeBinder(Methods.POST);
export const Put = routeBinder(Methods.PUT);
export const Delete = routeBinder(Methods.DELETE);
export const Patch = routeBinder(Methods.PATCH);
