import { Card } from "@/components/ui/card";
import { LAVEXPRESS } from "@/lib/lavexpress";

export function LegalNotice() {
    return (
        <section className="mx-auto max-w-6xl px-4 pb-8">
            <Card className="p-6">
                <div className="text-base font-medium">Importante</div>
                <div className="mt-2 text-sm text-muted-foreground">
                    Alguns itens não entram nos pacotes e são avaliados à parte:
                </div>
                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    {LAVEXPRESS.exclusions.map((e) => (
                        <li key={e}>• {e}</li>
                    ))}
                </ul>
            </Card>
        </section>
    );
}
