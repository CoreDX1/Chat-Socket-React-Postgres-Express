import express from "express";
import morgan from "morgan";

export class UserMiddlewares {
  constructor() {
    this.middlewares();
  }

  middlewares(): Array<any> {
    return [
      morgan("dev"),
      express.json(),
      express.urlencoded({ extended: false }),
    ];
  }
}
