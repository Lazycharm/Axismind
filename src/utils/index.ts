export function createPageUrl(pageName: string) {
    return '/' + pageName.replace(/ /g, '-');
}

/** UAE business WhatsApp (digits only, no +) */
export const WHATSAPP_NUMBER = "971569520569";

export const WHATSAPP_MESSAGES = {
    audit: "Hey, I want a free audit for my business",
    heroLeads: "Hey! I want more leads for my UAE business.",
    marketing: "Hey! I want to rank higher on Google and get more qualified leads in the UAE.",
    automation: "Hey! I want to automate my business with AxisMind.",
    websiteBuild: "Hey! I want to build or fix my website with AxisMind.",
} as const;

export function openWhatsApp(text: string) {
    if (typeof window === "undefined") return;
    window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
        "_blank"
    );
}