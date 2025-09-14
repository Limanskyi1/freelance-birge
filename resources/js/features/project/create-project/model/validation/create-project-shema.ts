import z from "zod";

export const createProjectShema = z.object({
    price: z.number().min(1),
    terms: z.string(),
    comment: z.string(),
});