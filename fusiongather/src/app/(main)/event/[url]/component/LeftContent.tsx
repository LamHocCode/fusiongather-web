"use client";

import { useEffect, useState } from 'react';
import Calendar from "@/components/main/Calendar";
import { FaRegHeart } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import BoxTicket from "./BoxTicket";
import EventInfo from "./EventInfo";
import { followEvent, countFollower, checkIsFollowed, unFollowEvent, checkIsEventOwner, getQRCodebyEventId } from "@/lib/actions/event";
import { EventType } from "@/lib/type";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface Props {
    event: EventType,
}

const LeftContent = ({ event }: Props) => {
    const [followerCount, setFollowerCount] = useState(0);
    const [isFollowed, setIsFollowed] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);
    const [qrCodeImageUrl, setQrCodeImageUrl] = useState<string>("");
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const count = await countFollower(event.id);
                setFollowerCount(count);
                const isFollowed = await checkIsFollowed(event.id);
                setIsFollowed(isFollowed);
                const owner = await checkIsEventOwner(event.author.id);
                setIsOwner(owner);
            } catch (error) {
                console.error("Error fetching follower count:", error);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [event?.id]);

    const handleShowQR = async () => {
        setShowQRModal(true);
        try {
          const url = await getQRCodebyEventId(event.id);
          if (url !== null) {
            setQrCodeImageUrl(url);
          } else {
            console.error('QR code URL is null.');
          }
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      };

    const handleFollowEvent = async () => {
        if (isOwner) {
            toast.error("You can't follow your own event");
        } else {
        try {     
            if (isFollowed) {
                await unFollowEvent(event?.id);
                setIsFollowed(false);
            } else {
                await followEvent(event?.id);
                setIsFollowed(true);
            }
            const newFollowerCount = await countFollower(event.id);
            setFollowerCount(newFollowerCount);
        } catch (error) {
            console.error("Error toggling follow status:", error);
        }
    }
    };
    return (
        <>
            <Modal
                isOpen={showQRModal}
                onClose={() => setShowQRModal(false)}
                title="Event QR Code"
            >
                <ModalContent>
                    <ModalHeader>Event QR Code</ModalHeader>
                    <ModalBody>{qrCodeImageUrl ? (
                        <div>
                            <div className="flex items-center justify-center">
                                <Image src={qrCodeImageUrl} width="300" height="300" alt="QR code" />
                            </div>

                        </div>
                    ) : <div>This event has no QR Code</div>}</ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setShowQRModal(false)} color="primary">
                            Close
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
            <div className="w-full flex items-start gap-8">
                <Calendar event={event} />
                <div className="flex-1">
                    <h3 className="text-3xl uppercase text-gray-600 leading-normal mb-6">
                        {event?.title}
                    </h3>
                    <EventInfo event={event} />
                </div>
            </div>
            <div className="w-full border rounded-full flex my-8 h-[64px] cursor-pointer">
                <div className="flex items-center justify-center w-1/2 h-full ">
                    <div className="flex rounded-full h-full hover:bg-gray-100 items-center gap-2 w-full justify-center transition-all duration-400" onClick={handleFollowEvent}>
                        {isFollowed ? <FaHeart /> : <FaRegHeart />}
                        <span className="text-secondary text-sm">{followerCount}</span>
                    </div>
                    <div className="w-[1px] h-10 bg-secondary" />
                </div>
                {isOwner ?
                    <div className="flex items-center justify-center gap-2 w-1/2 rounded-full hover:bg-gray-100 transition-all duration-400" onClick={() => router.push(`/event/request/${event.id}`)} >
                        <IoShareSocialOutline />
                        <span className="text-secondary text-sm">View request</span>
                    </div> :
                    <div className="flex items-center justify-center gap-2 w-1/2 rounded-full hover:bg-gray-100 transition-all duration-400" onClick={handleShowQR}>
                        <IoShareSocialOutline />
                        <span className="text-secondary text-sm">View QRCode</span>
                    </div>
                }
            </div>
            <div>
                <span dangerouslySetInnerHTML={{ __html: event.description }} suppressHydrationWarning></span>
            </div>
            <BoxTicket />
        </>
    );
}

export default LeftContent;
