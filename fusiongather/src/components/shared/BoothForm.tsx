"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiImageOn } from "react-icons/ci";
import { RiMapPin2Line } from "react-icons/ri";
import { HiOutlineTicket } from "react-icons/hi";
import { IoIosTimer } from "react-icons/io";
import { Switch } from "@/components/ui/switch";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { boothFormSchema } from "@/lib/validatior";
import { z } from "zod";
import DropDown from "./DropDown";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import QuillText from "./QuillText";
import LocationModal from "./LocationModal";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { TfiPencilAlt } from "react-icons/tfi";
import "react-datepicker/dist/react-datepicker.css";
import { createBooth } from "@/lib/actions/booth";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import { getSession } from "next-auth/react";

export function BoothForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [currentCoords, setCurrentCoords] = useState<number[]>([0, 0]); // [lng, lat]
  const router = useRouter();
  // const initialValues = {
  //   title: "",
  //   description: "",
  //   category: "",
  //   location: "",
  //   lng: 0,
  //   lat: 0,
  //   imageUrl: "",
  //   startDateTime: undefined,
  //   endDateTime: undefined,
  //   price: "",
  //   isFree: false,
  //   url: "",
  // };
  // 1. Define your form.

  const form = useForm<z.infer<typeof boothFormSchema>>({
    resolver: zodResolver(boothFormSchema),
  });

  const [imageUrl, setImageUrl] = useState<string>("");

  const currentCoords = [form.getValues("longitude"), form.getValues("latitude")]

  // 2. Submit Handler
  const onSubmit: SubmitHandler<z.infer<typeof boothFormSchema>> = async (
    data
  ) => {
    try {
    const session = await getSession();
    const vendorId = session?.user?.id;
    console.log(data);
      await createBooth(data); // Call createEvent function with form data
      // Handle success or navigation to next step
    } catch (error) {
      // Handle error
    }
  };
  // 3. Handle search location
  function setLocation(location: string,  longitude: number, latitude: number) {

    form.setValue("longitude", longitude);
    form.setValue("latitude", latitude);

    // console.log(form.getValues());   
  }

  const handleCancel = () => {
    form.reset();
    router.push("/event/booth");
  };

  return (
    <>
      <LocationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setLocation={setLocation}
        currentCoords={currentCoords}
      />
      <div className="flex items-center gap-10 pt-4 pb-6">
        <div onClick={() => handleCancel()}>
          <IoIosArrowBack
            size={30}
            className="text-secondary cursor-pointer hover:text-primary"
          />
        </div>
        <h3 className="text-secondary">Create Booth</h3>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="gap-8 grid lg:grid-cols-2 grid-cols-1">
            <div className="flex flex-col gap-5 p-8 bg-white rounded-2xl">
              <div className="flex gap-2 items-center text-secondary">
                <TfiPencilAlt />
                <span>Basic Information</span>
              </div>
              <div className="flex flex-col gap-5 h-full ">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="Booth name"
                          {...field}
                          className="h-14 text-[18px] text-secondary rounded-2xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full h-full">
                      <FormControl>
                        <QuillText
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="  flex flex-col gap-5 p-8 bg-white rounded-2xl">
              <div className="flex gap-2 items-center text-secondary">
                <RiMapPin2Line size={22} />

                <span>Location</span>
              </div>
              {/* <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Location..."
                        disabled
                        value={field.value}
                        className="h-14 text-[18px] rounded-2xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
                           
              <Button
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-full h-14 text-lg text-primary bg-white border border-[#FF8E3C] rounded-2xl hover:bg-primary/20"
              >
                Choose
              </Button>
            </div>
            {/* <div className="  flex flex-col gap-5 p-8 bg-white rounded-2xl">
                <div className="flex gap-2 items-center text-secondary">
                  <CiImageOn size={22} />
                  <span>Media</span>
                </div>
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        {!field.value && ( // Only render UploadDropzone if no value is present
                          <UploadDropzone
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              // Do something with the response
                              console.log("Files: ", res[0].url);
                              alert("Upload Completed");
                              field.onChange(res[0].url); // Set imageUrl
                              setImageUrl(res[0].url)
                            }}
                            onUploadError={(error: Error) => {
                              // Do something with the error.
                              alert(`ERROR! ${error.message}`);
                            }}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                      {field.value && ( // Render image only if value is present
                        <img src={field.value} alt="Uploaded Image" />
                      )}
                    </FormItem>
                  )}
                />
              </div> */}

          </div>
          <div className="flex items-center justify-end gap-5 mt-5">
            <Button
              type="button"
              size="sm"
              disabled={form.formState.isSubmitting}
              className="rounded-full w-20 h-10 bg-white border-[#FF8E3C] border text-primary hover:bg-primary/10"
              onClick={() => handleCancel()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="rounded-full w-20 h-10 bg-white border-[#FF8E3C] border text-primary hover:bg-primary/10"
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
