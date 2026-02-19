"use client";

import { SetStateAction, useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

export default function Modal({
  title,
  isOpen,
  setIsOpen,
  children,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(true);
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 "
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white text-black w-full max-w-2xl rounded-2xl shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full justify-between items-center text-2xl font-semibold mb-2">
          <h1 className="">{title}</h1>
          <p
            className="cursor-pointer border rounded-full py-1 px-3 hover:bg-black hover:text-white transition"
            onClick={() => setIsOpen(false)}
          >
            X
          </p>
        </div>
        <div className="flex flex-col space-y-4">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
