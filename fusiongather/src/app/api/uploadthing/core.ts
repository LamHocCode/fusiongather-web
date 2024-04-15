import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  // Takes a 4 2mb images and/or 1 256mb video
  imageUploader: f({
    image: { maxFileSize: "2MB", maxFileCount: 4 },

  })
    .onUploadComplete((data) => console.log("file", data)),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;