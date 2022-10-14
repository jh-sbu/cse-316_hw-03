import jsTPS_Transaction from "../common/jsTPS.js"
import React, { useContext, useState } from 'react'
/**
 * MoveSong_Transaction
 * 
 * This class represents a transaction that works with moving
 * a song. It will be managed by the transaction stack.
 * 
 * @author Not McKilla Gorilla
 * @author ?
 */
export default class MoveSong_Transaction extends jsTPS_Transaction {
    constructor(moveSong, start, end) {
        super();

        this.moveSong = moveSong;
        this.start = start;
        this.end = end;
    }

    doTransaction() {
        this.moveSong(this.start, this.end);
    }
    
    undoTransaction() {
        //console.log(this.store.currentList);
        this.moveSong(this.end, this.start);
    }
}