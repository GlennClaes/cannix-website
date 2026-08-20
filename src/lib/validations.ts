import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Vul je naam in."),
  email: z.string().email("Vul een geldig e-mailadres in."),
  phone: z.string().optional(),
  eventType: z.string().min(1, "Kies een type evenement."),
  eventDate: z.string().optional(),
  location: z.string().min(2, "Vul de locatie in."),
  message: z.string().min(20, "Vertel kort wat je zoekt (min. 20 tekens)."),
});

export type ContactFormData = z.infer<typeof contactSchema>;
