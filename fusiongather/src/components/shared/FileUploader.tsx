"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { BsUpload } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
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
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-gray-50 w-full flex h-64 cursor-pointer flex-col justify-center items-center overflow-hidden rounded-xl bg-grey-50"
    >
      <input {...getInputProps()} className="cursor-pointer" />

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
        // <div className="flex gap-3 items-center border border-[#FF8E3C] px-4 py-2 rounded-full text-grey-500 bg-white text-primary">
        //   <BsUpload />
        //   <h3 className="flex flex-auto justify-center items-center !important">
        //     Banner
        //   </h3>
        <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.s
              alert(`ERROR! ${error.message}`);
            }}
          />
        // </div>
      )}
    </div>
  );
}
