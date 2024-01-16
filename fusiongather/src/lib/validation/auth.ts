import { z } from "zod";

export const SignupSchema = z.object({
    firstName: z.string().min(1, 'FirstName is required!').min(2).max(30),
    lastName: z.string().min(1, 'LastName is required!').min(2).max(30),
    email: z.string().min(1, 'Email is required!').email(),
    username: z.string().min(1, 'Username is required!').min(2).max(30),
    password: z.string().min(6, 'The password must contain at least 6 characters.'),
    dob: z.string().min(8, 'Please enter DOB yyyy/mm/dd '),
    phoneNumber: z.string().regex(/^\d{10}$/, 'Invalid Number!'),
});

export const LoginSchema = z.object({
    username: z.string().min(1, 'Username is required!').min(2).max(30),
    password: z.string().min(6, 'The password must contain at least 6 characters.'),
});

export const CreateNewPasswordSchema = z.object({
    newPassword: z.string().min(1, 'Please enter your new password').min(6, 'The password must contain at least 6 characters.'),
    confirmPassword: z.string().min(1, 'Please comfirm password.')
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match!',
    path: ["confirmPassword"]
});

export const ResetPasswordSchema = z.object({
    email: z.string().min(1, 'Email is required!').email(),
});