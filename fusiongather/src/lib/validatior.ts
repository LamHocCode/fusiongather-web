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
  category: z.string().min(1, "Category is required!"),

  // url: z.string().url(),
});

export const boothFormSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  description: z.string().min(1, "Description is required!"),
  latitude: z.number(),
  longitude: z.number(),
  eventId: z.number(),
  vendorId: z.number(),
});

export const PublishFormSchema = z.object({
  publish: z.boolean()
})