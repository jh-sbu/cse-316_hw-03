import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function EditSongModal(props) {
    /*constructor(props) {
        super(props);

        this.editInputDict = {
            "edit-song-modal-title-textfield": "title",
            "edit-song-modal-artist-textfield": "artist",
            "edit-song-modal-youTubeId-textfield": "youTubeId"};

        this.state = {
            title: "",
            artist: "",
            youTubeId: "",
            updateDone: false
        }
    }*/

    const {store} = useContext(GlobalStoreContext);

    const [songName, setSongName] = useState("");
    const [songArtist, setSongArtist] = useState("");
    const [songYouTubeId, setSongYouTubeId] = useState("");
    const [initialized, setInitialized] = useState(false);

    let editInputDict = {
        "edit-song-modal-title-textfield": setSongName,
        "edit-song-modal-artist-textfield": setSongArtist,
        "edit-song-modal-youTubeId-textfield": setSongYouTubeId
    };

    let handleCancel = () => {
        //console.log("Cancel Button not implemented yet");
        store.cancelSongEditing();
    }

    let handleConfirm = () => {
        let song = {
            "title": songName,
            "artist": songArtist,
            "youTubeId": songYouTubeId
        };

        store.doEditSong(song, store.editSong);

        //console.log("Confirm button not implemented yet");
    }

    let changeText = (event) => {
        editInputDict[event.target.id](event.target.value);
    }

    if(!initialized && store.isEditSongOpen) {
        //console.log(store.currentList);
        //console.log(store.currentList.songs);
        //console.log(store.editSong);
        let song = store.currentList.songs[store.editSong];
        //console.log(song);
        setSongName(song.title);
        setSongArtist(song.artist);
        setSongYouTubeId(song.youTubeId);
        setInitialized(true);
        //console.log(song);
    }

    if(initialized && !(store.isEditSongOpen)) {
        setInitialized(false);
    }

    /*let doEditSong = () => {
        this.props.editSongCallback(this.state.title, this.state.artist, this.state.youTubeId);
    }*/

    /*let componentDidUpdate = (prevProps, prevState, snapshot) => {
        const { songToChange } = this.props;
        if(!this.state.updateDone && songToChange !== null) {
            this.setState((prevState) => ({
                title: songToChange.title,
                artist: songToChange.artist,
                youTubeId: songToChange.youTubeId,
                updateDone: true
            }));
        } else if(this.state.updateDone && songToChange === null) {
            this.setState((prevState) => ({
                updateDone: false
            }))
        }
    }*/

    let modalClass = store.isEditSongOpen ? "modal is-visible" : "modal";

    return (
        <div 
            className={modalClass} 
            id="edit-song-modal" 
            data-animation="slideInOutLeft">
                <div className="modal-root" id='edit-song-root'>
                    <div className="modal-north">
                        Edit Song
                    </div>
                    <div className="modal-center">
                                <div id="title-prompt">Title: </div>
                                <input  type="text"
                                        id="edit-song-modal-title-textfield"
                                        value={songName}
                                        onChange={changeText}
                                        />
                                <div id="artist-prompt">Artist: </div>
                                <input  type="text"
                                        id="edit-song-modal-artist-textfield"
                                        value={songArtist}
                                        onChange={changeText}
                                        />
                                <div id="you-tube-id-prompt">YouTubeId: </div>
                                <input  type="text"
                                        id="edit-song-modal-youTubeId-textfield"
                                        value={songYouTubeId}
                                        onChange={changeText}
                                        />
                    </div>
                    <div className="modal-south">
                        <input type="button" 
                            id="edit-song-confirm-button" 
                            className="modal-button" 
                            onClick={handleConfirm}
                            value='Confirm' />
                        <input type="button" 
                            id="edit-song-cancel-button" 
                            className="modal-button" 
                            onClick={handleCancel}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}

export default EditSongModal