"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { LAVEXPRESS } from "@/lib/lavexpress";

const SERVICES = [
    {
        title: "Cesto de Roupas",
        description: "Ideal para o dia a dia. Roupas lavadas, secas e dobradas. Preço por volume, sem surpresas.",
        image: "/images/service_basket.png", // Generated
        features: ["Roupas do dia a dia", "Cama e banho simples", "Entrega dobrada"],
        link: "/servicos/lavagem-de-roupas",
        badge: "Mais Popular",
    },
    {
        title: "Pacotes Lavexpress",
        description: `Pacotes de peças para a sua rotina, com validade de ${LAVEXPRESS.regrasPacotes.validadeDias} dias. Quanto maior o pacote, menor o valor por peça.`,
        image: "/images/carousel_folded_shirts.png", // Reused Generated
        features: [`Validade de ${LAVEXPRESS.regrasPacotes.validadeDias} dias`, "Valor por peça menor nos pacotes maiores", "Coleta e entrega: consulte as condições"],
        link: "/pacotes",
        badge: "Melhor Custo",
    },
    {
        title: "Tênis e Calçados",
        description: "Lavagem de tênis e calçados, com avaliação do material e orçamento antes de fechar.",
        image: "/images/carousel_sneakers.png", // Reused Generated
        features: ["Avaliação do material", "Orçamento antes de fechar", "Coleta e entrega: consulte as condições"],
        link: "/servicos/lavagem-de-tenis",
    },
    {
        title: "Edredons e Cobertores",
        description: "Lavagem e secagem de edredons e cobertores, peças grandes demais para a máquina de casa.",
        image: "/images/carousel_comforter.png", // Reused Generated
        features: ["Lavar e secar", "Solteiro, casal e queen/king", "Orçamento antes de fechar"],
        link: "/servicos/lavagem-de-edredons",
    },
    {
        title: "Passadoria Express",
        description: "Suas roupas passadas com perfeição. Ideal para camisas sociais e roupas de trabalho.",
        image: "/images/carousel_ironing.png", // Reused Generated
        features: ["Camisas sociais e roupas de trabalho", "Pacotes só de passar", "Coleta e entrega: consulte as condições"],
        link: "/servicos/passadoria",
    },
    {
        title: "Cortinas e Tapetes",
        description: "Lavagem de cortinas e tapetes, peças grandes e pesadas para lavar em casa.",
        image: "/images/carousel_delicate.png", // Reused Generated (Delicate Fabric)
        features: ["Cortinas a partir de R$ 60", "Tapetes sob consulta", "Orçamento antes de fechar"],
        link: "/servicos/lavagem-de-cortinas",
    },
];

export function ServicesGrid() {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden" id="servicos">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
            </div>

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-full mb-4">
                        <span className="px-3 py-1 text-xs font-bold text-blue-600 uppercase tracking-widest bg-white rounded-full border border-blue-100 shadow-sm">
                            Nossas Soluções
                        </span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900 mb-4">
                        Serviços para cada necessidade
                    </h2>
                    <p className="text-lg text-slate-600">
                        Do cesto do dia a dia aos itens mais delicados. Cuidamos de tudo com padrão Lavexpress.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {SERVICES.map((service, index) => (
                        <Card key={index} className="group overflow-hidden border-slate-200 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1 bg-white flex flex-col h-full rounded-2xl relative">
                            {/* Brand Top Bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative h-56 overflow-hidden bg-slate-100">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                {service.badge && (
                                    <Badge className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg z-20">
                                        {service.badge}
                                    </Badge>
                                )}
                                <div className="absolute bottom-4 left-4 z-20">
                                    <h3 className="text-xl font-bold text-white drop-shadow-md">{service.title}</h3>
                                </div>
                            </div>

                            <CardContent className="p-6 pt-6 flex-grow">
                                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                                    {service.description}
                                </p>
                                <ul className="space-y-3">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center text-sm text-slate-500 font-medium">
                                            <CheckCircle2 className="w-4 h-4 mr-2.5 text-emerald-500 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter className="p-6 pt-0 mt-auto">
                                <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:brightness-110 transition-all duration-300 rounded-xl h-12 font-semibold shadow-md shadow-blue-500/10">
                                    <Link href={service.link}>
                                        Ver detalhes
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
