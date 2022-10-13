import './App.css';
import { React } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Banner, ListSelector, PlaylistCards, Statusbar } from './components'
//import { DeleteListModal } from './modals'
import DeleteListModal from './modals/DeleteListModal';
import DeleteSongModal from './modals/DeleteSongModal';
import EditSongModal from './modals/EditSongModal';
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
const App = () => {
    return (
        <Router>
            <Banner />
            <Switch>
                <Route path="/" exact component={ListSelector} />
                <Route path="/playlist/:id" exact component={PlaylistCards} />
            </Switch>
            <Statusbar />
            <DeleteListModal />
            <DeleteSongModal />
            <EditSongModal />
        </Router>
    )
}

export default App