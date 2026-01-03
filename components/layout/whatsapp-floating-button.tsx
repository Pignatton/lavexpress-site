"use client";

import { LAVEXPRESS } from "@/lib/lavexpress";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import NextImage from "next/image";
import { motion } from "framer-motion";

export function WhatsAppFloatingButton() {
    const whatsappLink = buildWhatsAppLink({
        phoneE164: LAVEXPRESS.whatsappE164,
        text: "Olá! Gostaria de falar com a Lavexpress.",
    });

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
            {/* Text Bubble */}
            <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="bg-[#25D366] text-white px-4 py-2 rounded-full shadow-lg font-medium text-sm hover:brightness-105 transition-all"
            >
                Fala conosco no WhatsApp.
            </motion.a>

            {/* Icon Button */}
            <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-16 h-16 flex items-center justify-center drop-shadow-2xl"
            >
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
                    <NextImage
                        src="/imagens/lavexpress_avatar_girl.png"
                        alt="Atendente Lavexpress"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Notification Badge */}
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white z-10">
                    1
                </div>
            </motion.a>
        </div>
    );
}
