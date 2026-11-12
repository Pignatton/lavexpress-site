// Ambiente de execução na Vercel. "preview" = deploy de teste de um ramo (nunca a produção).
// Em produção e em desenvolvimento local, IS_PREVIEW é false e nada muda no site.
export const IS_PREVIEW = process.env.VERCEL_ENV === "preview";
