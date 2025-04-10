import { Divider } from '@/components/Divider'
import { Toaster, toaster } from "@/components/ui/toaster"
import { Button, Card, Field, Input, Stack, Text } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { ChangeEvent, FormEvent, Fragment, useState } from 'react'

export const Testing1 = () => {
    const session = useSession()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({ ...session.data?.user })

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)
        // Iniciar
        setLoading(true)

        const res = await fetch('/api/profile', {
            method: 'POST',
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
            }
        }
        // Fin de fragmento a sustituir

        if (response.status == 200) {
            toaster.create({
                title: "Perfil actualizado",
                duration: 9000,
                type: 'success'
            })
        }
        else {
            toaster.create({
                title: (await response.json())['details'],
                duration: 9000,
                type: 'info',
            })
        }

        // Finalizar
        setLoading(false)

    }

    function handleOnchange(e: ChangeEvent<HTMLInputElement>): void {
        setUser(prev => ({
            ...prev!,
            [e.target.name]: e.target.value
        }))
    }



    return (
        <Fragment>
            <Toaster />

            <Card.Root id={'test1'}>
                <Card.Header >
                    <Divider>
                        <Text fontWeight="medium">Habilidad Número 1</Text>
                    </Divider>
                </Card.Header>
                <Card.Body gap={4}>
                    <Text>
                        Para poder operar con el sistema de Merco Sistema, es importante saber usar Sequelize. Sequelize es un ORM de base de datos compatible con Sqlite, Postgress
                        y otros. En esta prueba trabajaremos con Sqlite por la simplicidad de configuración, en el proyecto real se usa Postgrees que solo diferencia algunas cuestiones
                        de configuración.
                    </Text>

                    <Text>
                        En esta primera habilidad, deberá completar el siguiente Script para poder modificar los datos de este perfil. Les damos una pista, se debe hacer una
                        petición a /api/profile. revisa el código y completa el script. En la carpeta /backend/models encontrarán los modelos de BD que se usarán en estos test.
                        Para probar si realmente guardo, refresque la pantalla para cargar los datos.
                    </Text>

                    <form action="post" onSubmit={onSubmit}>
                        <Stack gap="5">
                            <Field.Root>
                                <Input type="text" name="id" value={user?.id} disabled={loading} hidden />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Nombre</Field.Label>
                                <Input type="text" name="first_name" value={user?.first_name} disabled={loading} onChange={handleOnchange} />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Apellidos</Field.Label>
                                <Input type='text' name="last_name" value={user?.last_name} disabled={loading} onChange={handleOnchange} />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Carnet</Field.Label>
                                <Input type='text' name="ci" value={user?.ci} disabled={loading} onChange={handleOnchange} />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Correo</Field.Label>
                                <Input type='email' name="email" value={user?.email} disabled={loading} onChange={handleOnchange} />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Teléfono</Field.Label>
                                <Input type='text' name="phone" value={user?.phone} disabled={loading} onChange={handleOnchange} />
                            </Field.Root>
                        </Stack>
                        <Stack gap="4" mt={4}>
                            <Button type='submit' loading={loading}>Guardar</Button>
                        </Stack>
                    </form>
                </Card.Body>
                <Card.Footer />
            </Card.Root>

        </Fragment>
    )
}