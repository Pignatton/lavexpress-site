export interface ClothingItem {
    id: string;
    name: string;
    price: number;
    category: "dia-a-dia" | "social" | "cama-mesa";
    /**
     * `true` quando `price` é um valor inicial ("a partir de") e não um preço
     * fechado. O simulador precisa dizer isso ao lado do valor e do total.
     */
    aPartirDe?: boolean;
}

export const ITEMS: ClothingItem[] = [
    { id: "Camisa Social Manga Longa", name: "Camisa (Social Manga Longa)", price: 18.00, category: "dia-a-dia" },
    { id: "Calça Jeans", name: "Calça Jeans", price: 18.00, category: "dia-a-dia" },
    { id: "Tênis", name: "Tênis", price: 60.00, category: "dia-a-dia" },
    { id: "Terno Completo", name: "Terno Completo", price: 55.00, category: "social" },
    { id: "Cortinas (a partir)", name: "Cortinas (por parte)", price: 60.00, category: "social", aPartirDe: true },
    { id: "Edredom Casal", name: "Edredom Casal", price: 55.00, category: "cama-mesa" },
];

export function calcularTotal(items: { [key: string]: number }): number {
    return Object.entries(items).reduce((total, [id, quantity]) => {
        const item = ITEMS.find((i) => i.id === id);
        return total + (item ? item.price * quantity : 0);
    }, 0);
}

export function formatarMoeda(valor: number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(valor);
}
