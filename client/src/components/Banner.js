import EditToolbar from "./EditToolbar";
/*
    Our Application's Banner, note we are using function-style
    React. Our banner just has a left-aligned heading and a
    right-aligned toolbar for undo/redo and close list buttons.
    
    @author McKilla Gorilla
*/
function Banner(props) {
    /*const { store } = useContext(GlobalStoreContext);

    let handleCreateNewList = () => {
        store.createNewList();
    }*/

    //console.log(store);
    //console.log(true ? "yes" : "no");

    return ( 
        <div id="playlister-banner">
            Playlister
            <EditToolbar />
        </div>
    )
    /*return (
        <div id="playlister-banner">
            Playlister
            {store.currentList ? <EditToolbar /> : <input
                    type="button"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    className="playlister-button"
                    value="+" />}
        </div>
    )*/
}

export default Banner;