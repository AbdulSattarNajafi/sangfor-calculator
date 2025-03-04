import { z } from "zod";

const emailSchema = z
  .string({ message: "Email is required" })
  .email("Invalid email format")
  .refine((email) => !email.endsWith("@example.com"), {
    message: "Invalid email domain",
  });

const phoneNumberSchema = z
  .string({ message: "Phone number is required" })
  .trim()
  .regex(/^(?:\+?[1-9]\d{0,3})?\s?\d{7,15}$/, "Invalid phone number");

export const contactSchema = z.object({
  firstName: z
    .string({ message: "First Name is required" })
    .min(3, { message: "First name must be at least 3 characters long." })
    .max(30, { message: "First name must not exceed 30 characters." }),
  emailAddress: emailSchema,
  businessPhone: phoneNumberSchema,
  companyName: z
    .string({ message: "Company name is required" })
    .min(2, { message: "Company name must be at least 2 characters long." }),
  jobTitle: z
    .string({ message: "Job title is required" })
    .min(2, { message: "Job title must be at least 2 characters long." }),
  countryName: z
    .string({ message: "Country is required" })
    .min(2, { message: "Country name must be at least 2 characters long." }),
  recaptcha: z
    .string({ message: "reCAPTCHA verification is required" })
    .min(1, "Please verify reCAPTCHA"),
});
