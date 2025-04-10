import { PAGE_SIZE } from '@/lib/settings'
import { ButtonGroup, IconButton, Pagination } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

export const PaginationCustom = ({ count, page, pageSearch }: { count: number, page: number | undefined, pageSearch: string }) => {

    const router = useRouter()


    function handleOnclick(p: number): void {
        router.push(`${window.location.pathname}?${pageSearch}=${p}`)
    }

    return (
        <Pagination.Root count={count} pageSize={PAGE_SIZE} page={page || 1}>
            <ButtonGroup variant="ghost" size="sm" wrap="wrap">
                <Pagination.PrevTrigger asChild>
                    <IconButton>
                        <LuChevronLeft />
                    </IconButton>
                </Pagination.PrevTrigger>

                <Pagination.Items
                    render={(page) => (
                        <IconButton variant={{ base: "ghost", _selected: "outline" }}
                            onClick={() => handleOnclick(page.value)}
                        >
                            {page.value}
                        </IconButton>
                    )}
                />

                <Pagination.NextTrigger asChild>
                    <IconButton>
                        <LuChevronRight />
                    </IconButton>
                </Pagination.NextTrigger>
            </ButtonGroup>
        </Pagination.Root>
    )
}