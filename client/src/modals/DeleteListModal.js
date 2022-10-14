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

    let listName = "";

    //console.log(store.idNamePairs.filter(pair => pair._id === store.targetList));

    if(store.targetList !== null) {
        let theList = store.idNamePairs.filter(pair => pair._id === store.targetList);
        theList = theList[0];
        //console.log("It gets here");
        listName = theList.name;
    }

    //console.log(listName);

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
                        Are you sure you wish to permanently delete the <span>{listName}</span> playlist?
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