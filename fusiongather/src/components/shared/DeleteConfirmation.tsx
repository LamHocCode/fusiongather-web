"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteEvent } from "@/lib/actions/event";
import { EventType } from "@/lib/type";
import { FaTrashAlt } from "react-icons/fa";

export const DeleteConfirmation = ({ data }: { data: EventType }) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isDeleting) {
      // Reload trang khi xóa hoàn tất
      window.location.reload();
    }
  }, [isDeleting]);

  const handleDelete = async () => {
    setIsDeleting(true);
    // Thực hiện xóa sự kiện
    await deleteEvent(data.id);
    setIsDeleting(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <FaTrashAlt
         size = {24}
        />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will permanently delete this event
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deleteEvent(data.id); // Truyền id của sự kiện cần xóa vào hàm deleteEvent
                handleDelete()
              })

            }
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
