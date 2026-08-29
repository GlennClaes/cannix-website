import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Vul je naam in.").max(100, "Naam is te lang."),
  email: z.string().trim().email("Vul een geldig e-mailadres in."),
  phone: z.string()
    .trim()
    .min(6, "Vul je telefoonnummer in.")
    .max(40, "Telefoonnummer is te lang."),
  eventType: z.string().trim().min(1, "Kies een type evenement.").max(50),
  eventDate: z.string().trim().optional(),
  location: z.string().trim().min(2, "Vul de locatie in.").max(150),
  message: z.string()
    .trim()
    .min(20, "Vertel kort wat je zoekt (min. 20 tekens).")
    .max(5000, "Bericht is te lang."),
  website: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
