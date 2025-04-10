// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    // Relacionar
    if (req.method == 'PUT') {
        try {
            const { productId, categoryId } = req.query
            // Complete codigo para realizar relacion de productos on categoria
            await Manager().Product.update(productId as string, {
                categoryId
            })
            res.status(200).json({ details: 'Categoria Adignada!' });
        }
        catch {
            res.status(400).json({ details: "Ocurrio un error al eliminar" });
        }
    }
    else {
        res.status(400).json({ details: "Método no permitido" });
    }
}
