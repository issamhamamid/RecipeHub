import {IoMdAdd, IoMdClose} from "react-icons/io";
import {RxHamburgerMenu} from "react-icons/rx";

export const ModalTitleWithIcon = ({children ,close}) => {
    return (
        <div>
            <div className='modal-header '>
                <h2 className='modal-title'>{children}</h2>
                <div onClick={close} className='interaction-btn'>

                    <IoMdClose className='close-btn'/>
                </div>

            </div>
            <div className="line"></div>
        </div>
    )
}