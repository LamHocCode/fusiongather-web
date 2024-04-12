"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { profileFormSchema } from "@/lib/validatior";
import { z } from "zod";
import { TfiPencilAlt } from "react-icons/tfi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/actions/profile";
import { useSession } from "next-auth/react";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { zodResolver } from '@hookform/resolvers/zod';
import toast from "react-hot-toast";
import { UserType } from "@/lib/type";

interface Props {
  user: UserType,
  isOpen?: boolean;
  onClose: () => void;
  isUpdateUser?: (userId: number) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const UpdateProfile = ({user, isOpen, onClose, isUpdateUser, setIsOpen}: Props) => {
  const router = useRouter();
  const {data: session, update} = useSession();
  const initialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    dob: user?.dob || "",
  };
  const form = useForm<z.infer<typeof profileFormSchema>>({
    defaultValues: initialValues,
    resolver: zodResolver(profileFormSchema)
  });
  const onSubmit: SubmitHandler<z.infer<typeof profileFormSchema>> = async (
    data
  ) => {
    try{
        await updateProfile(data, user?.id);       
        if (isUpdateUser) {
          isUpdateUser(user?.id);
        }
        setIsOpen(false);
        toast.success("Profile updated successfully")
    }
    catch(error){
        console.log(error)
    }
  };

  const handleCancel = () => {
    form.reset();
    setIsOpen(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="gap-8 grid grid-cols-1">
          <div className="flex flex-col gap-5 p-8 bg-white rounded-2xl">
            <div className="flex gap-2 items-center text-secondary">
              <TfiPencilAlt />
              <span>Basic Information</span>
            </div>
            <div className="flex flex-col gap-5">
              <FormField
                name="firstName"
                control={form.control}
                defaultValue={user?.firstName}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="First name"
                        {...field}
                        className="h-14 text-[18px] text-secondary rounded-2xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="lastName"
                control={form.control}
                defaultValue={user?.lastName}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Last name"
                        {...field}
                        className="h-14 text-[18px] text-secondary rounded-2xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                defaultValue={user?.email}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Email address"
                        {...field}
                        className="h-14 text-[18px] text-secondary rounded-2xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                disabled
              />
              <FormField
                name="phoneNumber"
                defaultValue={user?.phoneNumber}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Phone number"
                        {...field}
                        className="h-14 text-[18px] text-secondary rounded-2xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                disabled
              />
              <FormField
                name="dob"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                      <FormControl>
                        <div className="flex items-center w-full h-full p-2 rounded-xl border border-gray-200">
                          <FaRegCalendarAlt
                            size={24}
                            className="text-primary"
                          />
                          <DatePicker
                            selected={field.value ? new Date(field.value) : new Date(user?.dob)}
                            onChange={(date: Date) => {
                              field.onChange(date?.toISOString().split('T')[0])
                            }}
                            dateFormat="yyyy/MM/dd" 
                            placeholderText="yyyy/MM/dd"
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
            {form.formState.isSubmitting ? "Submitting..." : `Save`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateProfile;
