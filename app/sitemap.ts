import { MetadataRoute } from "next";
import { SERVICES_DETAILS } from "@/lib/catalogo";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://lavexpress.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
    const services = Object.keys(SERVICES_DETAILS).map((slug) => ({
        url: `${BASE_URL}/servicos/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    const staticRoutes = [
        "",
        "/sobre",
        "/contato",
        "/pacotes",
        "/agendamento",
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.7,
    }));

    return [...staticRoutes, ...services];
}
