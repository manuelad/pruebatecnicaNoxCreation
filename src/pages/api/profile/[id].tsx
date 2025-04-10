// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'GET') {
        try {
            const { id } = req.query
            const user = await Manager().User.findOne({ where: { id } })
            res.status(200).json(user);
        }
        catch (err) {
            console.log('error', err)
            res.status(400).json({ details: "Ocurrio un error al guardar" });
        }
    }

    else {
        res.status(400).json({ details: "Método no permitido" });
    }
}
