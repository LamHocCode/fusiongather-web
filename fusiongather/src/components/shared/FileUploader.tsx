"use client";

import { useCallback, Dispatch, SetStateAction } from "react";



import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {



  return (
    <div

      className="flex-center bg-gray-50 w-full flex h-64 cursor-pointer flex-col justify-center items-center overflow-hidden rounded-xl bg-grey-50"
    >
      <input  className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center">
          <Image
            src={imageUrl}
            alt="image"
            width={250}
            height={500}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      )}
    </div>
  );
}
