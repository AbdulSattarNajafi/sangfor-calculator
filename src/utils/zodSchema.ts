import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const emailSchema = z
  .string({ message: "Email is required" })
  .email("Invalid email format")
  .refine((email) => !email.endsWith("@example.com"), {
    message: "Invalid email domain",
  });

const phoneSchema = z.string({ message: "Phone number is required" }).refine(
  (phone) => {
    const parsedPhone = parsePhoneNumberFromString(phone);
    return parsedPhone && parsedPhone.isValid();
  },
  {
    message: "Invalid phone number",
  },
);

export const contactSchema = z.object({
  firstName: z
    .string({ message: "First Name is required" })
    .min(3, { message: "First name must be at least 3 characters long." })
    .max(30, { message: "First name must not exceed 30 characters." }),
  email: emailSchema,
  phone: phoneSchema,
  company: z
    .string({ message: "Company name is required" })
    .min(2, { message: "Company name must be at least 2 characters long." }),
  jobTitle: z
    .string({ message: "Job title is required" })
    .min(2, { message: "Job title must be at least 2 characters long." }),
  country: z
    .string({ message: "Country is required" })
    .min(2, { message: "Country name must be at least 2 characters long." }),
});
