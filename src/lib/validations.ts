import { z } from "zod";

export type ContactValidationMessages = {
  name: string; nameLong: string; email: string; phone: string; phoneLong: string;
  reason: string; eventType: string; questionType: string; collaborationType: string;
  mediaType: string; location: string; locationLong: string; message: string; messageLong: string;
};

export const dutchValidationMessages: ContactValidationMessages = {
  name: "Vul je naam in.", nameLong: "Naam is te lang.", email: "Vul een geldig e-mailadres in.",
  phone: "Vul je telefoonnummer in.", phoneLong: "Telefoonnummer is te lang.", reason: "Kies waarvoor je contact opneemt.",
  eventType: "Kies een type evenement.", questionType: "Kies het onderwerp van je vraag.",
  collaborationType: "Kies het type samenwerking.", mediaType: "Kies het type media-aanvraag.",
  location: "Vul de locatie in.", locationLong: "Locatie is te lang.", message: "Vertel kort wat je zoekt (min. 20 tekens).",
  messageLong: "Bericht is te lang.",
};

export const createContactSchema = (messages: ContactValidationMessages) => z.object({
  name: z.string().trim().min(2, messages.name).max(100, messages.nameLong),
  email: z.string().trim().email(messages.email),
  phone: z.string()
    .trim()
    .min(6, messages.phone)
    .max(40, messages.phoneLong),
  contactReason: z.string().trim().min(1, messages.reason),
  eventType: z.string().trim().max(50).optional(),
  questionType: z.string().trim().max(50).optional(),
  collaborationType: z.string().trim().max(50).optional(),
  mediaType: z.string().trim().max(50).optional(),
  eventDate: z.string().trim().optional(),
  location: z.string().trim().min(2, messages.location).max(150, messages.locationLong),
  message: z.string()
    .trim()
    .min(20, messages.message)
    .max(5000, messages.messageLong),
  website: z.string().optional(),
  language: z.enum(["nl", "en", "fr", "de"]).optional(),
}).superRefine((data, context) => {
  const dependentFields = {
    booking: ["eventType", messages.eventType],
    question: ["questionType", messages.questionType],
    collaboration: ["collaborationType", messages.collaborationType],
    media: ["mediaType", messages.mediaType],
  } as const;
  const [field, message] = dependentFields[data.contactReason as keyof typeof dependentFields] || [];

  if (field && !data[field]) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: [field],
      message,
    });

  }
});

export const contactSchema = createContactSchema(dutchValidationMessages);
export type ContactFormData = z.infer<typeof contactSchema>;
