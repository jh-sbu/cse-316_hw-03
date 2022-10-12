import EditToolbar from "./EditToolbar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GlobalStoreContext } from '../store/index'
import { useContext } from "react";
/*
    Our Application's Banner, note we are using function-style
    React. Our banner just has a left-aligned heading and a
    right-aligned toolbar for undo/redo and close list buttons.
    
    @author McKilla Gorilla
*/
function Banner(props) {
    const { store } = useContext(GlobalStoreContext);
    //console.log(store);
    //console.log(true ? "yes" : "no");
    return (
        <div id="playlister-banner">
            Playlister
            {store.currentList ? <EditToolbar /> : null}
        </div>
    )
}

export default Banner;