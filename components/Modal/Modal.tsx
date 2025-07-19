"use client"

import React, { ReactNode, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import css from "./Modal.module.css";


interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  const router = useRouter();
  
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  }, [onClose, router]);

   useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.body.style.overflow = 'hidden'; 

    window.addEventListener('keydown', onEsc);
    return () => removeEventListener('keydown', onEsc);
   }, [handleClose]);

   return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>

    </div>
   )
};

export default Modal;