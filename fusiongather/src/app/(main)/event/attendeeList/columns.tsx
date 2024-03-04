import { Chip, ChipProps, Tooltip, User } from "@nextui-org/react";
import React from "react";
import { DeleteIcon, EditIcon, EyeIcon } from "./icons";
import { Ticket } from "lucide-react";
import { deleteAttendee } from "@/lib/actions/attendee";

export type Ticket = {
  id: number;
  isScanned: boolean;
  userId: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
};

export const columns = [
  {
    key: "name",
    label: "First Name",
  },
  {
    key: "isScanned",
    label: "Scanned",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  Yes: "success",
  No: "danger",
};


export const renderCell = (item: Ticket, columnKey: React.Key) => {
  const cellValue = item[columnKey as keyof Ticket];

  switch (columnKey) {
    case "name":
      if (item.userId) {
        return (
          <User
            avatarProps={{ radius: "lg" }}
            description={item.userId.phoneNumber}
            name={item.userId.firstName + " " + item.userId.lastName}
          >
            {item.userId.email}
          </User>
        );
      } else {
        return null; // Hoặc một phần tử React khác phù hợp
      }
    case "isScanned":
      return (
        <Chip
          className="capitalize"
          color={statusColorMap[item.isScanned ? "Yes" : "No"]}
          size="sm"
          variant="flat"
        >
          {item.isScanned ? "Yes" : "No"}
        </Chip>
      );
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Details">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip content="Edit Attendee">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete Attendee">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon onClick={
                async () => {
                  await deleteAttendee(item.id);
                }
              }/>
            </span>
          </Tooltip>
        </div>
      );
    default:
      return String(cellValue);
  }
};
