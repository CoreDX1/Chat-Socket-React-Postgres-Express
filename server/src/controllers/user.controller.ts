import {Request, Response} from 'express'
export class UserControllers{

    getUser(req : Request, res : Response){
        res.status(200).json({
            name : "Christian"
        })
    }

    getData(req: Request, res: Response){
        res.status(200).json({
            name : "Carlos",
            age : 12
        })
    }

}