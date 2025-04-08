// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    // Relacionar
    if (req.method == 'PUT') {
        try {
            const { productId, categoryId } = req.query as any
            // Complete codigo para realizar relacion de productos on categoria
            res.status(200).json([]);
        }
        catch {
            res.status(400).json({ details: "Ocurrio un error al eliminar" });
        }
    }
    else {
        res.status(400).json({ details: "Método no permitido" });
    }
}
