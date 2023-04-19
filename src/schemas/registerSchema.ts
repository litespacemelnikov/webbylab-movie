import { object, string, InferType } from 'yup';

export const registerSchema = object({
    name: string().max(40).required(),
    email: string().email().required(),
    password: string().min(6).max(30).required(),
    confirmPassword: string().min(6).max(30).required(),
});

export type Register = InferType<typeof registerSchema>;