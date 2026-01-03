"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GoogleRatingBadgeClient } from "@/components/sections/google-rating-badge-client";
import { LAVEXPRESS } from "@/lib/lavexpress";
import { MapPin } from "lucide-react";

/**
 * HERO LAVEXPRESS — Premium/Autoridade (Alta Conversão)
 * - Logo grande centralizada
 * - Headline + subheadline abaixo
 * - Prova social + SLAs + confiança
 * - Conversão via WhatsApp com mensagem pronta
 * - Verificação de área (sem bloquear CTA)
 *
 * AJUSTE RÁPIDO (1 minuto):
 * 1) Troque WHATSAPP_E164
 * 2) Ajuste os textos/SLAs se necessário
 * 3) Ajuste o caminho da logo e imagens (public/)
 */

const BRAND = {
    // Ajuste para o seu número real (E.164): +55DDDNUMERO
    WHATSAPP_E164: LAVEXPRESS.whatsappE164,

    // Ajuste o caminho da sua logo em /public
    LOGO_SRC: "/imagens/logo colorida.png",

    // Imagens do hero (ajuste para as suas em /public)
    HERO_IMAGE_MAIN: "/imagens/hero-folded-new.png",
    HERO_IMAGE_SMALL: "/imagens/hero-shirt-new.png",

    // Prova social (enquanto você não integra API do Google)
    GOOGLE_RATING: 4.7,
    GOOGLE_REVIEWS: 37,
    GOOGLE_REVIEWS_URL: "https://search.google.com/local/reviews?placeid=ChIJ_fmjZbIZuAARoxgnYCMnWrk",

    // SLAs e mensagens operacionais
    SLA_WASH_DRY: "Coleta e entrega em 24–48h",
    SLA_IRON: "Passadoria em 4–5 dias úteis",
    PAYMENT_HINT: "Pagamento facilitado",

    // Região
    AREAS: "Vitória, Serra e Vila Velha",
};

// Normaliza string (sem acentos, sem pontuação)
function normalize(str: string) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/g, "")
        .trim();
}

/**
 * Verificação simples (qualifica, não bloqueia).
 * - Vitória: sempre OK
 * - Serra: OK (sob consulta fina no WhatsApp)
 * - Vila Velha: OK (sob consulta fina no WhatsApp)
 *
 * Você pode sofisticar depois com Place/CEP, sem mudar o Hero.
 */
function checkArea(input: string): { ok: boolean; label: string } | null {
    const v = normalize(input);
    if (!v) return null;

    // Se digitarem "cep" com números, não bloqueia: apenas orienta
    const onlyDigits = v.replace(/\D/g, "");
    if (onlyDigits.length > 0 && onlyDigits.length < 8) {
        return { ok: false, label: "Digite o CEP completo (8 dígitos) ou um bairro." };
    }

    // Regras "largas" para não perder lead
    if (v.includes("vitoria") || v.includes("vitória")) {
        return { ok: true, label: "Atendimento confirmado para Vitória." };
    }
    if (v.includes("serra")) {
        return { ok: true, label: "Serra: atendimento sob confirmação rápida no WhatsApp." };
    }
    if (v.includes("vila velha") || v.includes("vilavelha")) {
        return { ok: true, label: "Vila Velha: atendimento sob confirmação rápida no WhatsApp." };
    }

    // Não trava: mantém “sob consulta”
    return { ok: true, label: "Atendimento sob consulta para sua região. Confirmamos no WhatsApp." };
}

function buildWhatsAppLink(phoneE164: string, text: string) {
    const clean = phoneE164.replace(/[^\d+]/g, "");
    const base = "https://wa.me/";
    const phone = clean.startsWith("+") ? clean.substring(1) : clean;
    return `${base}${phone}?text=${encodeURIComponent(text)}`;
}

function buildWhatsAppMessage(params: {
    name?: string;
    bairroOuCep?: string;
}) {
    const parts: string[] = [];

    parts.push("Olá! Quero agendar coleta na Lavexpress.");
    if (params.name?.trim()) parts.push(`Nome: ${params.name.trim()}`);
    if (params.bairroOuCep?.trim()) parts.push(`Região/CEP: ${params.bairroOuCep.trim()}`);

    parts.push("Serviço: Quero recomendação do melhor pacote (custo-benefício).");
    parts.push("Preferência de dia/horário: (me informe as opções disponíveis).");

    return parts.join("\n");
}

