import express from "express";
import morgan from "morgan";
import cors from 'cors';

export class UserMiddlewares {
  constructor() {
    this.middlewares();
  }

  middlewares(): Array<any> {
    return [
      morgan("dev"),
      express.json(),
      express.urlencoded({ extended: false }),
      cors()
    ];
  }
}
