'use client'

import { UserType } from "@/lib/type";
import UpdateProfile from "./UpdateProfile";
import Modal from "@/components/shared/Modal";
import { never } from "zod";

interface Props {
    user: UserType;
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
                <UpdateProfile user={user} setIsOpen={setIsOpen} isUpdateUser={isUpdateUser} onClose={function (): void {
                    throw new Error("Function not implemented.");
                } }/>
            </div>
        </Modal>
        
    );
}

export default UpdateProfileModal;