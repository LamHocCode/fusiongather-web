import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  description: z.string().min(1, "Description is required!"),
  location: z.string().min(1, "Location is required!"),
  lng: z.number(),
  lat: z.number(),
  imageUrl: z.array(z.string()),
  startDateTime: z.date(),
  endDateTime: z.date(),
  price: z.string().nonempty().refine(price => Number(price) >= 0, {
    message: "Price must be a non-negative number!",
    path: ["price"],
  }),
  isFree: z.boolean(),
  category: z.string().min(1, "Category is required!"),
  isPublished: z.boolean(),
}).refine(eventFormSchema => {
  const { startDateTime, endDateTime } = eventFormSchema;
  if (startDateTime instanceof Date && endDateTime instanceof Date) {
    return startDateTime < endDateTime;
  }
  return true;
}, {
  message: "Start date must be before end date!",
  path: ["startDateTime"]
});

export const boothFormSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  description: z.string().min(1, "Description is required!"),
  imageUrl: z.string().array(),
  latitude: z.number(),
  longitude: z.number(),
  eventId: z.number(),
  vendorId: z.number(),
});

export const registerFormSchema = z.object({
  userId: z.number(),
  boothId: z.number(),
  reason: z.string().min(1, "Reason is required!"),
});

export const PublishFormSchema = z.object({
  publish: z.boolean(),
});
