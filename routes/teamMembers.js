// backend/routes/teamMembers.js
const express = require('express');
const router = express.Router();
const TeamMembers = require('../models/TeamMember');
const { isAdmin } = require('../middleware/auth');
const upload = require('../middleware/uploadMiddleware');
const cloudinary = require('cloudinary').v2;

// GET all members
router.get('/', async (req, res) => {
    try {
        const teamMembers = await TeamMembers.find();
        if (teamMembers.length === 0) {
            return res.status(404).json({ message: "No data found" });
        }
        res.json(teamMembers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch members", error: err.message });
    }
});

// POST - Add member
router.post('/', isAdmin, upload.single('image'), async (req, res) => {
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).json({ error: 'Image not uploaded' });
        }

        const { name, title } = req.body;
        const imageUrl = req.file.path;
        const imagePublicId = req.file.filename || req.file.public_id;

        const newTeamMember = new TeamMembers({ name, title, imageUrl, imagePublicId });
        await newTeamMember.save();
        res.status(201).json({ message: "Member created", member: newTeamMember });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create member", error: err.message });
    }
});

// PUT - Update member
router.put('/:id', isAdmin, upload.single('image'), async (req, res) => {
    try {
        const { name, title } = req.body;
        const member = await TeamMembers.findById(req.params.id);
        if (!member) return res.status(404).json({ message: 'Member not found' });

        let imageUrl = member.imageUrl;
        let imagePublicId = member.imagePublicId;

        if (req.file) {
            if (imagePublicId) {
                await cloudinary.uploader.destroy(imagePublicId);
            }
            imageUrl = req.file.path;
            imagePublicId = req.file.filename || req.file.public_id;
        }

        const updated = await TeamMembers.findByIdAndUpdate(
            req.params.id,
            { name, title, imageUrl, imagePublicId },
            { new: true }
        );
        res.json({ message: "Member updated", member: updated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update member", error: err.message });
    }
});

// DELETE - Remove member
router.delete('/:id', isAdmin, async (req, res) => {
    try {
        const member = await TeamMembers.findById(req.params.id);
        if (!member) return res.status(404).json({ message: 'Member not found' });

        if (member.imagePublicId) {
            await cloudinary.uploader.destroy(member.imagePublicId);
        }

        await TeamMembers.findByIdAndDelete(req.params.id);
        res.json({ message: "Member deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete member", error: err.message });
    }
});

module.exports = router;
