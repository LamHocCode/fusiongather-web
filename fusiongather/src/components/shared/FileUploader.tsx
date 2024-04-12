import React, { useEffect, useState } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EventType } from "@/lib/type";
import { getImagesByEventId } from "@/lib/actions/image";

type OnUploadFunction = (metadata: any, files: any[]) => Promise<any>;

type FileUploaderProps = {
  onUpload: OnUploadFunction;
  endpoint: keyof OurFileRouter;
  setImageUrl: (imageUrl: string[]) => void;
  event: EventType;
};

const FileUploader = ({
  onUpload,
  endpoint,
  setImageUrl,
  event,
}: FileUploaderProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const uploadedFiles = await getImagesByEventId(event.id);
        const urls = uploadedFiles.map((image: { url: any }) => image.url);
        if (uploadedFiles && uploadedFiles.length > 0) {
          setUploadedFiles(urls);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetchData();
  }, [event?.id]);

  const handleUploadComplete = (res: any) => {
    const uploadedImageUrls = res.map((uploadedFile: any) => uploadedFile.url);
    if (uploadedImageUrls.length > 0) {
      setUploadedFiles((prevUploadedFiles) => [
        ...prevUploadedFiles,
        ...uploadedImageUrls,
      ]);
      onUpload([], uploadedImageUrls)
        .then(() => {
          setImageUrl([...uploadedImageUrls]);
          toast.success("Files uploaded successfully!");
        })
        .catch((error) => {
          toast.error(`Error uploading files: ${error.message}`);
        });
    } else {
      console.warn("No images uploaded.");
    }
  };

  const handleUploadError = (error: any) => {
    toast.error(`ERROR! ${error.message}`);
  };

  const hasUploadedData = uploadedFiles.length > 0;

  const removeFile = (index: number) => {
    const newUploadedFiles = [...uploadedFiles];
    newUploadedFiles.splice(index, 1);
    setUploadedFiles(newUploadedFiles);
    onUpload([], newUploadedFiles);
  };
  return (
    <>
      <ToastContainer />
      <div>
        {!hasUploadedData && (
          <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
          />
        )}

        <div className="grid grid-cols-2 gap-2">
          {uploadedFiles.map((imageUrl, index) => (
            <div key={index} className="relative w-full h-full">
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={`Uploaded Image ${index}`}
                  width={240}
                  height={240}
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 text-red-600 hover:text-red-800"
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FileUploader;
