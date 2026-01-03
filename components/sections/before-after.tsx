"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export function BeforeAfter() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback(
        (clientX: number) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
                const percentage = (x / rect.width) * 100;
                setSliderPosition(percentage);
            }
        },
        []
    );

    const handleTouchMove = useCallback(
        (e: React.TouchEvent) => {
            handleMove(e.touches[0].clientX);
        },
        [handleMove]
    );

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (isDragging) {
                handleMove(e.clientX);
            }
        },
        [isDragging, handleMove]
    );

    const handleMouseDown = useCallback(() => {
        setIsDragging(true);
    }, []);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseUp]);

    return (
        <section className="bg-slate-50 py-20 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700">
                        <Sparkles className="h-3 w-3" />
                        Resultado Real
                    </div>
                    <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
                        O milagre da <span className="text-blue-600">Lavexpress</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Arraste para ver a transformação. Cuidamos de cada detalhe.
                    </p>
                </div>

                <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl shadow-2xl ring-1 ring-slate-900/5">
                    <div
                        ref={containerRef}
                        className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden md:aspect-[16/9]"
                        onMouseMove={handleMouseMove}
                        onTouchMove={handleTouchMove}
                        onMouseDown={handleMouseDown}
                    >
                        {/* Image 2 (Clean) - Background */}
                        <div className="absolute inset-0 h-full w-full">
                            <Image
                                src="/laundry_clean_counter.png"
                                alt="Roupa Limpa"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute bottom-6 right-6 rounded-lg bg-emerald-500/90 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
                                LIMPO
                            </div>
                        </div>

                        {/* Image 1 (Dirty) - Foreground (Clipped) */}
                        <div
                            className="absolute inset-0 h-full w-full overflow-hidden"
                            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                        >
                            <Image
                                src="/laundry_dirty_counter.png"
                                alt="Roupa Suja"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute bottom-6 left-6 rounded-lg bg-slate-900/80 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
                                SUJO
                            </div>
                        </div>

                        {/* Slider Handle */}
                        <div
                            className="absolute inset-y-0 w-1 bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                            style={{ left: `${sliderPosition}%` }}
                        >
                            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-6 w-6 text-blue-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
