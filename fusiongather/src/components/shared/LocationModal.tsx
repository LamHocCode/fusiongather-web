"use client"

import Modal from "./Modal";
import DisplayMap from "./displayMap";

interface Props {
    isOpen?: boolean;
    onClose: () => void;
    setLocation?: (location: string, lng: number, lat: number) => void;
    currentCoords: number[];
    status?: string;
}

const LocationModal = ({ isOpen, onClose, setLocation, currentCoords, status }: Props) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="flex flex-col gap-5 md:flex-col">
                <DisplayMap setLocation={setLocation} currentCoords={currentCoords} status={status}/>
            </div>
        </Modal>
    );
}

export default LocationModal;