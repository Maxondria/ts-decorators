import "reflect-metadata";
import { RequestHandler } from "express";
import { MetadataKeys } from "./MetadataKeys";

export function Use(middleware: RequestHandler) {
  return function (target: any, key: string, _descriptor: PropertyDescriptor) {
    /**
     * Get all existing middlewares right now or we default to an empty array
     */
    const middlewares =
      Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

    /**
     * Define this metadata 'key' again, and adding the latest middleware as the metavalue
     */
    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
}
