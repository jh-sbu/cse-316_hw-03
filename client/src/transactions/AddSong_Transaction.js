import jsTPS_Transaction from "../common/jsTPS.js"
import React, { useContext, useState } from 'react'
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works with adding
 * a song. It will be managed by the transaction stack.
 * 
 * @author Not McKilla Gorilla
 * @author ?
 */
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(addSong, deleteSong, index) {
        super();

        this.addSong = addSong;
        this.deleteSong = deleteSong;
        this.index = index;
    }

    doTransaction() {
        //console.log(this.store.currentList);
        this.addSong();
    }
    
    undoTransaction() {
        //console.log(this.store.currentList);
        this.deleteSong(this.index);
    }
}