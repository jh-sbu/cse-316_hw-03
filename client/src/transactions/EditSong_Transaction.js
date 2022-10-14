import jsTPS_Transaction from "../common/jsTPS.js"
import React, { useContext, useState } from 'react'
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works with editing
 * a song. It will be managed by the transaction stack.
 * 
 * @author Not McKilla Gorilla
 * @author ?
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(editSong, song, oldSong, index) {
        super();

        this.editSong = editSong;
        this.song = song;
        this.oldSong = oldSong;
        this.index = index;
    }

    doTransaction() {
        //console.log(this.store.currentList);
        //console.log(this.index)
        this.editSong(this.song, this.index);
    }
    
    undoTransaction() {
        //console.log(this.store.currentList);
        this.editSong(this.oldSong, this.index);
    }
}