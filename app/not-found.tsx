import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Home } from "lucide-react";

export default function NotFound() {
    return (
        <>
            <SiteHeader />
            <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
                <div className="text-center max-w-md mx-auto">
                    <div className="mb-8 flex justify-center">
                        <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center">
                            <span className="text-5xl">🤔</span>
                        </div>
                    </div>

                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
                        Página não encontrada
                    </h1>

                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        Ops! Parece que a página que você está procurando não existe ou foi movida.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-900/10">
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4" />
                                Voltar ao Início
                            </Link>
                        </Button>

                        <Button asChild variant="outline" size="lg" className="rounded-full border-slate-200 hover:bg-slate-100 font-semibold">
                            <Link href="/contato">
                                Fale Conosco
                            </Link>
                        </Button>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </>
    );
}
