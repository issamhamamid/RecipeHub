

export const Modal = ({children , dialogRef ,confirmationText, onConfirm}) => {


    return (

            <dialog className='modal with-keyframes' ref={dialogRef}>
                <div>
                    {children}
                    <div className='modal-buttons'>
                        <button  className='modal-btn default' onClick={() => dialogRef.current?.close()}>Cancel</button>
                        <button className='modal-btn confirm' onClick={onConfirm}>{confirmationText}</button>
                    </div>
                </div>
            </dialog>

    )
}