import morgan from "morgan";
import { UserControllers } from "../controllers/user.controller";
import { UserMiddlewares } from "../middleware/user.middleware";
import { BaseRouter } from "./router";

export class UserRouter extends BaseRouter<UserControllers>{
    constructor(){
        super(UserControllers )
    }

    routes(): void {
        this.router.get('/user', this.controller.getUser )
        this.router.get('/datos', this.controller.getData)
    }
}