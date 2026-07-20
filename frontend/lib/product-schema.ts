import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3),
  category: z.string().min(2),
  features: z.string().min(10),
  customer: z.string().min(3),
  keywords: z.string().optional(),
  brandVoice: z.string(),
  platforms: z.array(z.string()).min(1),
});

export type ProductFormValues = z.infer<typeof productSchema>;