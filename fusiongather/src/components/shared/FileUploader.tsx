// "use client";

// import { useCallback, Dispatch, SetStateAction } from "react";
// import type { FileWithPath } from "@uploadthing/react";
// import { useDropzone } from "@uploadthing/react/hooks";
// import { generateClientDropzoneAccept } from "uploadthing/client";

// import { convertFileToUrl } from "@/lib/utils";
// import Image from "next/image";
// import { UploadButton } from "@/lib/uploadthing";

// type FileUploaderProps = {
//   onFieldChange: (url: string) => void;
//   imageUrl: string;
//   setFiles: Dispatch<SetStateAction<File[]>>;
// };

// export function FileUploader({
//   imageUrl,
//   onFieldChange,
//   setFiles,
// }: FileUploaderProps) {
//   const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
//     setFiles(acceptedFiles);
//     onFieldChange(convertFileToUrl(acceptedFiles[0]));
//   }, []);

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
//   });

//   return (
//     <div
//       {...getRootProps()}
//       className="flex-center bg-gray-50 w-full flex h-64 cursor-pointer flex-col justify-center items-center overflow-hidden rounded-xl bg-grey-50"
//     >
//       <input {...getInputProps()} className="cursor-pointer" />

//       {imageUrl ? (
//         <div className="flex h-full w-full flex-1 justify-center">
//           <Image
//             src={imageUrl}
//             alt="image"
//             width={250}
//             height={500}
//             className="w-full object-cover object-center"
//           />
//         </div>
//       ) : (
//         <UploadButton
//           endpoint="imageUploader"
//           onClientUploadComplete={(res) => {
//             // Do something with the response
//             console.log("Files: ", res);
//             alert("Upload Completed");
//           }}
//           onUploadError={(error: Error) => {
//             // Do something with the error.
//             alert(`ERROR! ${error.message}`);
//           }}
//         />
//       )}
//     </div>
//   );
// }

import React from 'react'

export default function FileUploader() {
  return (
    <div>FileUploader</div>
  )
}

