import { Button, CloseButton, Dialog, Field, Input, Portal, Stack, UseDialogReturn } from "@chakra-ui/react"
import { Fragment, useState } from "react"
import { Toaster, toaster } from "@/components/ui/toaster"

export const ProductCreateEdit = ({
    initialize,
    dialog,
}: {
    initialize: undefined | any
    dialog: UseDialogReturn
}) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(initialize ? initialize : {
        name: "",
        price: "",
        quantity: ""
    })

    const onSubmit = async (e: any) => {
        e.preventDefault()
        // Iniciar
        setLoading(true)

        if (!initialize)
            delete data.id

        // Hacer script para guardar los datos
        const response = {
            status: 200,
            json: () => {
                return {
                    details: ""
                }
            },
        }
        // END

        if (response.status == 200) {
            toaster.create({
                title: "Producto creado",
                duration: 9000,
                type: 'success'
            })
            dialog.setOpen(false)
        }
        else {
            toaster.create({
                title: (await response.json())['details'],
                duration: 9000,
                type: 'error'
            })
        }

        // Finalizar
        setLoading(false)

    }

    return (
        <Fragment>
            <Toaster />
            <Dialog.RootProvider value={dialog} placement={'center'}>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <form action="post" onSubmit={onSubmit}>
                                <Dialog.Header>
                                    <Dialog.Title>{initialize ? "Update" : "Create"} Product</Dialog.Title>
                                </Dialog.Header>
                                <Dialog.Body>

                                    <Stack gap="5">
                                        <Field.Root>
                                            <Input type="text" name="id" disabled={loading} hidden />
                                        </Field.Root>
                                        <Field.Root>
                                            <Field.Label>Nombre</Field.Label>
                                            <Input type="text" name="name" value={data.name} disabled={loading} onChange={e => {
                                                setData({
                                                    ...data,
                                                    name: e.target.value
                                                })
                                            }} />
                                        </Field.Root>
                                        <Field.Root>
                                            <Field.Label>Precio</Field.Label>
                                            <Input type='text' name="price" value={data.price} disabled={loading} onChange={e => {
                                                setData({
                                                    ...data,
                                                    price: e.target.value
                                                })
                                            }} />
                                        </Field.Root>
                                        <Field.Root>
                                            <Field.Label>Cantidad</Field.Label>
                                            <Input type='text' name="quantity" value={data.quantity} disabled={loading} onChange={e => {
                                                setData({
                                                    ...data,
                                                    quantity: e.target.value
                                                })
                                            }} />
                                        </Field.Root>
                                    </Stack>

                                </Dialog.Body>
                                <Dialog.Footer>
                                    <Dialog.ActionTrigger asChild>
                                        <Button variant="outline" colorScheme={'red'}>Cancelar</Button>
                                    </Dialog.ActionTrigger>
                                    <Button type='submit' loading={loading}>Guardar</Button>
                                </Dialog.Footer>
                                <Dialog.CloseTrigger asChild>
                                    <CloseButton size="sm" />
                                </Dialog.CloseTrigger>
                            </form>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.RootProvider>
        </Fragment>
    )
}