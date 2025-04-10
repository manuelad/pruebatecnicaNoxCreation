import { CategoryType } from '@/backend/Types/CategoryType'
import { Divider } from '@/components/Divider'
import { PaginationCustom } from '@/components/PaginationCustom'
import { Toaster, toaster } from "@/components/ui/toaster"
import { scrollToElement } from '@/lib/settings'
import { Button, Card, Flex, Progress, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useRef, useState } from 'react'
import { FiRefreshCw } from 'react-icons/fi'
import { ProductType } from '../test2/modals/ProductCreateEdit'
import { TableProduct } from './component/TableProduct'

export const Testing3 = ({
    categories
}: {
    categories: Array<CategoryType>
}) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([] as Array<ProductType>)
    const [count, setCount] = useState(0)
    const router = useRouter()
    const pageRef = useRef<number | undefined>(undefined)

    useEffect(() => {
        pageRef.current = Number(router.query.pageTest3) || undefined
        if (pageRef.current === undefined) return
        scrollToElement('test3')
        load(pageRef.current)
    }, [router.query])
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
            console.log(products)
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
        await load(pageRef.current || 1)
    }



    // Guardar la categoria cuando se elija
    const onSave = async (productId: string, categoryId: string) => {
        setLoading(true)

        const res = await fetch(`/api/products/relation/${productId}/${categoryId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const response = {
            status: res.ok ? 200 : res.status,
            json: async () => {
                return await res.json()
            }
        }

        if (response.status == 200) {
            toaster.create({
                title: "Categoria asignada!",
                duration: 9000,
                type: 'success'
            })
        }
        else {
            toaster.create({
                title: (await response.json())['details'],
                duration: 9000,
                type: 'error'
            })
        }

        setLoading(false)
    }

    return (
        <Fragment>
            <Toaster />

            <Card.Root id={'test3'}>
                <Card.Header >
                    <Divider>
                        <Text fontWeight="medium">Habilidad Número 3</Text>
                    </Divider>
                </Card.Header>
                <Card.Body gap={4}>
                    <Text>
                        Una vez dominado como hacer CRUDS, ahora vamos a relacionar productos con Categorias. Un producto pertenece a una categoria. Y una categoria
                        tiene muchos productos. La diferencia acá es que vamos a cargar todas las categorias desde el getServerSideProps, para pasar ya este listado
                        a esta vista en los select.
                    </Text>

                    <Text>
                        Para que se pueda realizar esta actividad, es escencial haber cumplido la habilidad anterior. Refresque la pantalla y cargue productos para conocer
                        si se ha guardado correctamente en BD.
                    </Text>

                    <Stack>
                        <Flex w={'100%'} alignItems={'center'} gap={4}>
                            <Stack flex={1} w="240px">
                                {loading && <Progress.Root maxW="240px" value={null}>
                                    <Progress.Track>
                                        <Progress.Range />
                                    </Progress.Track>
                                </Progress.Root>}
                            </Stack>
                            <Stack flex={1}>
                                <Button onClick={() => {
                                    onLoad()
                                }}>
                                    <FiRefreshCw /> Cargar Productos
                                </Button>
                            </Stack>
                        </Flex>
                    </Stack>

                    <TableProduct
                        data={data}
                        categories={categories}
                        onSave={onSave}
                    />

                    <PaginationCustom page={pageRef.current} count={count} pageTest='pageTest3' />
                </Card.Body>
                <Card.Footer />
            </Card.Root>

        </Fragment>
    )
}