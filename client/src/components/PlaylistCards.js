import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import { GlobalStoreContext } from '../store'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PlaylistCards() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    let [dragStart, setDragStart] = useState(null);

    let doSwap = (end) => {
        console.log("Drag and drop not implemented yet");
        //console.log(dragStart);
        //console.log(end);
        if(dragStart !== end) {
            store.swapSongs(dragStart, end);
        }
            //console.log("Still not implemented");
        setDragStart(null);
    }

    return (
        <div id="playlist-cards">
        {
            store.currentList.songs.map((song, index) => (
                <SongCard
                    id={'playlist-song-' + (index)}
                    key={'playlist-song-' + (index)}
                    index={index}
                    song={song}
                    setDragStart={setDragStart}
                    doSwap={doSwap}
                />
            ))
        }
        </div>
    )
}

export default PlaylistCards;