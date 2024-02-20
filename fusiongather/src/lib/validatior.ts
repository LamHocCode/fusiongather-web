import * as z from "zod";
export const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  description: z
    .string()
    .min(1, "Description is required!"),
  location: z.string().min(1, "Location is required!"),
  lng: z.number(),
  lat: z.number(),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  price: z.string().min(1, "Price is required!"),
  isFree: z.boolean(),
  categoryId: z.string().min(1, "Category is required!"),

  // url: z.string().url(),
});

export const PublishFormSchema = z.object({
  publish: z.boolean()
})