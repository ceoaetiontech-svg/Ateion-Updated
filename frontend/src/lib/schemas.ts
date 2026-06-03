import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, "Full Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  dateOfBirth: z.string().min(1, "Date of Birth is required."),
  grade: z.string().min(1, "Grade/Standard is required."),
  school: z.string().min(1, "School Name is required."),
  country: z.string().min(1, "Country is required."),
});

export const contactSchema = z.object({
  firstName: z.string().min(2, "First Name is required."),
  lastName: z.string().min(2, "Last Name is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});
