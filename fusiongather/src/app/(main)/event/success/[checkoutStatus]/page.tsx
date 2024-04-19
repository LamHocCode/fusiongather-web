import { createTicketAfterSuccessfulPayment } from "@/lib/actions/payment";
import * as CryptoJS from 'crypto-js';

interface Props {
    params: {
        checkoutStatus: string;
    };
}

const SuccessPage = async ({params: {checkoutStatus}}: Props) => {
    console.log('cai dau buoi',checkoutStatus);
    const decodedString = decodeURIComponent(checkoutStatus);
    console.log(decodedString)
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
        <div>
        <h1>Success</h1>
        </div>
    );
}

export default SuccessPage;