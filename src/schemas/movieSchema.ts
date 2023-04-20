import { object, string, array, InferType, number } from "yup";

export const movieSchema = object({
  title: string().required(),
  year: number().min(1900).max(2030).required(),
  format: string().oneOf(["DVD", "VHS", "Blu-ray"]).required(),
  actors: array().of(string().required()).required(),
});

export type Movie = InferType<typeof movieSchema>;
