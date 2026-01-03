import { QuickCalculator } from "@/components/sections/quick-calculator";

export default function AgendamentoPage() {
    return (
        <main className="min-h-screen bg-slate-50 pb-32">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Agende sua Coleta
                    </h1>
                    <p className="mt-4 text-lg text-slate-600">
                        Selecione os itens abaixo para uma estimativa ou fale diretamente conosco no WhatsApp.
                    </p>
                </div>

                <QuickCalculator />
            </div>
        </main>
    );
}
