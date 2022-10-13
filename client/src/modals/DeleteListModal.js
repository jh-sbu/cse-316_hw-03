import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function DeleteListModal(props) {
    const {store} = useContext(GlobalStoreContext);

    /*let modalClass = "modal";
    if(store.isDeleteListOpen)
        modalClass = "modal is-visible";*/

    let modalClass = store.isDeleteListOpen ? "modal is-visible" : "modal";

    let handleConfirm = () => {
        store.deleteList(store.targetList);
        //console.log("Confirm button not implemented");
    }

    let handleCancel = () => {
        store.cancelListDeletion();
        //console.log("Cancel button not implemented");
    }

    return ( 
        <div 
        className={modalClass}
        id="delete-list-modal" 
        data-animation="slideInOutLeft">
            <div className="modal-root" id='verify-delete-list-root'>
                <div className="modal-north">
                    Delete playlist?
                </div>
                <div className="modal-center">
                    <div className="modal-center-content">
                        Are you sure you wish to permanently delete the <span>test</span> playlist?
                    </div>
                </div>
                <div className="modal-south">
                    <input type="button" 
                        id="delete-list-confirm-button" 
                        className="modal-button" 
                        onClick={handleConfirm}
                        value='Confirm' />
                    <input type="button" 
                        id="delete-list-cancel-button" 
                        className="modal-button" 
                        onClick={handleCancel}
                        value='Cancel' />
                </div>
            </div>
        </div>
    );
}

export default DeleteListModal;