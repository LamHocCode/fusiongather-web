'use client';

import { Ticket, columns } from "@/app/(main)/event/attendeeList/columns";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];


export default function UsersTable({ticket}: {ticket: Ticket[]}) {
  console.log(ticket);
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={ticket}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>
                {
                  columnKey === "isScanned" ? getKeyValue(item.isScanned, columnKey) ? "Yes" : "No" : getKeyValue(item.userId, columnKey)
                }
              </TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
