import { tbl_message } from "@prisma/client";
import { db } from "../config/database";

class Message {
    async save(data: tbl_message) {
        const response = await db.tbl_message.create({data: {
            cellphone: data.cellphone,
            
        }})
        return response
    }
}

export default new Message()