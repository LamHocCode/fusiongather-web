"use client";
import React, { useEffect } from "react";

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
import { useState } from "react";
import QuillText from "./QuillText";
import LocationModal from "./LocationModal";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { TfiPencilAlt } from "react-icons/tfi";
import "react-datepicker/dist/react-datepicker.css";
import { createBooth, updateBooth } from "@/lib/actions/booth";
import { BoothType } from "@/lib/type";
import { boothDefaultValues } from "@/contants";
import BoothFileUploader from "./BoothFileUploader";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

type BoothFormProps = {
  type: "Create" | "Update";
  booth?: BoothType;
  boothId?: number;
  eventId?: number;
};

export function BoothForm({ type, booth, boothId, eventId }: BoothFormProps) {
  // const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const [boothEmpty, setBoothEmpty] = useState<BoothType>({
    id: 0,
    name: "",
    description: "",
    longitude: 0,
    latitude: 0,
    imageUrl: [],
      eventId: {
        id: 0,
        title: "",
        description: "",
        location: "",
        imageUrl: [],
        startDateTime: new Date().toISOString(),
        endDateTime: new Date().toISOString(),
        price: "0",
        lng: 0,
        lat: 0,
        isFree: false,
    },
    vendorId: {
      id: 0,
      firstName: "", 
      lastName: "", 
      email: "", 
      phoneNumber: "", 
    }, 
    
  });
  const handleUpload = (imageUrl: string[]) => {
    if (booth && imageUrl.length > 0) {
      form.setValue("imageUrl", imageUrl);
    } else {
      form.setValue("imageUrl", []);
    }
    return Promise.resolve();
  };

  const setEventImageUrl = (imageUrl: string[]) => {
    setImageUrl(imageUrl);
    form.setValue("imageUrl", imageUrl);
  };

  const initialValues =
    booth && type === "Update"
      ? {
        ...booth,
        longitude: Number(booth.longitude),
        latitude: Number(booth.latitude),
        name: booth.name,
        description: booth.description,
        eventId: booth.eventId.id,
        vendorId: booth.vendorId.id,
      }
      : boothDefaultValues;

  const form = useForm<z.infer<typeof boothFormSchema>>({
    defaultValues: initialValues,
  });

  const currentCoords = [form.getValues("longitude"), form.getValues("latitude")];

  const onSubmit: SubmitHandler<z.infer<typeof boothFormSchema>> = async (
    data
  ) => {
    if (type === "Create") {
      try {
        await createBooth(eventId ?? 0, data);
        router.push(`/event/${eventId}`);
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!boothId) {
        router.back();
        return;
      }
      try {
        const updatedEvent = await updateBooth(boothId, data);
        if (updatedEvent) {
          form.reset();
          router.push(`/event/${booth?.eventId.id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  function setLocation(location: string, lng: number, lat: number) {
    form.setValue("longitude", lng);
    form.setValue("latitude", lat);
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
        <h3 className="text-secondary">Create Event</h3>
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
            <div className="flex flex-col gap-5">
              <div className="  flex flex-col gap-5 p-8 bg-white rounded-2xl">
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
                        <BoothFileUploader
                          onUpload={handleUpload}
                          endpoint="imageUploader"
                          setImageUrl={setEventImageUrl}
                          booth={booth? booth: boothEmpty}
                        />
                      </FormControl>
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
              <Button
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-full h-14 text-lg text-primary bg-white border border-[#FF8E3C] rounded-2xl hover:bg-primary/20"
              >
                Choose
              </Button>
            </div>

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
              {form.formState.isSubmitting ? "Submitting..." : `${type} Booth `}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
