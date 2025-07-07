// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const TeamMember = require('./models/TeamMember'); // ✅ Confirm correct file path

// // Load environment variables
// dotenv.config();

// const data = [
//   {
//     name: "Jane Doe",
//     title: "Creative Director",
//     image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww"
//   },
//   {
//     name: "John Smith",
//     title: "Lead Developer",
//     image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVvcGxlfGVufDB8fDB8fHww"
//   },
//   {
//     name: "Sara Khan",
//     title: "Marketing Head",
//     image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVvcGxlfGVufDB8fDB8fHww"
//   }
// ];

// async function addTeamMembers() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });

//     console.log('Connected to MongoDB');

//     // Delete old records (optional)
//     const deleted = await TeamMember.deleteMany();
//     console.log('Old data deleted:', deleted.deletedCount);

//     // Insert new data
//     const inserted = await TeamMember.insertMany(data);
//     console.log('Data inserted successfully:', inserted);

//     await mongoose.disconnect();
//     console.log('Disconnected from MongoDB');
//   } catch (error) {
//     console.error('Error inserting data:', error.message);
//   }
// }

// addTeamMembers();
