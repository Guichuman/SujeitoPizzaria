import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController{
    async handle(res: Response, req: Request){

        const user_id = req.user_id

        const detailUserService = new DetailUserService()

        const user = await detailUserService.execute(user_id)

        return user
    }
}

export { DetailUserController }