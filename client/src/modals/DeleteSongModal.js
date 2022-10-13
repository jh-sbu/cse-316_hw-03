import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function DeleteSongModal(props) {
    const {store} = useContext(GlobalStoreContext);

    let handleConfirm = () => {
        console.log("Confirm button not implemented yet");
        store.deleteSong(store.targetSong);
    }

    let handleCancel = () => {
        //console.log("Cancel button not implemented yet");
        store.cancelSongDeletion();
    }

    //console.log(store.isDeleteSongOpen);
    // /console.log(store);

    let modalClass = store.isDeleteSongOpen ? "modal is-visible" : "modal";

    return (
        <div 
            className={modalClass} 
            id="delete-song-modal" 
            data-animation="slideInOutLeft">
                <div className="modal-root" id='verify-delete-song-root'>
                    <div className="modal-north">
                        Remove song?
                    </div>
                    <div className="modal-center">
                        <div className="modal-center-content">
                            Are you sure you wish to remove <span>NOT IMPLEMENTED</span> from the playlist?
                        </div>
                    </div>
                    <div className="modal-south">
                        <input type="button" 
                            id="delete-song-confirm-button" 
                            className="modal-button" 
                            onClick={handleConfirm}
                            value='Confirm' />
                        <input type="button" 
                            id="delete-song-cancel-button" 
                            className="modal-button" 
                            onClick={handleCancel}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}

export default DeleteSongModal;