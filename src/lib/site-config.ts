const defaultSiteUrl = "http://localhost:3000";
const productionSiteUrl = "https://cannix.be";

function resolveSiteUrl(): string {
    const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    const vercelEnv = process.env.VERCEL_ENV?.trim();
    const vercelUrl = process.env.VERCEL_URL?.trim();

    if (vercelEnv === "preview" && vercelUrl) {
        return `https://${vercelUrl}`;
    }

    if (configuredUrl) {
        return configuredUrl.replace(/\/+$/, "");
    }

    if (vercelEnv === "production") {
        return productionSiteUrl;
    }

    if (vercelEnv !== "production" && vercelUrl) {
        return `https://${vercelUrl}`;
    }

    return defaultSiteUrl;
}

export const siteUrl = resolveSiteUrl();
export const isProductionSite =
    process.env.VERCEL_ENV === "production" ||
    process.env.NEXT_PUBLIC_SITE_URL?.includes("cannix.be") === true;
