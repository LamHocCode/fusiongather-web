import * as z from "zod";
export const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  description: z
    .string()
    .min(1, "Description is required!"),
  location: z.string().min(1, "Location is required!"),
  lng: z.number(),
  lat: z.number(),
  imageUrl: z.string().array(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  price: z.string().min(1, "Price is required!"),
  isFree: z.boolean(),
  category: z.string().min(1, "Category is required!"),
  isPublished: z.boolean(),
  // url: z.string().url(),
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
  publish: z.boolean()
})

export const profileFormSchema = z.object({
  firstName: z.string().min(1, "First Name is required!"),
  lastName: z.string().min(1, "Last Name is required!"),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  dob: z.string().min(1, "Date of Birth is required!"),
});