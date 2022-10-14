import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
import AddSong_Transaction from '../transactions/AddSong_Transaction';
import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction';
import EditSong_Transaction from '../transactions/EditSong_Transaction';
import MoveSong_Transaction from '../transactions/MoveSong_Transaction';
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    DELETE_LIST: "DELETE_LIST",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    CANCEL_LIST_DELETION: "CANCEL_LIST_DELETION",
    MARK_SONG_FOR_DELETION: "MARK_SONG_FOR_DELETION",
    CANCEL_SONG_DELETION: "CANCEL_SONG_DELETION",
    DELETE_SONG: "DELETE_SONG",
    MARK_SONG_FOR_EDITING: "MARK_SONG_FOR_EDITING",
    CANCEL_SONG_EDITING: "CANCEL_SONG_EDITING",
    EDIT_SONG: "EDIT_SONG"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        isDeleteSongOpen: false,
        targetSong: null,
        isDeleteListOpen: false,
        targetList: null,
        isEditSongOpen: false,
        editSong: null
    });

    const redux = (type, payload) => {
        storeReducer({type: type, payload: payload});
    }

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    ...store,
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playist,
                    listNameActive: false
                });
                /*return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });*/
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    ...store,
                    currentList: null,
                    listNameActive: false
                });
                /*return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                })*/
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    ...store,
                    currentList: payload,
                    listNameActive: false
                });
                /*return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false
                })*/
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    ...store,
                    idNamePairs: payload,
                    currentList: null,
                    listNameActive: false
                })
                /*return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });*/
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    ...store,
                    currentList: null,
                    listNameActive: false,
                    targetList: payload,
                    isDeleteListOpen: true
                });
                /*return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });*/
            }
            case GlobalStoreActionType.DELETE_LIST: {
                return setStore({
                    ...store,
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    listNameActive: false,
                    isDeleteListOpen: false,
                    targetList: null
                })
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                //console.log(payload);
                return setStore({
                    ...store,
                    currentList: payload,
                    listNameActive: false
                });
                /*return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });*/
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    ...store,
                    currentList: payload,
                    listNameActive: true
                })
            }
            case GlobalStoreActionType.CANCEL_LIST_DELETION: {
                return setStore({
                    ...store,
                    currentList: null,
                    isDeleteListOpen: false,
                    targetList: null
                })
            }
            case GlobalStoreActionType.MARK_SONG_FOR_DELETION: {
                return setStore({
                    ...store,
                    targetSong: payload,
                    isDeleteSongOpen: true
                })
            }
            case GlobalStoreActionType.CANCEL_SONG_DELETION: {
                return setStore({
                    ...store,
                    targetSong: null,
                    isDeleteSongOpen: false
                })
            }
            case GlobalStoreActionType.DELETE_SONG: {
                return setStore({
                    ...store,
                    targetSong: null,
                    isDeleteSongOpen: false,
                    currentList: payload
                })
            }
            case GlobalStoreActionType.MARK_SONG_FOR_EDITING: {
                return setStore({
                    ...store,
                    editSong: payload,
                    isEditSongOpen: true
                })
            }
            case GlobalStoreActionType.CANCEL_SONG_EDITING: {
                return setStore({
                    ...store,
                    editSong: null,
                    isEditSongOpen: false
                })
            }
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    ...store,
                    editSong: null,
                    isEditSongOpen: false,
                    currentList: payload
                })
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    store.createNewList = () => {
        let asyncCreateNewList = async () => {
            let newList = {
                name: "Untitled",
                songs: []
            };
            //console.log("Yessir");
            let response = await api.createPlaylist(newList);
            if(response.data.success) {
                let newlist = response.data.playlist
                //console.log("Test")
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: newlist
                });
                store.history.push("/playlist/" + newlist._id);
                //console.log("success!");
            }
        }

        asyncCreateNewList();
    }

    store.changeListName = async (id, newName) => {
        //console.log(id);
        //console.log(newName);
        await(api.renamePlaylist({id: id, newName: newName})).catch(err => {
            console.log(err);
        }).then(list => {
            store.loadIdNamePairs();
        });
    }

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    /*store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }*/

    store.markListForDeletion = (id) => {
        redux(GlobalStoreActionType.MARK_LIST_FOR_DELETION, id)
    }

    store.cancelListDeletion = () => {
        redux(GlobalStoreActionType.CANCEL_LIST_DELETION, {});
    }

    store.deleteList = (id) => {
        //console.log("It gets here");
        (async (id) => {
            //console.log("And also here");
            //console.log(id);
            const response = await api.deletePlaylist(id).catch(err => console.log(err));
            if(response && response.data.success) {
                //console.log("Still here");
                (async () => {
                    const pairs = await api.getPlaylistPairs();
                    if(pairs.data.success) {
                        //console.log("How about here");
                        storeReducer({
                            type: GlobalStoreActionType.DELETE_LIST,
                            payload: {
                                idNamePairs: pairs.data.idNamePairs
                            }
                        })
                    }
                })();
            }
        })(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        tps.clearAllTransactions();
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = async (id) => {
        await(api.getPlaylistById(id)).catch(err => {
            console.log(err);
        }).then(response => {
            //console.log(response);
            if(response.data.success) {
                //console.log(response.data.playlist);
                redux(GlobalStoreActionType.SET_CURRENT_LIST, response.data.playlist);
                store.history.push("/playlist/" + response.data.playlist._id);
            }
        })
    }

    /*store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    } */

    store.markSongForDeletion = (songId) => {
        //console.log("and also here");
        redux(GlobalStoreActionType.MARK_SONG_FOR_DELETION, songId);
    }

    store.cancelSongDeletion = () => {
        redux(GlobalStoreActionType.CANCEL_SONG_DELETION, {});
    }

    store.prepareForAddDeleteSongTransaction = () => {
        redux(GlobalStoreActionType.DELETE_SONG, store.currentList);
        storeReducer({
            type: GlobalStoreActionType.DELETE_SONG,
            payload: store.currentList
        })
    }

    store.addDeleteSongTransaction = (songId) => {
        //console.log(store.isDeleteSongOpen);
        
        //redux(GlobalStoreActionType.DELETE_SONG, store.currentList);

        //console.log(store.isDeleteSongOpen);

        let transaction = new DeleteSong_Transaction(store.addSong, store.deleteSong, store.currentList.songs[songId], songId, store);
        tps.addTransaction(transaction);
    }

    store.deleteSong = (songId) => {
        //console.log(songId);
        (async (songId) => {
            //console.log(store.currentList);
            await api.deleteSong({id: store.currentList._id, song: songId}).catch(err => console.log(err)).then(list => {
                //console.log("It gets here twice over");
                (async (id) => {
                    await(api.getPlaylistById(id)).catch(err => {
                        console.log(err);
                    }).then(response => {
                        if(response.data.success) {
                            //console.log("It even gets here");
                            redux(GlobalStoreActionType.DELETE_SONG, response.data.playlist);
                        }
                    })
                })(store.currentList._id);
                //store.setCurrentList(store.currentList._id);
            });
        })(songId);
    }

    store.deleteLastSong =  async () => {
        if(store.currentList !== null) {
            //console.log(store.currentList.songs.length);
            //console.log(store.currentList.songs[store.currentList.songs.length]);
            //console.log(store.currentList.songs);
            store.setCurrentList(store.currentList._id);
            //store.deleteSong(store.currentList.songs.length - 1);
        }
    }

    store.markSongForEditing = (songId) => {
        redux(GlobalStoreActionType.MARK_SONG_FOR_EDITING, songId);
    }

    store.cancelSongEditing = () => {
        redux(GlobalStoreActionType.CANCEL_SONG_EDITING, {});
    }

    store.addEditSongTransaction = (song, index) => {
        //console.log(song);
        //console.log(index);
        let transaction = new EditSong_Transaction(store.doEditSong, song, store.currentList.songs[index], index);
        tps.addTransaction(transaction);
    }

    store.doEditSong = async (song, index) => {
        //console.log(song);
        //console.log(index);
        await api.editSong({id: store.currentList._id, songIndex: index, song: song}).catch(err => {
            console.log(err)
        }).then(response => {
            if(response.data.success) {
                redux(GlobalStoreActionType.EDIT_SONG, response.data.playlist);
            }
        });
    }

    store.addMoveSongTransaction = (start, end) => {
        let transaction = new MoveSong_Transaction(store.swapSongs, start, end);
        tps.addTransaction(transaction);
    }

    store.swapSongs = async (start, end) => {
        await api.swapSongs({id: store.currentList._id, start: start, end: end}).catch(err => {
            console.log(err);
        }).then(response => {
            if(response.data.success) {
                redux(GlobalStoreActionType.SET_CURRENT_LIST, response.data.playlist);
            }
        })
    }

    store.addAddSongTransaction = () => {
        //console.log(store);
        let transaction = new AddSong_Transaction(store.addSong, store.deleteSong, store.currentList.songs.length);
        tps.addTransaction(transaction);
    }

    store.addSong = (song, index) => {
        //console.log(songId);
        (async (song) => {
            //console.log(store.currentList);
            await api.addSong({id: store.currentList._id, song: song, index: index}).catch(err => console.log(err)).then(list => {
                //console.log("It gets here twice over");
                store.setCurrentList(store.currentList._id);
            });
        })(song);
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    store.canUndo = () => {
        //console.log(tps);
        //console.log(tps.mostRecentTransaction >= 0);
        return tps.hasTransactionToUndo();
    }

    store.canRedo = () => {
        return tps.hasTransactionToRedo();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}