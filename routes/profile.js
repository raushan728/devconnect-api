const express = require('express');
const axios = require('axios');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const User = require('../models/User');
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
                                     .populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(404).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

const { check, validationResult } = require('express-validator');
router.post(
    '/',
    [
        auth,
        [   
            check('status', 'Status is required').not().isEmpty(),
            check('skills', 'Skills are required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true, upsert: true }
            );
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.get('/user/:user_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar', 'isPrivate', 'followers']);

        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }
        if (profile.user.isPrivate) {
            const isOwner = req.user.id === profile.user._id.toString();
            const isFollower = profile.user.followers.some(follower => follower.user.toString() === req.user.id);
            if (!isOwner && !isFollower) {
                return res.json({
                    _id: profile._id,
                    user: {
                        _id: profile.user._id,
                        name: profile.user.name,
                        avatar: profile.user.avatar,
                        isPrivate: profile.user.isPrivate
                    },
                    msg: "This account is private. Follow them to see their profile."
                });
            }
        }
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
             return res.status(404).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

router.put(
    '/experience',
    [
        auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('company', 'Company is required').not().isEmpty(),
            check('from', 'From date is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            if (!profile) {
                 return res.status(404).json({ msg: 'Profile not found' });
            }
            profile.experience.unshift(newExp); 

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

router.put(
    '/education',
    [
        auth,
        [
            check('school', 'School is required').not().isEmpty(),
            check('degree', 'Degree is required').not().isEmpty(),
            check('fieldofstudy', 'Field of study is required').not().isEmpty(),
            check('from', 'From date is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            if (!profile) {
                 return res.status(404).json({ msg: 'Profile not found' });
            }

            profile.education.unshift(newEdu);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }
        const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id);

        if (removeIndex === -1) {
            return res.status(404).json({ msg: 'Experience not found' });
        }
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }

        const removeIndex = profile.education
            .map(item => item.id)
            .indexOf(req.params.edu_id);

        if (removeIndex === -1) {
            return res.status(404).json({ msg: 'Education not found' });
        }

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.get('/github/:username', async (req, res) => {
    try {
        const options = {
            url: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`,
            method: 'get',
            headers: {
                'user-agent': 'node.js',
                'Authorization': `token ${process.env.GITHUB_TOKEN}`
            }
        };

        const response = await axios(options);
        res.json(response.data);

    } catch (err) {
        if (err.response && err.response.status === 404) {
            return res.status(404).json({ msg: 'No Github profile found' });
        }
        console.error('Error fetching from GitHub:', err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ msg: 'Search query is required' });
        }

        const searchQuery = new RegExp(query, 'i');
        const profiles = await Profile.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user_data'
                }
            },
            {
                $unwind: '$user_data'
            },
            {
                $match: {
                    $or: [
                        { 'skills': searchQuery },
                        { 'user_data.name': searchQuery }
                    ]
                }
            },
            {
                $project: {
                    _id: 1,
                    user: '$user_data._id',
                    company: 1,
                    website: 1,
                    location: 1,
                    status: 1,
                    skills: 1,
                    bio: 1,
                    githubusername: 1,
                    experience: 1,
                    education: 1,
                    social: 1,
                    date: 1,
                    name: '$user_data.name',
                    avatar: '$user_data.avatar'
                }
            }
        ]);
        const populatedProfiles = await User.populate(profiles, {
            path: 'user',
            select: 'name avatar'
        });

        res.json(populatedProfiles);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;