export function Hero() {
    const [name, setName] = React.useState("");
    const [area, setArea] = React.useState("");

    const areaStatus = React.useMemo(() => checkArea(area), [area]);

    const waLink = React.useMemo(() => {
        const msg = buildWhatsAppMessage({ name, bairroOuCep: area });
        return buildWhatsAppLink(BRAND.WHATSAPP_E164, msg);
    }, [name, area]);

    return (
        <section className="relative overflow-hidden">
            {/* Background premium com cores da marca */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-24 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/14 to-green-500/12 blur-3xl" />
                <div className="absolute -top-10 right-[-120px] h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute bottom-[-140px] left-[-140px] h-[520px] w-[520px] rounded-full bg-green-500/10 blur-3xl" />
            </div>

            <div className="mx-auto max-w-6xl px-4 pb-10 pt-10 md:pb-14 md:pt-14">
                <div className="grid items-start gap-10 lg:grid-cols-2">
                    {/* LEFT: Brand + copy + conversion */}
                    <div className="relative z-10">
                        {/* Logo CENTRAL e em destaque */}
                        <div className="flex flex-col items-center text-center">
                            <div className="relative">
                                <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 blur-2xl" />
                                <Image
                                    src={BRAND.LOGO_SRC}
                                    alt="Lavexpress Lavanderia"
                                    width={560}
                                    height={280}
                                    priority
                                    className="h-28 w-auto object-contain md:h-36 lg:h-40 drop-shadow-2xl"
                                />
                            </div>

                            {/* Microheadline (autoridade) */}
                            <div className="mt-5 flex flex-wrap justify-center gap-2">
                                <Badge variant="secondary" className="border border-slate-200 bg-white/70 text-slate-800 backdrop-blur">
                                    Lavanderia profissional • processo padronizado
                                </Badge>
                                <Badge variant="secondary" className="border border-slate-200 bg-white/70 text-slate-800 backdrop-blur">
                                    {BRAND.AREAS}
                                </Badge>
                            </div>

                            {/* Headline (impacto + marca) */}
                            <h1 className="mt-6 text-balance font-heading text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
                                Sua roupa{" "}
                                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                    impecável
                                </span>
                                , sem sair de casa.
                            </h1>

                            {/* Subheadline (valor real) */}
                            <p className="mt-4 max-w-xl text-pretty text-lg text-slate-600 md:text-xl">
                                Cuidado profissional de verdade, acabamento superior e prazos previsíveis.
                                Coleta e entrega agendadas para sua total comodidade.
                            </p>

                            {/* Trust row */}
                            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                                <GoogleRatingBadgeClient />

                                <Badge
                                    variant="secondary"
                                    className="border border-slate-200 bg-gradient-to-r from-blue-50 to-green-50 text-slate-800"
                                >
                                    {BRAND.SLA_WASH_DRY}
                                </Badge>

                                <Badge
                                    variant="secondary"
                                    className="border border-slate-200 bg-white/70 text-slate-800 backdrop-blur"
                                >
                                    {BRAND.SLA_IRON}
                                </Badge>
                            </div>

                            {/* Conversion Card */}
                            <Card className="mt-7 w-full max-w-xl rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.08)] backdrop-blur">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-green-600 opacity-90 text-white">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-slate-900">
                                            Verificar disponibilidade na sua região
                                        </div>
                                        <div className="mt-1 text-sm text-slate-600">
                                            Leva menos de 1 minuto • Atendimento humano no WhatsApp
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Seu nome (opcional)"
                                        className="h-11"
                                        aria-label="Seu nome"
                                    />
                                    <Input
                                        value={area}
                                        onChange={(e) => setArea(e.target.value)}
                                        placeholder="Seu bairro ou CEP"
                                        className="h-11"
                                        aria-label="Seu bairro ou CEP"
                                        inputMode="text"
                                    />
                                </div>

                                {/* Area hint (não bloqueia) */}
                                {areaStatus?.label ? (
                                    <div
                                        className={[
                                            "mt-3 rounded-lg border px-3 py-2 text-sm",
                                            areaStatus.ok
                                                ? "border-green-200 bg-green-50 text-green-800"
                                                : "border-slate-200 bg-slate-50 text-slate-700",
                                        ].join(" ")}
                                    >
                                        {areaStatus.label}
                                    </div>
                                ) : null}

                                <div className="mt-4 grid gap-2">
                                    <Button
                                        asChild
                                        className="h-12 rounded-xl bg-gradient-to-r from-blue-600 to-green-600 text-base font-semibold shadow-[0_14px_40px_rgba(11,92,255,0.22)] hover:brightness-[0.98]"
                                    >
                                        <a href={waLink} target="_blank" rel="noreferrer">
                                            Agendar minha coleta
                                        </a>
                                    </Button>

                                    <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-xs text-slate-600">
                                        <span>Sem fidelidade</span>
                                        <span>•</span>
                                        <span>{BRAND.PAYMENT_HINT}</span>
                                        <span>•</span>
                                        <span>Recomendamos o melhor pacote</span>
                                    </div>
                                </div>
                            </Card>

                            {/* Micro-autoridade (sem exagero) */}
                            <div className="mt-4 max-w-xl text-center text-xs text-slate-500">
                                Padrão Lavexpress: não é lavagem doméstica — é processo profissional, qualidade consistente e cuidado real.
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Visual premium (produto/resultado) */}
                    <div className="relative mt-12 lg:mt-0">
                        <div className="relative">
                            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-r from-blue-500/12 to-green-500/10 blur-2xl" />

                            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.10)]">
                                <Image
                                    src={BRAND.HERO_IMAGE_MAIN}
                                    alt="Roupas impecáveis com padrão Lavexpress"
                                    width={900}
                                    height={700}
                                    className="h-[420px] w-full object-cover"
                                    priority
                                />

                                {/* Selo */}
                                <div className="absolute left-6 top-6 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-900 backdrop-blur">
                                    Padrão Lavexpress
                                </div>

                                {/* Mini-card sobreposto */}
                                <div className="absolute bottom-6 left-6 flex items-end gap-4">
                                    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_40px_rgba(0,0,0,0.10)]">
                                        <Image
                                            src={BRAND.HERO_IMAGE_SMALL}
                                            alt="Cuidado e acabamento profissional"
                                            width={260}
                                            height={200}
                                            className="h-[170px] w-[220px] object-cover"
                                        />
                                    </div>

                                    <div className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 backdrop-blur">
                                        <div className="text-sm font-semibold text-slate-900">Qualidade + previsibilidade</div>
                                        <div className="mt-1 text-xs text-slate-600">
                                            Pacotes com custo-benefício e prazos claros.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SECOND VISUAL BLOCK (Sneakers & Suit) */}
                        <div className="relative mt-10">
                            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.10)]">
                                <Image
                                    src="/imagens/hero-sneakers.png"
                                    alt="Tênis limpos e renovados"
                                    width={900}
                                    height={700}
                                    className="h-[320px] w-full object-cover"
                                />

                                {/* Badge */}
                                <div className="absolute left-6 top-6 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-900 backdrop-blur">
                                    Renovamos seus Tênis
                                </div>

                                {/* Mini-card sobreposto (Suit) */}
                                <div className="absolute bottom-6 right-6 flex items-end gap-4">
                                    <div className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 backdrop-blur text-right">
                                        <div className="text-sm font-semibold text-slate-900">Limpeza Especializada</div>
                                        <div className="mt-1 text-xs text-slate-600">
                                            Ternos, vestidos e peças delicadas.
                                        </div>
                                    </div>

                                    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_40px_rgba(0,0,0,0.10)]">
                                        <Image
                                            src="/imagens/hero-suit.png"
                                            alt="Ternos e roupas sociais impecáveis"
                                            width={260}
                                            height={200}
                                            className="h-[140px] w-[180px] object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Detalhes de fundo (bolhas suaves) */}
                        <div className="pointer-events-none absolute -right-14 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-2xl" />
                        <div className="pointer-events-none absolute -left-14 bottom-0 h-44 w-44 rounded-full bg-green-500/10 blur-2xl" />
                    </div>
                </div>
            </div>
        </section >
    );
}
