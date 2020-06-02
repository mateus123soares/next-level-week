import Knex from '../database/connection'
import {Request,Response} from 'express'

class itemsControllers {
    async index(req:Request, res:Response) {

        const items = await Knex('items').select('*');
    
        const serializedItems = items.map(item => {
            return {
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`
            }
        })
    
        return res.json(serializedItems);
    }
}

export default itemsControllers