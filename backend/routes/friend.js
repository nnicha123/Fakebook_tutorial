const express = require('express')
const router = express.Router()
const passport = require('passport')
const { denyFriendRequest, deleteFriend, acceptFriendRequest, sendRequestFriend,getRelationship } = require('../controllers/friend')


const auth = passport.authenticate('jwt', { session: false })

router.get('/requests/:id',auth,getRelationship)
router.post('/requests/:id', auth, sendRequestFriend)
router.delete('/requests/:id', auth, denyFriendRequest)
router.put('/requests/:id', auth, acceptFriendRequest)
router.delete('/:id', auth, deleteFriend)

module.exports = router