'use client';

import { Ticket, columns, renderCell } from "@/app/(main)/event/attendeeList/columns";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Pagination, Tooltip, ModalContent, ModalFooter, ModalBody} from "@nextui-org/react";
import { use, useEffect, useMemo, useState } from "react";
import { deleteAttendee, getAttendeeByEventId } from "@/lib/actions/attendee";
import { set } from "zod";
import { DeleteIcon, EditIcon, EyeIcon } from "@/app/(main)/event/attendeeList/icons";
import { Modal, Button } from '@nextui-org/react';

interface Props {
  ticket: Ticket[];
}

export default function UsersTable(){
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [ticket, setTicket] = useState<Ticket[]>([]);
  const [isDelete, setIsDelete] = useState(0);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const rowsPerPage = 4;

  useEffect(() => {
    getAttendee();
  }, [isDelete]);

  async function getAttendee() {
    const res = await getAttendeeByEventId(1);
    setTicket(res);
  }

  const handleDeleteAttendee = (id: number) => {
    setDeleteItemId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteItemId !== null) {
      await deleteAttendee(deleteItemId);
      setIsDelete(isDelete + 1);
    }
    setShowModal(false);
  };

  const pages = Math.ceil(ticket.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return ticket.slice(start, end);
  }, [page, ticket]);

  return (
    <>
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
              {columnKey === 'actions' && (
                  <div className="relative flex items-center gap-2">
                  <Tooltip content="Details">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Tooltip>                 
                  <Tooltip color="danger" content="Delete Attendee">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon onClick={() => handleDeleteAttendee(item.id)}/>
                    </span>
                  </Tooltip>
                </div>
              )}
              </TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>

    <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Confirm Delete"
      >
        <ModalContent>
          <ModalBody>
            Are you sure you want to delete this attendee?
          </ModalBody>
          <ModalFooter>
          <Button
            onClick={() => setShowModal(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="danger"
            variant="light"
          >
            Delete
          </Button>
          </ModalFooter>
        </ModalContent>        
      </Modal>
    </>
  );
}
