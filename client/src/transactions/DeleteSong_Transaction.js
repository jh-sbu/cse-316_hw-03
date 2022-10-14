import jsTPS_Transaction from "../common/jsTPS.js"
import React, { useContext, useState } from 'react'
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works with deleting
 * a song. It will be managed by the transaction stack.
 * 
 * @author Not McKilla Gorilla
 * @author ?
 */
export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(addSong, deleteSong, song, index, store) {
        super();

        this.addSong = addSong;
        this.deleteSong = deleteSong;
        this.index = index;
        this.song = song;
        this.store = store;
    }

    doTransaction() {
        //console.log(this.store.currentList);
        //this.deleteSong(this.index);
        this.store.deleteSong(this.index)
        //console.log(this.store.isDeleteSongOpen);
    }
    
    undoTransaction() {
        //console.log(this.store.currentList);
        //this.addSong(this.song, this.index);
        this.store.addSong(this.song, this.index);
        //console.log(this.store.isDeleteSongOpen);
    }
}