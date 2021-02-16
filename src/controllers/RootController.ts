import { Response, Request, NextFunction } from "express";
import { Controller, Get, Use } from "./decorators";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req?.session?.loggedIn) {
    return next();
  }
  return res.status(403).send("Not permitted");
};

@Controller("")
class RootController {
  @Get("/")
  getHome(req: Request, res: Response) {
    if (req?.session?.loggedIn) {
      return res.send(`
            <div>
              <div>You are logged in</div>
              <a href="/auth/logout">Logout</a>
            </div>
          `);
    } else {
      return res.send(`
            <div>
              <div>You are not logged in</div>
              <a href="/auth/login">Login</a>
            </div>
          `);
    }
  }

  @Get("/protected")
  @Use(requireAuth)
  getProtected(_req: Request, res: Response) {
    return res.send(`
    <div>
      <div>Welcome to protected route!</div>
      <div>You're definitely logged in!</div>
    </div>
  `);
  }
}
