export interface ClothingItem {
    id: string;
    name: string;
    price: number;
    category: "dia-a-dia" | "social" | "cama-mesa";
}

export const ITEMS: ClothingItem[] = [
    { id: "Camisa Social Manga Longa", name: "Camisa (Social Manga Longa)", price: 18.00, category: "dia-a-dia" },
    { id: "Calça Jeans", name: "Calça Jeans", price: 15.00, category: "dia-a-dia" },
    { id: "Tênis", name: "Tênis", price: 50.00, category: "dia-a-dia" },
    { id: "Terno Completo", name: "Terno Completo", price: 45.00, category: "social" },
    { id: "Cortinas (a partir)", name: "Cortinas (a partir)", price: 55.00, category: "social" },
    { id: "Edredom Casal", name: "Edredom Casal", price: 45.00, category: "cama-mesa" },
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
