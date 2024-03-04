'use client';

import { Ticket, columns, renderCell } from "@/app/(main)/event/attendeeList/columns";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Pagination} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { getAttendeeByEventId } from "@/lib/actions/attendee";

export default function UsersTable({ticket}: {ticket: Ticket[]}) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(ticket.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return ticket.slice(start, end);
  }, [page, ticket]);

  return (
    <Table aria-label="Example table with dynamic content"
    bottomContent={
      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>
    }
    classNames={{
      wrapper: "min-h-[222px]",
    }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items} emptyContent="No attendees to display">
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>
              {renderCell(item, columnKey)}
              </TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
