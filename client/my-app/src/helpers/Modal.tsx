import React from 'react';
import styles from './modal.module.css';
import ReactDOM from 'react-dom';

interface ModalPropsOutSide {
    isOpen: boolean;
    onClose: () => void;
    children: any,
}
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: any,
    handleOverlayClick: any
}
const ModalComp: React.FC<ModalProps> = ({ isOpen, onClose, children, handleOverlayClick }) => {

    if (!isOpen) return null;
    return   <div className={styles.modalOverlay} onClick={handleOverlayClick}>
        <div className={styles.modalContent}>
            {children}
            <button onClick={onClose} className={styles.closeModal}>Закрыть</button>
        </div>
    </div>
}
const Modal: React.FC<ModalPropsOutSide> = ({ isOpen, onClose, children }) => {
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    const modalElement = document.getElementById('modal');
    return (
        <React.Fragment>
            {modalElement &&
         ReactDOM.createPortal(<ModalComp  handleOverlayClick={handleOverlayClick}
                                            onClose={onClose} isOpen={isOpen}
                                            children={children}/>,
             modalElement)
            }
     </React.Fragment>
    );
};

export default Modal;
