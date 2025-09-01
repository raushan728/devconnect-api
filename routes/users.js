const express = require('express');
const nodemailer = require('nodemailer');
const auth = require('../middleware/auth');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }
            user = new User({
                name,
                email,
                password
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

             const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '5 days' },
                (err, token) => {
                    if (err) throw err;
                    res.status(201).json({ token });
                }
            );

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '5 days' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

router.get('/auth', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
router.put('/:id/follow', auth, async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

       
        if (req.params.id === req.user.id) {
            return res.status(400).json({ msg: "You cannot follow yourself" });
        }

        
        if (!userToFollow) {
            return res.status(404).json({ msg: "User not found" });
        }

        
        const isFollowing = currentUser.following.some(follow => follow.user.toString() === req.params.id);

        if (isFollowing) {
            currentUser.following = currentUser.following.filter(
                ({ user }) => user.toString() !== req.params.id
            );
           
            userToFollow.followers = userToFollow.followers.filter(
                ({ user }) => user.toString() !== req.user.id
            );

            await currentUser.save();
            await userToFollow.save();

            res.json({ msg: 'User Unfollowed' });
        } else {
            currentUser.following.unshift({ user: req.params.id });
            
            userToFollow.followers.unshift({ user: req.user.id });

            await currentUser.save();
            await userToFollow.save();

            res.json({ msg: 'User Followed' });
        }

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
             return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).send('Server Error');
    }
});
router.get('/:id/followers', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('followers.user', ['name', 'avatar']);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user.followers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.get('/:id/following', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('following.user', ['name', 'avatar']);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user.following);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.put('/:id/block', auth, async (req, res) => {
    try {
        const userToBlock = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        if (!userToBlock) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (currentUser.blockedUsers.some(u => u.user.toString() === req.params.id)) {
            return res.status(400).json({ msg: 'User already blocked' });
        }

        currentUser.blockedUsers.unshift({ user: req.params.id });
        await currentUser.save();
        res.json({ msg: 'User blocked' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.put('/:id/unblock', auth, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);

        if (!currentUser.blockedUsers.some(u => u.user.toString() === req.params.id)) {
            return res.status(400).json({ msg: 'User not blocked' });
        }

        currentUser.blockedUsers = currentUser.blockedUsers.filter(
            ({ user }) => user.toString() !== req.params.id
        );
        await currentUser.save();
        res.json({ msg: 'User unblocked' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.put('/settings/privacy', auth, async (req, res) => {
    const { messagePrivacy } = req.body;
    if (messagePrivacy !== 'open' && messagePrivacy !== 'mutual') {
        return res.status(400).json({ msg: 'Invalid privacy setting' });
    }
    try {
        const user = await User.findById(req.user.id);
        user.messagePrivacy = messagePrivacy;
        await user.save();
        res.json({ msg: `Message privacy set to ${messagePrivacy}`});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.put('/settings/privacy/account', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.isPrivate = !user.isPrivate;
        await user.save();
        res.json({ msg: `Account is now ${user.isPrivate ? 'Private' : 'Public'}` });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User with this email does not exist' });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetPasswordOtp = otp;
        user.resetPasswordOtpExpire = Date.now() + 3600000;
        await user.save();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset OTP for DevConnect',
            text: `Your password reset OTP is: ${otp}. It will expire in 1 hour.`
        };

        await transporter.sendMail(mailOptions);
        res.json({ msg: 'OTP has been sent to your email.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await User.findOne({ 
            email, 
            resetPasswordOtp: otp,
            resetPasswordOtpExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid OTP or OTP has expired.' });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordOtp = undefined;
        user.resetPasswordOtpExpire = undefined;
        
        await user.save();

        res.json({ msg: 'Password has been reset successfully.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;