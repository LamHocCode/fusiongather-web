'use client'

import UpdateProfile from "./UpdateProfile";
import Modal from "@/components/shared/Modal";

interface Props {
    user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        dob: string;
    }
    isOpen?: boolean;
    onClose: () => void;
    isUpdateUser?: (userId: number) => void;
    setIsOpen: (isOpen: boolean) => void;
}

const UpdateProfileModal = ({user, isOpen, onClose, isUpdateUser, setIsOpen}: Props) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div>
                <UpdateProfile user={user} setIsOpen={setIsOpen} isUpdateUser={isUpdateUser}/>
            </div>
        </Modal>
        
    );
}

export default UpdateProfileModal;