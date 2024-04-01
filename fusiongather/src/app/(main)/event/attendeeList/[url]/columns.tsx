import { Chip, ChipProps, Tooltip, User } from "@nextui-org/react";
import React from "react";
import { DeleteIcon, EditIcon, EyeIcon } from "./icons";
import { Ticket } from "lucide-react";

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
  onDataChanged: () => void;
};

export const columns = [
  {
    key: "name",
    label: "Full Name",
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
      return null;
    default:
      return String(cellValue);
  }
};
