import express,{ Router } from "express";

export class BaseRouter<T>{

    public app : express.Application = express()
    public router : Router
    public controller : T

    constructor(TControllers: {new () : T}){
        this.router = Router()
        this.controller = new TControllers()
        this.routes()
    }

    routes (){
    }

}