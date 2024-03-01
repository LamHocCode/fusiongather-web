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
import { eventFormSchema } from "@/lib/validatior";
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
import { createEvent } from "@/lib/actions/event";
import { UploadButton } from "@/lib/uploadthing";

export function EventForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentCoords, setCurrentCoords] = useState<number[]>([0, 0]); // [lng, lat]
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
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
  });

  const isFree = form.watch("isFree");

  // 2. Submit Handler
  const onSubmit: SubmitHandler<z.infer<typeof eventFormSchema>> = async (
    data
  ) => {
    try {
      await createEvent(data); // Call createEvent function with form data
      // Handle success or navigation to next step
    } catch (error) {
      // Handle error
    }
  };
  // 3. Handle search location
  function setLocation(location: string, lng: number, lat: number) {
    if (location !== "") {
      if (location !== "geolocate") {
        form.setValue("location", location);
      } else {
        form.setValue("location", "");
      }
    }
    form.setValue("lng", lng);
    form.setValue("lat", lat);
    setCurrentCoords([lng, lat]);
    console.log(form.getValues());
  }

  const handleCancel = () => {
    form.reset();
    router.push("/event");
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
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="Event title"
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
              <div className="flex flex-col gap-5 p-8 bg-white rounded-2xl">
                <div className="flex gap-2 items-center text-secondary">
                  <BiCategory size={22} />
                  <span>Category</span>
                </div>
                <div className="flex justify-between xl:flex-row lg:flex-col sm:flex-col flex-col xl:items-center w-full sm:gap-5 gap-8">
                  <FormField
                    control={form.control}
                    name="category" // Đặt tên trường là "category"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <DropDown
                            onChangeHandler={(selectedCategory) =>
                              field.onChange(selectedCategory)
                            }
                            value={field.value}
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
                  <CiImageOn size={22} />
                  <span>Media</span>
                </div>
                <div className="sm:col-span-2">
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
                </div>
              </div>
            </div>

            <div className="  flex flex-col gap-5 p-8 bg-white rounded-2xl">
              <div className="flex gap-2 items-center text-secondary">
                <RiMapPin2Line size={22} />

                <span>Location</span>
              </div>
              <FormField
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
              />
              <Button
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-full h-14 text-lg text-primary bg-white border border-[#FF8E3C] rounded-2xl hover:bg-primary/20"
              >
                Choose
              </Button>
            </div>
            <div className="  flex flex-col gap-5 p-8 bg-white rounded-2xl">
              <div className="flex gap-2 items-center text-secondary">
                <HiOutlineTicket size={22} />
                <span>Ticket</span>
              </div>
              <div className="border-b pb-5">
                <FormField
                  control={form.control}
                  name="isFree"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="text-secondary text-sm flex items-center justify-between pt-3">
                          <label
                            htmlFor="isFree"
                            className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Free Ticket
                          </label>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {isFree ? (
                <span className="text-center w-full text-xl text-secondary/50 pt-4">
                  Tickets are issued free of charge
                </span>
              ) : (
                <div>
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Price"
                            {...field}
                            className="h-14 text-[18px] text-secondary rounded-2xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            <div className=" flex flex-col gap-5 p-8 bg-white rounded-2xl">
              <div className="flex gap-2 items-center text-secondary">
                <IoIosTimer size={22} />
                <span>Time</span>
              </div>
              <div className="flex justify-between xl:flex-row lg:flex-col sm:flex-col flex-col xl:items-center w-full sm:gap-5 gap-8">
                <FormField
                  control={form.control}
                  name="startDateTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center w-full h-full p-2 rounded-xl border border-gray-200">
                          <FaRegCalendarAlt
                            size={24}
                            className="text-primary"
                          />
                          <DatePicker
                            selected={field.value}
                            onChange={(date: Date) => field.onChange(date)}
                            showTimeSelect
                            timeInputLabel="Time:"
                            dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'" // Định dạng đúng cho backend
                            isClearable={true}
                            placeholderText="Start Date"
                            wrapperClassName="datePicker"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDateTime"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <div className="flex items-center w-full h-full p-2 rounded-xl border border-gray-200">
                          <FaRegCalendarAlt
                            size={24}
                            className="text-primary"
                          />
                          <DatePicker
                            selected={field.value}
                            onChange={(date: Date) => field.onChange(date)}
                            showTimeSelect
                            timeInputLabel="Time:"
                            dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'" // Định dạng đúng cho backend
                            isClearable={true}
                            placeholderText="End Date"
                            wrapperClassName="datePicker"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
              Next
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
