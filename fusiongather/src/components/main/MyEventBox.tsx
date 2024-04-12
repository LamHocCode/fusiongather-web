"use client";

import { formatTime } from "@/lib/Format";
import { EventType, ImageType } from "@/lib/type";
import Image from "next/image";
import { GoLocation } from "react-icons/go";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuPenLine } from "react-icons/lu";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PublishFormSchema } from "@/lib/validatior";
import { useEffect, useState } from "react";
import { getImagesByEventId } from "@/lib/actions/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DeleteConfirmation } from "../shared/DeleteConfirmation";
import { publishEvent } from "@/lib/actions/event";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { getQRCodebyEventId } from "@/lib/actions/event";
import toast from "react-hot-toast";


const MyEventBox = ({ data }: { data: EventType }) => {
  const [eventImage, setEventImage] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [eventId, setEventId] = useState<number>(0);
  const router = useRouter();
  const [isChange, setIsChange] = useState(false);
  const [qrCodeImageUrl, setQrCodeImageUrl] = useState<string>("");
  const handleClickShare = async () => {
    setShowQRModal(true);
    try {
      const url = await getQRCodebyEventId(data.id);
      if (url !== null) {
        setQrCodeImageUrl(url);
      } else {
        console.error('QR code URL is null.');
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };
  

  // useEffect(() => {
  //   setQrCodeImageUrl("");
  // }, [data]);


  const form = useForm<z.infer<typeof PublishFormSchema>>({
    resolver: zodResolver(PublishFormSchema),
    defaultValues: {
      publish: data.isPublished,
    },
  });
  const onSubmit = async (data: z.infer<typeof PublishFormSchema>) => {};

  // handle publish event confirmation
  async function handleConfirmPublishEvent() {
    if (eventId) {
      await publishEvent(eventId);
    }
    setShowModal(false);
    setEventId(0);
    toast.success("Event is published successfully!");
    // Reload page after 2 seconds
    setTimeout(() => {
      location.reload();
    }, 2000);
  }

  // handle open publish event modal
   function handlePublishEvent(eventId: number) {
    setEventId(eventId);
    setShowModal(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const image = await getImagesByEventId(data.id);
        setEventImage(image[0]?.url);
      } catch (error) {
        console.error("Error fetching follower count:", error);
      }
    };
    fetchData();
  }, [data.id]);

  useEffect(() => {
    if (isChange) {
      // Reload trang khi xóa hoàn tất
      window.location.reload();
    }
  }, [isChange]);

  const handleClick = () => {
    router.push(`/event/update/${data.id}`);
  };

  return (
    <>
    <Modal
                isOpen={showQRModal}
                onClose={() => setShowQRModal(false)}
                title="Event QR Code"
            >
                <ModalContent>
                    <ModalHeader>Event QR Code</ModalHeader>
                    <ModalBody>{qrCodeImageUrl ? (
                        <div>
                            <div className="flex items-center justify-center">
                                <Image src={qrCodeImageUrl} width="300" height="300" alt="QR code" />
                            </div>

                        </div>
                    ) : <div>This event has no QR Code</div>}</ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setShowQRModal(false)} color="primary">
                            Close
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="xl:w-full w-full md:w-[600px] max-xl:mx-auto space-y-6"
        >
          <div className="flex w-full p-4 border rounded-xl">
            <div className="w-[42%] pr-6">
              <div className="overflow-hidden  rounded-xl relative aspect-[2/1] mb-4">
                <Image
                  src={eventImage}
                  alt={`event-image`}
                  fill
                  className="w-full h-full object-fill z-20"
                />
              </div>
              <div className="pt-2 border-t">
                <FormField
                  control={form.control}
                  name="publish"
                  render={({ field }) => (
                    <FormItem className=" flex items-start gap-2">
                      <FormControl className="mt-1">
                        <Switch
                          checked={data.isPublished ? true : false}
                          onCheckedChange={data.isPublished === false ? () => handlePublishEvent(data.id): () => {}}
                        />
                      </FormControl>
                      <div className="text-sm text-primary">Publish</div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-[58%] pl-6 border-l ">
              <div className="flex flex-col gap-5 border-b pb-5">
                <Link href={`/event/${data.id}`}>
                  <div className="font-bold truncate-2-line">{data.title}</div>
                </Link>
                <div className="flex items-center gap-4">
                  <span>
                    <FaRegCalendarAlt size={20} />
                  </span>
                  <span className="text-xs">
                    {formatTime(data.startDateTime)} -{" "}
                    {formatTime(data.endDateTime)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span>
                    <GoLocation size={20} />
                  </span>
                  <span className="text-xs">{data.location}</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 pt-5 px-4 text-black">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="cursor-pointer hover:bg-secondary p-2 rounded-full">
                      <LuPenLine size={24} onClick={handleClick} />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-24">
                    <div className="text-center">Edit</div>
                  </HoverCardContent>
                </HoverCard>
                <div>
                  <div
                    className="cursor-pointer hover:bg-secondary p-2 rounded-full"
                    onClick={handleClickShare}
                  >
                    <IoShareSocialOutline size={24} />
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer hover:bg-secondary p-2 rounded-full">
                      <BsThreeDotsVertical size={24} />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40">
                    <DropdownMenuGroup>
                      <DropdownMenuSeparator />

                      <Link href={`/event/attendeeList/${data.id}`}>
                      <DropdownMenuItem>Manage Attendee</DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DeleteConfirmation data={data} />
              </div>
            </div>
          </div>
        </form>
      </Form>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Confirm Delete"
      >
        <ModalContent>
          <ModalBody>
          <div className="flex items-center mb-4">
        <div className="mr-2">
          <IoWarningOutline size={24} className="text-red-600" />
        </div>
        <p className="text-red-600 font-semibold">
          WARNING: Once you publish this event, you cannot unpublish it later.
        </p>
      </div>
      <p>Do you still want to publish this event?</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setShowModal(false)} color="primary">
              No
            </Button>
            <Button
              onClick={handleConfirmPublishEvent}
              color="success"
              variant="light"
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyEventBox;