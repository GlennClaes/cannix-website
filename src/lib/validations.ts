import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Vul je naam in.").max(100, "Naam is te lang."),
  email: z.string().trim().email("Vul een geldig e-mailadres in."),
  phone: z.string()
    .trim()
    .min(6, "Vul je telefoonnummer in.")
    .max(40, "Telefoonnummer is te lang."),
  contactReason: z.string().trim().min(1, "Kies waarvoor je contact opneemt."),
  eventType: z.string().trim().max(50).optional(),
  questionType: z.string().trim().max(50).optional(),
  collaborationType: z.string().trim().max(50).optional(),
  mediaType: z.string().trim().max(50).optional(),
  eventDate: z.string().trim().optional(),
  location: z.string().trim().min(2, "Vul de locatie in.").max(150),
  message: z.string()
    .trim()
    .min(20, "Vertel kort wat je zoekt (min. 20 tekens).")
    .max(5000, "Bericht is te lang."),
  website: z.string().optional(),
}).superRefine((data, context) => {
  const dependentFields = {
    booking: ["eventType", "Kies een type evenement."],
    question: ["questionType", "Kies het onderwerp van je vraag."],
    collaboration: ["collaborationType", "Kies het type samenwerking."],
    media: ["mediaType", "Kies het type media-aanvraag."],
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

export type ContactFormData = z.infer<typeof contactSchema>;
