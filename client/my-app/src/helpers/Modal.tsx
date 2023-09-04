import React, { useState } from 'react';
import styles from './modal.module.css';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: any
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    if (!isOpen) return null;
    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
                {children}
                <button onClick={onClose} className={styles.closeModal}>Закрыть</button>
            </div>
        </div>
    );
};

export default Modal;
