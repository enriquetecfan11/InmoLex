import type messages from "@/messages/es.json";

export type ServiceItemId = keyof typeof messages.services.items;
export type ServicePageSlug = keyof typeof messages.services.pages;
export type FormErrorKey = keyof typeof messages.forms.errors;
