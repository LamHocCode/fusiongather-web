"use client";

import {
  Ticket,
  columns,
  renderCell,
} from "@/app/(main)/event/attendeeList/[url]/columns";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
  Tooltip,
  ModalContent,
  ModalFooter,
  ModalBody,
  Input,
  SortDescriptor,
} from "@nextui-org/react";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import { deleteAttendee, getAttendeeByEventId } from "@/lib/actions/attendee";
import { set } from "zod";
import { Modal, Button } from "@nextui-org/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { SearchIcon } from "lucide-react";
import { get } from "http";
import toast from "react-hot-toast";
import NotFoundPage from "@/components/shared/NotFoundPage";
import UnauthorizedPage from "@/components/shared/UnauthorizedPage";

interface Props {
  eventId: number;
}
export default function UsersTable({eventId }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [ticket, setTicket] = useState<Ticket[]>([]);
  const [isDelete, setIsDelete] = useState(0);
  const [deleteItem, setDeleteItem] = useState<Ticket | null>(null);
  const [filterValue, setFilterValue] = useState('')
  const [statusCode, setStatusCode] = useState(0);
  const hasSearchFilter = Boolean(filterValue)
  const rowsPerPage = 4;

  // get all attendees
  useEffect(() => {
    getAttendee();
  }, [isDelete]);

  async function getAttendee() {
    const res = await getAttendeeByEventId(eventId);
      setStatusCode(res?.statusCode);
      setTicket(res);
 
  }
  // handle delete attendee
  const handleDeleteAttendee = (item: Ticket) => {
    setDeleteItem(item);
    setShowModal(true);
  };

  // handle confirm delete
  const handleConfirmDelete = async () => {
    if (deleteItem !== null) {
    if(deleteItem.isScanned === false){
      await deleteAttendee(deleteItem.id);
      toast.success("Attendee deleted successfully");
      setIsDelete(isDelete + 1);
    }else{
      toast.error("Ticket has been scanned, cannot delete");
    }
  }
    setDeleteItem(null);
    setShowModal(false);
  };

  // filter items out based on search value
  const filterItems = useMemo(() => {
    if(ticket?.length > 0){
      let filteredTickets = [...ticket];
    // if search value is empty, return all items
    if(hasSearchFilter){
      filteredTickets = filteredTickets.filter(ticket => 
        ticket.userId.firstName.toLowerCase().includes(filterValue.toLowerCase()) ||
        ticket.userId.lastName.toLowerCase().includes(filterValue.toLowerCase()) ||
        ticket.userId.email.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredTickets;
    } else{
      return [];
    }

  }, [ticket, filterValue, hasSearchFilter]);

  // calculate the number of pages
  const pages = Math.ceil(ticket.length / rowsPerPage);

  // get the items to display on the current page
  const items: Ticket[] = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    if (filterItems.length > 0) {
      return filterItems.slice(start, end);
    }
    return [];
  }, [page, filterItems]);

  //sort descriptor state
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  }); 

  // sort attendee by name
  const sortedItems = useMemo(() => {
    return [...items].sort((a: Ticket, b: Ticket) => {
      if (typeof a === 'object' && typeof b === 'object') {
        const first = a.userId.firstName;
        const second = b.userId.firstName;
        const cmp = first.toUpperCase() < second.toUpperCase() ? -1 : first.toUpperCase() > second.toUpperCase() ? 1 : 0;
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      }
      return 0;
    })
  }, [sortDescriptor, items])

  // handle search value change
  const onSearchChange = useCallback((value?: string) => {
    if(value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, [])

  // handle clear search value
  const onClear = useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3" >
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name or email"
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    )
  }, [filterValue, onSearchChange, onClear]);
  return (
    <>
      {statusCode && statusCode === 401 ? (
          <div className="flex-1 mt-10 ml-5 flex items-center justify-center">
                <UnauthorizedPage />
          </div>
      ) : (
        <>
          {statusCode && (statusCode === 404 || statusCode === 500 || statusCode === 400) ? (
            <div className="flex-1 mt-10 ml-5 flex items-center justify-center">
                <NotFoundPage />
            </div>
          ) : (
            <>
              <Table
                aria-label="Example table with dynamic content"
                topContent={topContent}
                topContentPlacement="outside"
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
                bottomContentPlacement="outside"
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
                classNames={{
                  wrapper: "min-h-[222px]",
                }}
              >
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn
                      key={column.key}
                      {...(column.key === "name" ? { allowsSorting: true } : {})}
                    >
                      {column.label}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody items={sortedItems} emptyContent="No attendees to display">
                  {(item?) => (
                    <TableRow key={item?.id}>
                      {(columnKey) => (
                        <TableCell>
                          {item && renderCell(item, columnKey)}
                          {columnKey === "actions" && (
                            <div className="relative flex items-center gap-2">
                              <Tooltip content="Details">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                  <MdOutlineRemoveRedEye />
                                </span>
                              </Tooltip>
                              <Tooltip color="danger" content="Delete Attendee">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                  <IoTrashOutline onClick={() => item && handleDeleteAttendee(item)} />
                                </span>
                              </Tooltip>
                            </div>
                          )}
                        </TableCell>
                      )}
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
                  <ModalBody>Are you sure you want to delete this attendee?</ModalBody>
                  <ModalFooter>
                    <Button onClick={() => setShowModal(false)} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="danger" variant="light">
                      Delete
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          )}
        </>
      )}
    </>
  );
}