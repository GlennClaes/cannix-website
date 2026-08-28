const defaultSiteUrl = "http://localhost:3000";

function resolveSiteUrl(): string {
    const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

    if (configuredUrl) {
        return configuredUrl.replace(/\/+$/, "");
    }

    const vercelUrl = process.env.VERCEL_URL?.trim();

    if (vercelUrl) {
        return `https://${vercelUrl}`;
    }

    return defaultSiteUrl;
}

export const siteUrl = resolveSiteUrl();
