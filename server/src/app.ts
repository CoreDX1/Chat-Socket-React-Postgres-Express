import express,{Application} from 'express';
import {ConfigServer} from './config/config'
import { UserRouter } from './routes/user.router';
import { UserMiddlewares } from './middleware/user.middleware';
import socketIO from 'socket.io';
import http from 'http';
class App extends ConfigServer{
    public app : Application = express();
    public port : number = this.getNumberEnv('PORT');
    public server = http.createServer(this.app);
    public io = new socketIO.Server(this.server, {
        cors:{
            origin: '*',
            methods:'GET,POST,PUT,DELETE',
        }
    });

    constructor() {
        super()
        this.middleware()
        this.start();
        this.socketIo();
        this.app.use('/', this.routers())
    }

    public socketIo(): void {
        this.io.on('connection', (socket) => {

            console.log('a user connected');

            socket.on('disconnect', () => {
                console.log('user disconnected');
            }
            );
        }
        );
    }

    public middleware(): Array<express.Application> {
        const data = new UserMiddlewares()
        return data.middlewares().map(middleware => this.app.use(middleware))
    }

    public routers() : Array<express.Router>{
        return [new UserRouter().router];
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        }
        );
    }
}

new App();