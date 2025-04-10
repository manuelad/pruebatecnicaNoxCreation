import { Divider } from '@/components/Divider'
import { PaginationCustom } from '@/components/PaginationCustom'
import { Toaster, toaster } from "@/components/ui/toaster"
import { scrollToElement } from '@/lib/settings'
import { Card, Stack, Text, useDialog } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { BarAdd } from './component/BarAdd'
import { TableProduct } from './component/TableProduct'
import { ProductCreateEdit, ProductType } from './modals/ProductCreateEdit'

export const Testing2 = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<ProductType[]>([])
    const [initialize, setInitialize] = useState<ProductType | undefined>()
    const dialog = useDialog()
    const [count, setCount] = useState(0)
    const router = useRouter()
    const { pageTest2 } = router.query
    const page = Number(pageTest2) || undefined

    useEffect(() => {
        load(page || 1)
        if (page === undefined) return
        scrollToElement('test2')
    }, [page])

    // Debe cargar los datos

    const load = async (p: number) => {
        setLoading(true)
        // Fragmento a modificar con la carga de los datos
        const res = await fetch(`/api/products?page=${p}`)
        const response = {
            status: res.ok ? 200 : res.status,
            json: async () => {
                return await res.json()
            }
        }
        // Fin


        if (response.status == 200) {
            const { products, count: total } = await response.json()
            setCount(total)
            setData(products)
        }
        else {
            toaster.create({
                title: "Error al cargar los datos de productos",
                duration: 9000,
                type: 'error'
            })
        }

        setLoading(false)
    }

    const onLoad = async () => {
        await load(1)

    }

    // Debe eliminar un item
    const onDelete = async (id: string) => {
        withReactContent(Swal).fire({
            title: "¿Estás seguro?",
            text: "¿Estas seguro que deseas eliminar esta entrada?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Si, elimínalo!",
            preConfirm: async () => {
                Swal.showLoading()
                // Fragmento a agregar aca
                const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
                const response = {
                    status: res.ok ? 200 : 400,
                    json: async () => {
                        return (await res.json())['details']
                    }
                }
                //End
                if (response.status == 200) {
                    withReactContent(Swal).fire({
                        text: "Eliminado correctamente!",
                        icon: "success",
                    })
                    onLoad()
                }
                else {
                    toaster.create({
                        title: "Error al eliminar",
                        duration: 9000,
                        type: 'error'
                    })
                }
                Swal.hideLoading()
            },
        })
    }

    useEffect(() => {
        // Cuando se cierra la venta, refresca la tabla
        if (!dialog.open) {
            onLoad()
        }
    }, [dialog.open])

    return (
        <Fragment>
            <Toaster />

            <Card.Root id={'test2'}>
                <Card.Header >
                    <Divider>
                        <Text fontWeight="medium">Habilidad Número 2</Text>
                    </Divider>
                </Card.Header>
                <Card.Body gap={4}>
                    <Text>
                        Habiendo dominado como guardar datos con Sequelize, ahora subimos la parada, mostramos a continuación un CRUD (Create, Read, Update, Delete) de productos.
                        Debe crear el servicio endpoint para hacer posible que se pueda leer, crear, actualizar y eliminar estos registros. IMPORTANTE: Los datos no se eliminan,
                        cada modelo tiene un campo llamado isRemove que indica si está eliminado o no. Por tanto cuando haga un get para obtener los datos, debe mostrar todos
                        los que isRemove sean falsos.
                    </Text>

                    <Text>
                        Puntos extras si se realiza el paginado y se trabaja en validaciones.
                    </Text>

                    <Stack>
                        <BarAdd
                            loading={loading}
                            dialog={dialog}
                            setInitialize={setInitialize}
                        />
                        {dialog.open && <ProductCreateEdit
                            initialize={initialize}
                            dialog={dialog}
                        />}
                    </Stack>

                    <TableProduct
                        data={data}
                        dialog={dialog}
                        setInitialize={setInitialize}
                        onDelete={onDelete}
                    />

                    <PaginationCustom page={page} count={count} pageSearch='pageTest2' />
                </Card.Body>
                <Card.Footer />
            </Card.Root>

        </Fragment>
    )
}