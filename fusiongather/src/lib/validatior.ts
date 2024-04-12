import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  description: z.string().min(1, "Description is required!").max(500, "Description is too long!"),
  location: z.string().min(1, "Location is required!"),
  lng: z.number(),
  lat: z.number(),
  imageUrl: z.string().array().optional(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  price: z.string().optional().refine(price => {
    const numericPrice = Number(price);
    return numericPrice >= 0;
  }, {
    message: "Price must be a non-negative number!",
    path: ["price"]
  }),
  isFree: z.boolean(),
  categoryId: z.string().min(1, "Category is required!"),
  isPublished: z.boolean().optional(),
  author: z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    dob: z.string(),
    phoneNumber: z.string(),
    isAdmin: z.boolean().optional()
  }).optional(),
  url: z.string().optional(),
}).refine(eventFormSchema => {
  const { startDateTime, endDateTime } = eventFormSchema;
  if (startDateTime && endDateTime) {
    return new Date(startDateTime) < new Date(endDateTime);
  }
  return true;
}, {
  message: "Start date must be before end date!",
  path: ["startDateTime"]
});
export const boothFormSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  description: z.string().min(1, "Description is required!").max(500, "Description is too long!"),
  imageUrl: z.string().array().optional(),
  latitude: z.number(),
  longitude: z.number(),
  eventId: z.number().optional(),
  vendorId: z.number().optional(),
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
