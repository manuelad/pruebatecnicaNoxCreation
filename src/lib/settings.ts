export const PAGE_SIZE = 2

export function scrollToElement(id: string) {
    const elemento = document.getElementById(id);
    if (elemento)
        elemento.scrollIntoView({
            behavior: 'smooth', // desplazamiento suave
            block: 'start'      // alinea el elemento en la parte superior
        });
}