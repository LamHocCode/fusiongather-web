"use client"

import Modal from "./Modal";
import DisplayMap from "./displayMap";

interface Props {
    isOpen?: boolean;
    onClose: () => void;
    setLocation: (location: string, lng: number, lat: number) => void
}

const LocationModal = ({ isOpen, onClose, setLocation }: Props) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="flex flex-col gap-5 md:flex-col">
                <DisplayMap setLocation={setLocation} />
            </div>
        </Modal>
    );
}

export default LocationModal;