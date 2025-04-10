// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Manager } from "@/backend/models/engine";
import { PAGE_SIZE } from "@/lib/settings";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    // Listar
    if (req.method == 'GET') {
        try {
            const { page } = req.query
            const p = Number(page as string) || null
            const queryPagination: Record<string, number> = {}
            if (p) {
                queryPagination.offset = (p - 1) * PAGE_SIZE
                queryPagination.limit = PAGE_SIZE
            }
            const products = (await Manager().Product.findAll({
                where: { isRemove: false },
                ...(p && queryPagination)
            })).toJSON();
            const count = await Manager().Product.count({ where: { isRemove: false } })
            res.status(200).json({ products, count });
        }
        catch {
            res.status(400).json({ details: "Ocurrio un error al guardar" });
        }
    }
    // Crear
    if (req.method == 'POST') {
        try {
            const body = req.body;
            console.log(body)
            await Manager().Product.create(body)
            res.status(200).json({ details: 'producto creado con exito' });
        }
        catch {
            res.status(400).json({ details: "Ocurrio un error al crear producto" });
        }
    }
    // Actualizar
    if (req.method == 'PUT') {
        try {
            await Manager().Product.update(req.body.id, req.body)
            res.status(200).json({ details: 'producto actualizado con exito' });
        }
        catch {
            res.status(400).json({ details: "Ocurrio un error al actualizar producto" });
        }
    }
    else {
        res.status(400).json({ details: "Método no permitido" });
    }
}
