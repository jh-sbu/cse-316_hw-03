import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "playlister-button";
    let disabledButtonClass = "playlister-button-disabled";

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }

    function handleAddSong() {
        store.addAddSongTransaction();
    }

    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }

    
    //console.log(addSongEnabled);
    //console.log(store.currentList);
    //console.log(store.canUndo());
    //console.log(store.tps.hasTransactionToUndo());

    let modalOpen = store.isEditSongOpen | store.isDeleteSongOpen | store.isDeleteListOpen;

    let addSongEnabled = !modalOpen && store.currentList !== null;
    let undoEnabled = !modalOpen && store.currentList !== null && store.canUndo();
    let redoEnabled = !modalOpen && store.currentList !== null && store.canRedo();
    let closeEnabled = !modalOpen && store.currentList !== null;

    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={!addSongEnabled}
                value="+"
                className={addSongEnabled ? enabledButtonClass : disabledButtonClass}
                onClick={handleAddSong}
            />
            <input
                type="button"
                id='undo-button'
                disabled={!undoEnabled}
                value="⟲"
                className={undoEnabled ? enabledButtonClass : disabledButtonClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={!redoEnabled}
                value="⟳"
                className={redoEnabled ? enabledButtonClass : disabledButtonClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={!closeEnabled}
                value="&#x2715;"
                className={closeEnabled ? enabledButtonClass : disabledButtonClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;