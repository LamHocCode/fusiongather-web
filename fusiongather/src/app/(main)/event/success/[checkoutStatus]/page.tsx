import { createTicketAfterSuccessfulPayment } from "@/lib/actions/payment";
import * as CryptoJS from 'crypto-js';
import Link from 'next/link';
import { FaCheckCircle } from "react-icons/fa";

interface Props {
    params: {
        checkoutStatus: string;
    };
}

const SuccessPage = async ({params: {checkoutStatus}}: Props) => {
    const decodedString = decodeURIComponent(checkoutStatus);
    const decryptedData = CryptoJS.AES.decrypt(decodedString, process.env.STRIPE_ENCRYPT_KEY || '').toString(CryptoJS.enc.Utf8);
    console.log("decryptedData",decryptedData)
    const [eventIdStr, userIdStr] = decryptedData.split(':');
    const eventId = parseInt(eventIdStr, 10);
    const userId = parseInt(userIdStr, 10);
    console.log('eventId',eventId);
    console.log('userId',userId);
    const createTicketDto = {
        eventId: eventId,
        userId: userId,
        isScanned: false
    };
    console.log('createTicketDto',typeof createTicketDto.eventId);
    await createTicketAfterSuccessfulPayment(createTicketDto);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <FaCheckCircle className="h-12 w-12 text-green-500 mb-4" /> {/* Add the CheckCircleIcon */}
            <h1 className="text-3xl font-bold text-center mb-4">Success</h1>
            <Link href="/">
                <a className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Quay về trang chủ
                </a>
            </Link>
        </div>
    );
}

export default SuccessPage;
