import { DetailOrderService } from "../../services/order/DetailOrderService";
import { Request, Response } from "express";

class DetailOrderController{
    async handle(req: Request, res: Response){
        const order_id = req.query.order_id as string

        const detailOrderService = new DetailOrderService()

        const orders = await detailOrderService.execute({
            order_id
        })

        return res.json(orders)

    }
}

export { DetailOrderController }