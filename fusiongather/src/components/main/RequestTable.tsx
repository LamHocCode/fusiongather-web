"use client";
import { useEffect, useState, useMemo } from 'react';
import { RequestType } from "@/lib/type";
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
    Modal,
    Button,
} from "@nextui-org/react";
import { getRequestByEventId, deleteRequest, assignBooth } from '@/lib/actions/booth';
import { columns, renderCell } from '@/app/(main)/event/request/[id]/columns';
import { EyeIcon, DeleteIcon } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RequestTable({ eventId }: { eventId: number }) {
    const [showModal, setShowModal] = useState(false)
    const [page, setPage] = useState(1)
    const [request, setRequest] = useState<RequestType[]>([])
    const [isDelete, setIsDelete] = useState(0)
    const [deleteBoothId, setDeleteBoothId] = useState<number | null>(null)
    const [deleteBoothUserId, setDeleteBoothUserId] = useState<number | null>(null)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [assignBoothId, setAssignBoothId] = useState<number | null>(null)
    const [assignBoothUserId, setAssignBoothUserId] = useState<number | null>(null)

    const rowsPerPage = 10;

    const showToastMessage = (type: number) => {
        if (type === 1)
        toast.success("Delete successfull !", {
            position: 'top-right',
        });
        else if (type === 2)
        toast.success("Assign booth successfull !", {
            position: 'top-right',
        });
    };

    useEffect(() => {
        getRequest();
    }, [isDelete]);

    async function getRequest() {
        const res = await getRequestByEventId(eventId)
        setRequest(res)
    }

    const handleDeleteRequest = (userId:number, boothId: number) => {
        setDeleteBoothId(boothId)
        setDeleteBoothUserId(userId)
        setShowModal(true)
    }

    const handleSetAssignBooth = async (userId: number, boothId: number) => {
        setAssignBoothId(boothId)
        setAssignBoothUserId(userId)
        setShowConfirmModal(true)
    }

    const handleConfirmDelete = async () => {
        if (deleteBoothId !== null && deleteBoothUserId !== null) {
            await deleteRequest(deleteBoothUserId ,deleteBoothId)
            setIsDelete(isDelete + 1)
            setShowModal(false)
            showToastMessage(1)
        }
        setShowModal(false)
    }

    const handleAssignBooth = async (userId: number, boothId: number) => {
        await assignBooth(boothId, userId)
        await deleteRequest(userId, boothId)
        setIsDelete(isDelete + 1)
        setShowConfirmModal(false)
        showToastMessage(2)
    }

    const pages = Math.ceil(request.length / rowsPerPage)
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        if (request.length > 0) {
            return request.slice(start, end)
        }
        return []
    }, [page, request])

    return (
        <>
        <ToastContainer />
            <Table
                aria-label="Example table with dynamic content"
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
                    {(column) => (
                        <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={items} emptyContent="No request to display">
                    {(item) => (
                        <TableRow key={item.user.id + item.booth.id}>
                            {(columnKey) => (
                                <TableCell >
                                    {renderCell(item, columnKey)}
                                    {columnKey === "actions" && (
                                        <div className="relative flex items-center gap-2">
                                            <Tooltip content = "Assign Booth">
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <EyeIcon onClick={() => handleSetAssignBooth(item.user.id, item.booth.id)}/>
                                                </span>
                                            </Tooltip>
                                            <Tooltip color="danger" content="Delete Attendee">
                                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                    <DeleteIcon
                                                        onClick={() => handleDeleteRequest(item.user.id, item.booth.id)}
                                                    />
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
                    <ModalBody>Are you sure you want to delete this request?</ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setShowModal(false)} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirmDelete}
                            color="danger"
                            variant="light"
                        >
                            Yes
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                title="Confirm Delete"
            >
                <ModalContent>
                    <ModalBody>Are you sure you want to assign booth to this user?</ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setShowModal(false)} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={() => assignBoothUserId && assignBoothId && handleAssignBooth(assignBoothUserId, assignBoothId)}
                            color="danger"
                            variant="light"
                        >
                            Assign
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

