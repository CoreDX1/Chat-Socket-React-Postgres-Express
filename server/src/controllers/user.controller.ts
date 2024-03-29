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

    async getData(req: Request, res: Response){
        const {id , usuario, mensaje , fecha} = req.body;
        await pool.query('INSERT INTO chat (id, usuario, mensaje, fecha) VALUES ($1, $2, $3, $4)', [id, usuario, mensaje, fecha])
        res.send('ok')
    }

}