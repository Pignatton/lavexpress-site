"use client";

import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function QualityStandard() {
    return (
        <section className="relative py-12 overflow-hidden bg-gradient-to-br from-emerald-600 to-green-700">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-white/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px]" />
            </div>

            <div className="container relative px-4 md:px-6 mx-auto">
                <div className="text-center max-w-4xl mx-auto mb-10">
                    <div className="inline-flex items-center justify-center w-full mb-4">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-200/50" />
                        <span className="px-3 text-xs font-bold text-emerald-100 uppercase tracking-widest">
                            Excelência em cada detalhe
                        </span>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-200/50" />
                    </div>

                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
                        Padrão Lavexpress de Qualidade
                    </h2>

                    <p className="text-base text-emerald-50 leading-relaxed max-w-2xl mx-auto mb-6">
                        Não é apenas lavar roupa. É cuidar do seu tempo e da sua imagem com tecnologia e processos profissionais.
                    </p>

                    <div>
                        <Button asChild className="bg-white text-emerald-700 hover:bg-emerald-50 rounded-full px-6 py-5 text-sm font-bold shadow-lg shadow-black/10 transition-all hover:scale-105">
                            <Link href="/contato">
                                Experimentar Agora
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="relative w-full max-w-5xl mx-auto -mt-4">
                    <ThreeDPhotoCarousel />
                </div>
            </div>
        </section>
    );
}
