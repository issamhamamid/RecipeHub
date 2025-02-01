import { TailSpin } from 'react-loading-icons';

export const Modal = ({children , dialogRef ,confirmationText, onConfirm , showButtons ,className , isPending}) => {


    return (

        <dialog className={className} ref={dialogRef}>
            <div>
                {children}
                {showButtons && <div className='modal-buttons'>
                    <button className='modal-btn default' onClick={() => dialogRef.current?.close()}>Cancel</button>
                    <button className={isPending?  'pending-button modal-btn' : 'modal-btn confirm'} onClick={onConfirm}>
                            { isPending ? <TailSpin className='pending-icon'/> :  confirmationText}
                    </button>
                </div>}
                <button  className= 'invisible' ></button> {/*TO PREVENT DIALOG DEFAULT BORDER BEHAVIOUR */}
            </div>

        </dialog>

    )
}