"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LifeQuality() {
    return (
        <section className="relative py-24 overflow-hidden bg-slate-50">
            <div className="container px-4 md:px-6 mx-auto">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Valor Real
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            O que você faria com <br />
                            <span className="text-blue-600">16 horas livres</span> todo mês?
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Lavar roupa em casa parece barato, mas custa o seu ativo mais precioso: <strong>seu tempo</strong>.
                            Além do estresse, produtos caros e o desgaste das suas peças favoritas.
                        </p>
                    </motion.div>
                </div>

                {/* Comparison Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
                    {/* Home Laundry (Pain) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative p-8 rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden group hover:border-red-200 transition-colors"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-slate-200 group-hover:bg-red-400 transition-colors" />
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                                <XCircle className="w-6 h-6 text-slate-400 group-hover:text-red-500 transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Lavando em Casa</h3>
                        </div>

                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-slate-600">
                                <Clock className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                                <span>4 a 6 horas por semana perdidas entre separar, lavar, estender e passar.</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-600">
                                <XCircle className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                                <span>Risco de manchar, encolher ou danificar tecidos delicados.</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-600">
                                <XCircle className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                                <span>Custo oculto alto: energia, água, sabão, amaciante e manutenção da máquina.</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-600">
                                <XCircle className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                                <span>Varal ocupando espaço e &quot;poluindo&quot; visualmente sua casa.</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Lavexpress (Gain) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="relative p-8 rounded-3xl bg-white border border-blue-100 shadow-xl shadow-blue-900/5 overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500" />
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Com Lavexpress</h3>
                        </div>

                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-slate-700 font-medium">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                                <span>Zero trabalho: Buscamos e entregamos na sua porta.</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-700 font-medium">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                                <span>Roupas impecáveis: Tecnologia profissional que preserva as fibras e cores.</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-700 font-medium">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                                <span>Economia real: Processos industriais que gastam menos água e energia.</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-700 font-medium">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                                <span>Casa organizada e livre de bagunça de lavanderia.</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Button asChild size="lg" className="rounded-full px-8 h-14 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 group">
                            <Link href="/contato">
                                Quero minha liberdade de volta
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                        <p className="mt-4 text-sm text-slate-500">
                            Experimente e sinta a diferença na sua rotina.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
