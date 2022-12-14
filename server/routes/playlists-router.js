/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()

router.post('/playlist', PlaylistController.createPlaylist)
router.get('/playlist/:id', PlaylistController.getPlaylistById)
router.get('/playlists', PlaylistController.getPlaylists)
router.get('/playlistpairs', PlaylistController.getPlaylistPairs)
router.post('/deleteplaylist/:id', PlaylistController.deletePlaylist)
router.post('/addsong', PlaylistController.addSong)
router.post('/deletesong', PlaylistController.deleteSong)
router.post('/renameplaylist', PlaylistController.renamePlaylist)
router.post('/editsong', PlaylistController.editSong)
router.post('/swapsongs', PlaylistController.swapSongs)

module.exports = router