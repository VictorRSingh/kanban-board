"use client";

import { SetStateAction, useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
    children: React.ReactNode;
}

export default function Modal({isOpen, setIsOpen, children}: ModalProps) {
    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e:KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(true);
        };

        document.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "auto";
        };

    }, [isOpen, setIsOpen])

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2" onClick={() => setIsOpen(false)}>
            <div className="bg-white text-black w-full max-w-2xl rounded-2xl shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>, document.body
    )
}