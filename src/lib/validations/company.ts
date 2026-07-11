import { z } from "zod";

export const companySetupSchema = z.object({
  name: z.string().min(2, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const companyProfileSchema = z.object({
  history: z.string().optional(),
  vision: z.string().optional(),
  mission: z.string().optional(),
  values: z.string().optional(),
});

export type CompanySetupInput = z.infer<typeof companySetupSchema>;
export type CompanyProfileInput = z.infer<typeof companyProfileSchema>;
