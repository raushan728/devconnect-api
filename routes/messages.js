const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');
router.get('/:userId', auth, async (req, res) => {
    try {
        const currentUser = req.user.id;
        const otherUser = req.params.userId;
        const messages = await Message.find({
            $or: [
                { sender: currentUser, receiver: otherUser },
                { sender: otherUser, receiver: currentUser }
            ]
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;