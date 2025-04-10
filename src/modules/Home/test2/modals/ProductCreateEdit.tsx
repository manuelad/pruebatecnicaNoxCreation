import { CategoryType } from "@/backend/Types/CategoryType"
import { Toaster, toaster } from "@/components/ui/toaster"
import { Button, CloseButton, Dialog, Field, Input, Portal, Stack, UseDialogReturn } from "@chakra-ui/react"
import { FormEvent, Fragment, useState } from "react"

export type ProductType = {
    id?: string
    name: string
    price: number
    quantity: number
    categoryId?: string,
    category?: CategoryType
}

export const ProductCreateEdit = ({
    initialize,
    dialog,
}: {
    initialize: undefined | ProductType
    dialog: UseDialogReturn
}) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<ProductType | undefined>(initialize)

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Iniciar
        setLoading(true)

        const res = await fetch('/api/products', {
            method: initialize ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })


        // Hacer script para guardar los datos
        const response = {
            status: res.ok ? 200 : res.status,
            json: async () => {
                return {
                    details: (await res.json())['details']
                }
            },
        }
        // END

        if (response.status == 200) {
            toaster.create({
                title: `Producto ${initialize ? 'actualizado' : 'creado'} con exito`,
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
                                            <Input type="text" name="name" value={data?.name || ''} disabled={loading} onChange={e => {
                                                setData({
                                                    ...(data ? data : { name: '', price: 0, quantity: 0 }),
                                                    name: e.target.value
                                                })
                                            }} />
                                        </Field.Root>
                                        <Field.Root>
                                            <Field.Label>Precio</Field.Label>
                                            <Input type='text' name="price" value={data?.price || 0} disabled={loading} onChange={e => {
                                                setData({
                                                    ...(data ? data : { name: '', price: 0, quantity: 0 }),
                                                    price: Number(e.target.value)
                                                })
                                            }} />
                                        </Field.Root>
                                        <Field.Root>
                                            <Field.Label>Cantidad</Field.Label>
                                            <Input type='text' name="quantity" value={data?.quantity || 0} disabled={loading} onChange={e => {
                                                setData({
                                                    ...(data ? data : { name: '', price: 0, quantity: 0 }),
                                                    quantity: Number(e.target.value)
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