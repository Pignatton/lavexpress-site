import { MetadataRoute } from "next";
import { SITE_URL as BASE_URL } from "@/lib/site-url";
import { IS_PREVIEW } from "@/lib/ambiente";

export default function robots(): MetadataRoute.Robots {
    // Prévia de teste (Vercel preview): bloqueia tudo. Produção segue igual.
    if (IS_PREVIEW) {
        return { rules: { userAgent: "*", disallow: "/" } };
    }
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/admin/"],
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
