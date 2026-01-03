"use client";

import * as React from "react";

export function usePlanHighlight() {
    React.useEffect(() => {
        const url = new URL(window.location.href);
        const plan = url.searchParams.get("plan"); // wash-dry | wash-dry-iron | iron-only
        if (!plan) return;

        // Small delay to ensure DOM is ready if coming from a navigation
        const t0 = setTimeout(() => {
            const el = document.querySelector(`[data-plan="${plan}"]`) as HTMLElement | null;
            if (!el) return;

            // aplica highlight
            el.classList.add("lav-plan-highlight");
            el.scrollIntoView({ behavior: "smooth", block: "center" });

            // remove depois
            const t = window.setTimeout(() => {
                el.classList.remove("lav-plan-highlight");
            }, 3500);
        }, 100);

        return () => clearTimeout(t0);
    }, []);
}
