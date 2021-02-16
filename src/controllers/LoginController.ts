import { Request, Response } from "express";
import { Controller, Get, Post, BodyValidator } from "./decorators";

@Controller("/auth")
class LoginController {
  @Get("/login")
  getLogin(_req: Request, res: Response) {
    return res.send(`
          <form method="POST">
              <div>
                  <label>Email</label>
                  <input name="email" type="email" />
              </div>
      
              <div>
                   <label>Label</label>
                  <input name="password" type="password" />
              </div>
      
              <button type="submit">Login</button> 
          </form>
          `);
  }

  @Post("/login")
  @BodyValidator("email", "password")
  postLogin(req: Request, res: Response) {
    const {
      body: { email, password },
    } = req;

    if (email && password && email === "hi@hi.com" && password === "pass") {
      req.session = { loggedIn: true };
      return res.redirect("/");
    } else {
      return res.send("Invalid email or password.");
    }
  }

  @Get("/logout")
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    return res.redirect("/");
  }
}
