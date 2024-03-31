import z from "zod";

const signupSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast 3 characters." })
    .max(255, { message: "Name Limit Reached" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email" })
    .min(3, { message: "Email must be atleast 3 characters." })
    .max(255, { message: "Email Limit Reached" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be atleast 3 characters." })
    .max(104, { message: "Password Limit Reached" }),

  confirmPassword: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be atleast 3 characters." })
    .max(104, { message: "Password Limit Reached" }),
});

export default signupSchema;
