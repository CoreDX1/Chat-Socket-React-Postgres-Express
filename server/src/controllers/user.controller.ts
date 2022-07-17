import {Request, Response} from 'express'
import pool from '../database'
import { User } from '../interface/UserModel';
export class UserControllers {

    async getUser(req : Request, res : Response){
        const response = await pool.query('SELECT * FROM chat');
        res.status(200).json(
            response.rows
        )
    }

    getData(req: Request, res: Response){
        const data: User = req.body;
        console.log(data)
    }

}