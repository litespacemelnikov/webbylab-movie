import { object, string, InferType } from 'yup';

export const searchSchema = object({
    search: string().min(2)
});

export type Search = InferType<typeof searchSchema>;