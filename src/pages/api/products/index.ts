// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    // Listar
    if (req.method == 'GET') {
        try {
            // Complete codigo para devolver productos
            res.status(200).json([]);
        }
        catch {
            res.status(400).json({ details: "Ocurrio un error al guardar" });
        }
    }
    // Crear
    if (req.method == 'POST') {
        try {
            // Complete codigo para guardar productos
            res.status(200).json([]);
        }
        catch {
            res.status(400).json({ details: "Ocurrio un error al crear producto" });
        }
    }
    // Actualizar
    if (req.method == 'PUT') {
        try {
            // Complete codigo para actualizar producto
            res.status(200).json([]);
        }
        catch {
            res.status(400).json({ details: "Ocurrio un error al actualizar producto" });
        }
    }
    else {
        res.status(400).json({ details: "Método no permitido" });
    }
}
