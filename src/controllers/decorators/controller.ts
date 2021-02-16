import { NextFunction, Request, RequestHandler, Response } from "express";
import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { MetadataKeys } from "./MetadataKeys";
import { Methods } from "./Methods";

const router = AppRouter.getInstance();

const bodyValidators = (props: string[]): RequestHandler => {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req?.body) {
      return res.status(422).send("Invalid request, no body");
    }
    for (const prop of props) {
      if (!req.body[prop]) {
        return res.status(422).send("Invalid request, body is invalid");
      }
    }
    return next();
  };
};

export function Controller(routePrefix: string) {
  return function (target: Function) {
    for (let key in target.prototype) {
      /**
       * get the real route handler
       */
      const routeHandler = target.prototype[key];
      /**
       * Get the 'path' as attached to route decorators
       */
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );

      /**
       * Get the 'method' as attached to route decorators
       */
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      /**
       * Get the 'middleware' as attached to 'use' decorators
       */
      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      /**
       * Get the 'body' as attached to 'BodyValidator' decorators
       */
      const body =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];

      const validationMiddleware = bodyValidators(body);

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validationMiddleware,
          routeHandler
        );
      }
    }
  };
}
