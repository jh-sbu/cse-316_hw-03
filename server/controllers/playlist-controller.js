const Playlist = require('../models/playlist-model')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = (req, res) => {
    const body = req.body;
    console.log("createPlaylist body: " + body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    const playlist = new Playlist(body);
    console.log("playlist: " + JSON.stringify(body));
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    playlist
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                playlist: playlist,
                message: 'Playlist Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Playlist Not Created!',
            })
        })
}
deletePlaylist = async (req, res) => {
    let error = null;
    let deleteStatus = await Playlist.deleteOne({ _id: req.params.id }).catch(err => {
        //console.log(err);
        error = err;
    });

    //console.log(deleteStatus);

    if(error)
        return res.status(400).json({success: false, error: error});

    if(!deleteStatus)
        return res.status(400).json({success: false, error: "Could not delete playlist"});
    else if(deleteStatus.deletedCount !== 1)
        return res.status(400).json({success: false, error: "Could not find playlist to delete"});

    return res.status(200).json({ success: true, id: req.params.id });

    //console.log(deleteStatus);
}
getPlaylistById = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, playlist: list })
    }).catch(err => console.log(err))
}
getPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
getPlaylistPairs = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Playlists not found'})
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in playlists) {
                let list = playlists[key];
                let pair = {
                    _id : list._id,
                    name : list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

addSong = async (req, res) => {
    if(!req.body ||!req.body.id)
        return res.status(400).json({success: false, error: "You must include a valid playlist ID"});
    await Playlist.findOne({ _id: req.body.id}).exec().catch( err =>
        res.status(400).json({success: false, error: err})).then(async (list) => {
            //console.log(list);
            //console.log(req.params);
            //console.log(req.body);
            //console.log(req);
            if(!req.body || !req.body.song) {
                let newSong = {
                    title: "Untitled",
                    artist: "Unknown",
                    youTubeId: "dQw4w9WgXcQ"
                };
    
                //console.log("This one");
                if(req.body.index !== null && req.body.index >= 0 && req.body.index <= list.songs.length)
                    list.songs.splice(index, 0, newSong);
                else
                    list.songs.push(newSong);
            } else {
                if(req.body.index !== null && req.body.index >= 0 && req.body.index <= list.songs.length)
                    list.songs.splice(req.body.index, 0, req.body.song)
                else
                    list.songs.push(req.body.song);
                //console.log("Thart one");
            }

            //console.log(list);

            await Playlist.replaceOne({_id: req.body.id}, list).exec().catch(err =>
                res.status(400).json({success: false, error: err})).then(list => {
                    console.log(list);
                    return res.status(200).json({ success: true, playlist: list});
                })
        })
}

deleteSong = async (req, res) => {
    if(!req.body ||!req.body.id)
        return res.status(400).json({success: false, error: "You must include a valid playlist ID"});
    await Playlist.findOne({ _id: req.body.id}).exec().catch( err =>
        res.status(400).json({success: false, error: err})).then(async (list) => {
            //console.log(list);
            //console.log(req.params);
            //console.log(req.body);
            //console.log(req);
            if(!(req.body.song >= 0)) {
                return res.status(400).json({success: false, error: "You must provide a song index to delete"});
            } else {
                if(!(req.body.song >= 0 && req.body.song < list.songs.length)) {
                    return res.status(400).json({success: false, error: "You must provide a valid song index (index >= 0, index < songs.length)"});
                } else {
                    list.songs = list.songs.filter((e, i) => i != req.body.song);
                }
                await Playlist.replaceOne({_id: req.body.id}, list).exec().catch(err =>
                    res.status(400).json({success: false, error: err})).then(response => {
                        console.log(response);
                        return res.status(200).json({ success: true, playlist: list});
                    })
            } 
        })
}

editSong = async(req, res) => {
    if(!req.body || !req.body.id || !(req.body.songIndex >= 0) || !req.body.song) {
        console.log(req.body);
        return res.status(400).json({success: false, error: "You must include a list id, song index, and song body"});
    }
        
    await Playlist.findOne({ _id: req.body.id}).exec().catch(err => {
        return res.status(400).json({success: false, error: err});
    }).then(async (list) => {
        if(req.body.songIndex >= list.songs.length)
            return res.status(400).json({success: false, error: "Index of out bounds"});
        else {
            list.songs[req.body.songIndex] = req.body.song;
            await Playlist.replaceOne({_id: req.body.id}, list).exec().catch(err => {
                return res.status(400).json({success: false, error: err});
            }).then(response => {
                console.log(response);
                return res.status(200).json({success: true, playlist: list});
            })
        }
    })
}

swapSongs = async (req, res) => {
    if(!req.body || !(req.body.start >= 0) || !(req.body.end >= 0) || !req.body.id) {
        console.log(req.body);
        return res.status(400).json({success: false, error: "You must provide a playlist id and valid start and end indices"})
    }

    await Playlist.findOne({_id: req.body.id}).exec().catch(err => {
        return res.status(400).json({success: false, error: err});
    }).then(async (list) => {
        if(req.body.start >= list.songs.length || req.body.end >= list.songs.length) {
            return res.status(400).json({success: false, error: "Index out of bounds"});
        }
        else {
            temp = list.songs[req.body.start];
            list.songs[req.body.start] = list.songs[req.body.end];
            list.songs[req.body.end] = temp;
            await Playlist.replaceOne({_id: req.body.id}, list).exec().catch(err => {
                return res.status(400).json({success: false, error: err});
            }).then(response => {
                console.log(response);
                return res.status(200).json({success: true, playlist: list});
            })
        }
    })
}

renamePlaylist = async (req, res) => {
    if(!req.body || !req.body.id || !req.body.newName)
        return res.status(400).json({success: false, error: "You must include the playlist id and a new name"});
    await Playlist.findOne({ _id: req.body.id}).exec().catch( err => {
        return res.status(400).json({success:false, error: err});
    }).then(async (list) => {
        list.name = req.body.newName;
        await Playlist.replaceOne({_id: req.body.id}, list).exec().catch(err => {
            return res.status(400).json({success: false, error: err})
        }).then(response => {
            console.log(response);
            return res.status(200).json({success: true, playlist: list});
        })
    })
}

module.exports = {
    createPlaylist,
    deletePlaylist,
    getPlaylists,
    getPlaylistPairs,
    getPlaylistById,
    addSong,
    deleteSong,
    editSong,
    renamePlaylist,
    swapSongs
}