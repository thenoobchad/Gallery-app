import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";

const f = createUploadthing();
// {
// errorFormatter: (err) => {
//   console.log("Error uploading file", err.message);
//   console.log("  - Above error caused by:", err.cause);

//   return { message: err.message };
// },
// }

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 40 },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload

      console.log("ready to upload");
      const user = await auth();

      // If you throw, the user will not be able to upload
      if (!user.userId) throw new UploadThingError("Unauthorized");
      // Whatever is returned here is accessible in onUploadComplete as `metadata`

      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log(file);

      await db.insert(images).values({
        name: file.name,
        url: file.ufsUrl,
        userId: metadata.userId,
      });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
