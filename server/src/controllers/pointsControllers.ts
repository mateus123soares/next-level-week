import Knex from '../database/connection'
import { Request, Response } from 'express'

class pointsControllers {
    async show(req:Request, res:Response) {

        const {id} = req.params
        const point = await Knex('points').where('id',id).first();

        if(!point){
            return res.status(400).json({message:"point not found"})
        }

        const items = await Knex('items')
        .join('point-items','items.id','=','point-items.item_id')
        .where('point-items.point_id',id)
        .select('items.title');

        res.json({point,items});
    
    }
    async create(req: Request, res: Response) {
        const { name, email, whatsapp, latitude, longitude, city, uf, items } = req.body

        const trx = await Knex.transaction();
        
        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0]

        const pointsItems = items.map((item_id: Number) => {
            return {
                item_id,
                point_id: point_id,
            }
        });

        const addItems = await trx('point-items').insert(pointsItems)

        return res.json({ id:point_id,...point, });
    }

}

export default pointsControllers