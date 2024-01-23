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
  categoryId: z.string().min(1, "Category is required!"),
  price: z.string().min(1, "Price is required!"),
  isFree: z.boolean(),
  url: z.string().url(),
});
