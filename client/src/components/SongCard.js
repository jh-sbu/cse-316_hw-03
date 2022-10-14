import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

    const { song, index } = props;

    let handleDeleteSong = (event) => {
        //console.log("It gets here");
        store.markSongForDeletion(index);
    }

    let handleDoubleClick = (event) => {
        //console.log("Editing song not implemented yet");
        store.markSongForEditing(index);
    }

    let handleDragStart = (event) => {
        //console.log("Yep");
        //console.log(event);
        props.setDragStart(index);
    }

    let handleDrop = (event) => {
        //console.log(event);
        //console.log(event.target);
        let target = event.target;
        if(target.id.includes("remove") || target.id.includes("-link"))
            target = target.parentNode;
        //console.log(target);
        if(target.firstChild !== null) {
            if(target.firstChild.wholeText !== null && target.firstChild.wholeText !== "") {
                let nameId = target.firstChild.wholeText;
                let idNum = Number(nameId) - 1;
                //console.log(nameId);
                //console.log(idNum);
                if(!isNaN(idNum))
                    props.doSwap(idNum);
            }
        }
    }

    let handleDragOver = (event) => {
        event.preventDefault();
    }

    let buttonDisabled = (store.isDeleteSongOpen || store.isEditSongOpen)

    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDoubleClick={handleDoubleClick}
            draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                draggable="false"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className={buttonDisabled ? "list-card-button disabled" : "list-card-button"}
                disabled={buttonDisabled}
                value={"\u2715"}
                onClick={handleDeleteSong}
            />
        </div>
    );
}

export default SongCard;