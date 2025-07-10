const express = require('express');
const router = express.Router();
const Contact_User = require('../models/Contact');
const { isAdmin } = require('../middleware/auth');

// ✅ GET all members
router.get('/', async (req, res) => {
  try {
     console.log("📥 GET /api/contacts called");
    const contactUsers = await Contact_User.find();
    if (contactUsers.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    res.json({
      total:contactUsers.length,
      users:contactUsers
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch members", error: err.message });
  }
});

// ✅ POST - Add member (with validation)
router.post('/', async (req, res) => {
  try {
    const contactUser = new Contact_User(req.body);
    await contactUser.save();
    res.status(201).json({ message: "User created", user: contactUser });
  } catch (err) {
    console.error(err);

    // ✅ Catch validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: "Validation failed", errors });
    }

    res.status(500).json({ message: "Failed to create member", error: err.message });
  }
});

// ✅ PUT - Update member (with validation)
// router.put('/:id',isAdmin, async (req, res) => {
//   try {
//     const user = await Contact_User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const updated = await Contact_User.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true } // runValidators is key here
//     );
//     res.json({ message: "User updated", user: updated });
//   } catch (err) {
//     console.error(err);

//     if (err.name === 'ValidationError') {
//       const errors = Object.values(err.errors).map(e => e.message);
//       return res.status(400).json({ message: "Validation failed", errors });
//     }

//     res.status(500).json({ message: "Failed to update user", error: err.message });
//   }
// });

// ✅ DELETE - Remove member
router.delete('/:id',isAdmin,async (req, res) => {
  try {
    const contactUser = await Contact_User.findById(req.params.id);
    if (!contactUser) return res.status(404).json({ message: 'Contact user not found' });

    await Contact_User.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete member", error: err.message });
  }
});

module.exports = router;
