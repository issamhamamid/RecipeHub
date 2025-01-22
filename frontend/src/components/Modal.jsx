
export const Modal = ({children , dialogRef ,confirmationText, onConfirm , showButtons ,className}) => {


    return (

        <dialog className={className} ref={dialogRef}>
            <div>
                {children}
                {showButtons && <div className='modal-buttons'>
                    <button className='modal-btn default' onClick={() => dialogRef.current?.close()}>Cancel</button>
                    <button className='modal-btn confirm' onClick={onConfirm}>{confirmationText}</button>
                </div>}
                <button className='invisible' ></button> {/*TO PREVENT DIALOG DEFAULT BORDER BEHAVIOUR */}
            </div>

        </dialog>

    )
}