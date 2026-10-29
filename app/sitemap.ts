import { MetadataRoute } from "next";
import { SERVICES_DETAILS } from "@/lib/catalogo";
import { SITE_URL as BASE_URL } from "@/lib/site-url";

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
        "/empresas",
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.7,
    }));

    return [...staticRoutes, ...services];
}
