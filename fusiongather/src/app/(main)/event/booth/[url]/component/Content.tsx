"use client"

import { FaRegHeart } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import BoothInfo from "./BoothInfo";
import { BoothType } from '@/lib/type';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getQRCodebyBoothId } from "@/lib/actions/booth";
import Image from "next/image";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";


const Content = ({ booth, isOwner }: { booth: BoothType, isOwner: boolean }) => {
    const router = useRouter();
    const [qrCodeImageUrl, setQrCodeImageUrl] = useState<string>("");
    const [showModal, setShowModal] = useState(false);
    const handleShowQR = async () => {
        setShowModal(true);
        try {
            const url = await getQRCodebyBoothId(booth.id);
            if (url !== null) {
                setQrCodeImageUrl(url);
            } else {
                console.error('QR code URL is null.');
            }
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    }
    const handleUpdateNavigate = () => {
        router.push(`/event/booth/update/${booth.id}`);
    }
    return (
        <>
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Booth QR Code"
            >
                <ModalContent>
                    <ModalHeader>Booth QR Code</ModalHeader>
                    <ModalBody>{qrCodeImageUrl ? (
                        <div>
                            <div className="flex items-center justify-center">
                                <Image src={qrCodeImageUrl} width="300" height="300" alt="QR code" />
                            </div>

                        </div>
                    ) : <div>This booth has no QR Code</div>}</ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setShowModal(false)} color="primary">
                            Close
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>

            <div className="w-full flex items-start gap-8">
                <div className="flex-1">
                    <h3 className="text-3xl uppercase text-gray-600 leading-normal mb-6">
                        {booth.name}
                    </h3>
                    <BoothInfo booth={booth} />
                </div>
            </div>
            <div className="w-full border rounded-full flex my-8 h-[128px] cursor-pointer">
                <div className="flex items-center justify-center w-1/2 h-full ">
                    <div className="flex rounded-full h-full hover:bg-gray-100 items-center gap-2 w-full justify-center transition-all duration-400" onClick={handleShowQR}>
                        <FaRegHeart />
                        <span className="text-secondary text-sm">QR Code</span>
                    </div>
                    <div className="w-[1px] h-10 bg-secondary"></div>
                </div>
                {isOwner ?
                    <div className="flex items-center justify-center gap-2 w-1/2 rounded-full hover:bg-gray-100 transition-all duration-400" onClick={handleUpdateNavigate}>
                        <FaPencilAlt />

                        <span className="text-secondary text-sm">Edit </span>

                    </div> : null
                }
            </div>
            <span dangerouslySetInnerHTML={{ __html: booth?.description }} suppressHydrationWarning></span>
        </>
    );
}

export default Content;