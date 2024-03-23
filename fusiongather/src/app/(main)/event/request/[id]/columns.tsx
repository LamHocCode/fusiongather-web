import { Chip, ChipProps, Tooltip, User } from "@nextui-org/react";
import React from "react";
import { DeleteIcon, EditIcon, EyeIcon } from "./icons";
import { Ticket } from "lucide-react";
import { RequestType } from "@/lib/type";
import Link from "next/link";

export const columns = [
  {
    key: "name",
    label: "Vendor",
  },
  {
    key: "BoothName",
    label: "Boothname",
  },
  {
    key: "Reason",
    label: "Reason",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export const renderCell = (item: RequestType, columnKey: React.Key) => {
  const cellValue = item[columnKey as keyof RequestType];

  switch (columnKey) {
    case "name":
      if (item.user) {
        return (

          <Link href={`/user/${item.userId}`}>
            <User
              avatarProps={{ radius: "lg" }}
              description={item.user.phoneNumber}
              name={item.user.firstName + " " + item.user.lastName}
            >
              {item.user.email}
            </User>
          </Link>


        );
      } else {
        return null;
      }
    case "BoothName":
      return (
        <Link href={`/event/booth/${item.booth.id}`}>
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize text-default-400">{item.booth.name}</p>
        </div>
        </Link>
      );

    case "Reason":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize text-default-400">{item.reason}</p>
        </div>
      );
    case "actions":
      return null;
    default:
      return String(cellValue);
  }
};
