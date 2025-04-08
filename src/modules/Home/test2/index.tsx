import { Divider } from '@/components/Divider'
import { Card, Stack, Text, useDialog } from '@chakra-ui/react'
import { Fragment, useEffect, useState } from 'react'
import { Toaster, toaster } from "@/components/ui/toaster"
import { ProductCreateEdit } from './modals/ProductCreateEdit'
import { BarAdd } from './component/BarAdd'
import { TableProduct } from './component/TableProduct'
import { PaginationCustom } from '@/components/PaginationCustom'
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"

export const Testing2 = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([] as Array<any>)
    const [initialize, setInitialize] = useState(undefined as undefined | any)
    const dialog = useDialog()

    // Debe cargar los datos
    const onLoad = async () => {
        setLoading(true)

        // Fragmento a modificar con la carga de los datos
        const response = {
            status: 200,
            json: () => {
                return []
            }
        }
        // Fin

        if (response.status == 200) {
            setData(await response.json())
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
                const response = {
                    status: 200,
                    json: () => {
                        return []
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

                    <PaginationCustom />
                </Card.Body>
                <Card.Footer />
            </Card.Root>

        </Fragment>
    )
}