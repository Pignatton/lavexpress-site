"use client";

import { Award, Users, Leaf, Heart } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const STATS = [
    {
        icon: Award,
        value: 10,
        suffix: "+",
        label: "Anos de Mercado",
        description: "Experiência e tradição em cuidar das suas roupas.",
    },
    {
        icon: Users,
        value: 25,
        suffix: "mil+",
        label: "Atendimentos",
        description: "Milhares de clientes satisfeitos em toda a região ao longo da nossa história.",
    },
    {
        icon: Leaf,
        value: 100,
        suffix: "%",
        label: "Sustentável",
        description: "Processos que economizam água e produtos biodegradáveis.",
    },
    {
        icon: Heart,
        value: 4.9,
        suffix: "",
        label: "Avaliação Média",
        description: "Atendimento personalizado que conquista confiança.",
        isDecimal: true,
    },
];

function Counter({ value, duration = 2, isDecimal = false }: { value: number, duration?: number, isDecimal?: boolean }) {
    const [count, setCount] = useState(0);
    const nodeRef = useRef(null);
    const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / (duration * 1000), 1);

            // Easing function for smooth deceleration
            const easeOutQuart = 1 - Math.pow(1 - percentage, 4);

            setCount(value * easeOutQuart);

            if (percentage < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [value, duration, isInView]);

    return (
        <span ref={nodeRef}>
            {isDecimal ? count.toFixed(1) : Math.floor(count)}
        </span>
    );
}

export function StoreHighlights() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section ref={containerRef} className="relative py-24 overflow-hidden bg-gradient-to-br from-emerald-600 to-green-700 text-white">
            {/* Animated Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"
                />
                <motion.div
                    animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"
                />
            </div>

            <div className="container relative px-4 md:px-6 mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div className="text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center justify-center lg:justify-start mb-6"
                        >
                            <span className="px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-900/20 text-emerald-50 text-sm font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm">
                                Excelência Comprovada
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-white"
                        >
                            Mais que uma lavanderia, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 to-white">
                                parceiros da sua rotina.
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-emerald-50 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
                        >
                            Unimos tecnologia de ponta, responsabilidade ambiental e um atendimento humanizado para entregar o melhor resultado para você e para o planeta.
                        </motion.p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        {STATS.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                                    className="group relative p-6 bg-white/10 border border-emerald-400/20 rounded-2xl hover:bg-white/20 hover:border-emerald-300/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-900/20 backdrop-blur-sm"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-emerald-50/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <Icon className="w-6 h-6 text-emerald-100 group-hover:text-white transition-colors" />
                                        </div>

                                        <div className="text-4xl font-bold text-white mb-1 flex items-center">
                                            <Counter value={stat.value} isDecimal={stat.isDecimal} />
                                            <span className="text-emerald-200 ml-1">{stat.suffix}</span>
                                        </div>

                                        <div className="text-sm font-bold text-emerald-100 uppercase tracking-wide mb-3 opacity-90">{stat.label}</div>

                                        <p className="text-sm text-emerald-50/80 leading-relaxed group-hover:text-white transition-colors">
                                            {stat.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
