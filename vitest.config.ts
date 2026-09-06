import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const raiz = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
    resolve: {
        // Mesmo alias do tsconfig, para os testes importarem `@/lib/...`.
        alias: { "@": raiz },
    },
    test: {
        // `node` de propósito: a lógica de atribuição é pura e a camada de
        // browser é exercitada com globais explicitamente injetados, o que
        // deixa cada teste dizer exatamente qual ambiente está simulando.
        environment: "node",
        include: ["tests/**/*.test.ts"],
        coverage: {
            provider: "v8",
            include: [
                "lib/attribution.ts",
                "lib/attribution-client.ts",
                "lib/whatsapp.ts",
            ],
        },
    },
});
