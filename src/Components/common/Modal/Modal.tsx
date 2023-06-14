import ReactDOM from 'react-dom';
import s from "./Modal.module.scss"


interface ModalType {
    title: string;
    body: string;
    button: string;
    isOpen: boolean;
    onClose: () => void;
}

const modalRoot = document.getElementById('modal-root');

export const Modal: React.FC<ModalType> = ({ title, body, button, isOpen, onClose }) => {

    const modal = (
        <div className={s.modal}>
            <div className={s.modal_container}>
                <h2>{title}</h2>
                <p>{body}</p>
                <button onClick={onClose}>{button}</button>
            </div>
        </div>
    )
    // @ts-ignore
    return isOpen ? ReactDOM.createPortal(modal, modalRoot) : null
}

export default Modal;
