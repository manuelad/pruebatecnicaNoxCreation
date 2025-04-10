// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'POST') {
        try {
            await Manager().User.update(req.body.id, {
                ...req.body
            })
            res.status(200).json({ details: "Creado con exito!" });
        }
        catch (err) {
            console.log('error', err)
            res.status(400).json({ details: "Ocurrio un error al guardar" });
        }
    }

    if (req.method === 'GET') {

    }
    else {
        res.status(400).json({ details: "Método no permitido" });
    }
}
