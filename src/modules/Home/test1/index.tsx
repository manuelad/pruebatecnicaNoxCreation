import { Divider } from '@/components/Divider'
import { Button, Card, Field, Input, Stack, Text } from '@chakra-ui/react'
import { Fragment, useState } from 'react'
import { Toaster, toaster } from "@/components/ui/toaster"
import { useSession } from 'next-auth/react'

export const Testing1 = () => {
    const session = useSession()
    const [loading, setLoading] = useState(false)
    const [user] = useState(session.data?.user)

    const onSubmit = async (e: any) => {
        e.preventDefault()
        const {
            id,
            first_name,
            last_name,
            ci,
            email,
            phone
        } = e.target
        const data = {
            id: id.value,
            first_name: first_name.value,
            last_name: last_name.value,
            ci: ci.value,
            email: email.value,
            phone: phone.value
        }
        // Iniciar
        setLoading(true)

        // Hacer script para guardar los datos
        const response = {
            status: 200,
            json: () => {
                return {
                    details: ''
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
                type: 'success'
            })
        }

        // Finalizar
        setLoading(false)

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
                                <Input type="text" name="first_name" value={user?.first_name} disabled={loading} />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Apellidos</Field.Label>
                                <Input type='text' name="last_name" value={user?.last_name} disabled={loading} />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Carnet</Field.Label>
                                <Input type='text' name="ci" value={user?.ci} disabled={loading} />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Correo</Field.Label>
                                <Input type='email' name="email" value={user?.email} disabled={loading} />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Teléfono</Field.Label>
                                <Input type='text' name="phone" value={user?.phone} disabled={loading} />
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