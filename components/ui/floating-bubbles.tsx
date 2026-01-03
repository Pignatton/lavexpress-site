"use client";

import { useEffect, useRef } from "react";

interface Bubble {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    wobble: number;
    wobbleSpeed: number;
}

export function FloatingBubbles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size to cover viewport
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Create bubbles
        const bubbles: Bubble[] = [];
        const bubbleCount = 30; // Fixed number for testing

        for (let i = 0; i < bubbleCount; i++) {
            bubbles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 50 + 30, // 30-80px (larger for visibility)
                speed: Math.random() * 1 + 0.5, // 0.5-1.5 (faster)
                opacity: Math.random() * 0.4 + 0.3, // 0.3-0.7 (more opaque)
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: Math.random() * 0.03 + 0.01,
            });
        }

        // Animation loop
        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            bubbles.forEach((bubble) => {
                // Update position
                bubble.y -= bubble.speed;
                bubble.wobble += bubble.wobbleSpeed;
                const wobbleX = Math.sin(bubble.wobble) * 3;

                // Reset bubble when it goes off screen
                if (bubble.y + bubble.size < 0) {
                    bubble.y = canvas.height + bubble.size;
                    bubble.x = Math.random() * canvas.width;
                }

                // Draw bubble with gradient
                const gradient = ctx.createRadialGradient(
                    bubble.x + wobbleX,
                    bubble.y,
                    0,
                    bubble.x + wobbleX,
                    bubble.y,
                    bubble.size
                );

                gradient.addColorStop(0, `rgba(255, 255, 255, ${bubble.opacity})`);
                gradient.addColorStop(0.4, `rgba(200, 230, 255, ${bubble.opacity * 0.6})`);
                gradient.addColorStop(0.8, `rgba(150, 200, 255, ${bubble.opacity * 0.3})`);
                gradient.addColorStop(1, `rgba(100, 180, 255, 0)`);

                ctx.beginPath();
                ctx.arc(bubble.x + wobbleX, bubble.y, bubble.size, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Add shine/highlight
                const shineGradient = ctx.createRadialGradient(
                    bubble.x + wobbleX - bubble.size * 0.25,
                    bubble.y - bubble.size * 0.25,
                    0,
                    bubble.x + wobbleX - bubble.size * 0.25,
                    bubble.y - bubble.size * 0.25,
                    bubble.size * 0.5
                );
                shineGradient.addColorStop(0, `rgba(255, 255, 255, ${bubble.opacity * 0.9})`);
                shineGradient.addColorStop(0.5, `rgba(255, 255, 255, ${bubble.opacity * 0.3})`);
                shineGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

                ctx.beginPath();
                ctx.arc(
                    bubble.x + wobbleX - bubble.size * 0.25,
                    bubble.y - bubble.size * 0.25,
                    bubble.size * 0.4,
                    0,
                    Math.PI * 2
                );
                ctx.fillStyle = shineGradient;
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-0"
            style={{
                opacity: 0.6,
                mixBlendMode: "normal"
            }}
        />
    );
}
