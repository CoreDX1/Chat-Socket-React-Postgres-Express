import express,{Application} from 'express';
import {ConfigServer} from './config/config'
import { UserRouter } from './routes/user.router';
import { UserMiddlewares } from './middleware/user.middleware';
class App extends ConfigServer{
    public app : Application = express();
    public port : number = this.getNumberEnv('PORT');

    constructor() {
        super()
        this.app = express();
        this.middleware()
        this.start();
        this.app.use('/', this.routers())
    }

    public middleware(): Array<express.Application> {
        const data = new UserMiddlewares()
        return data.middlewares().map(middleware => this.app.use(middleware))
    }

    public routers() : Array<express.Router>{
        return [new UserRouter().router];
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        }
        );
    }
}

new App();