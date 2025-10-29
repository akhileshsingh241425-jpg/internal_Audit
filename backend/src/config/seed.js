const dotenv = require('dotenv');
const { sequelize, connectDB } = require('./database');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config({ path: './.env' });

const seedUsers = async () => {
  try {
    await connectDB();

    // Disable foreign key checks temporarily
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    
    // Clear existing users
    await User.destroy({ where: {}, truncate: true });
    console.log('Existing users cleared');

    // Re-enable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    // Hash password manually
    const salt = await bcrypt.genSalt(10);
    
    // Create users with pre-hashed passwords
    const users = [
      {
        username: 'super',
        password: await bcrypt.hash('super123', salt),
        name: 'Super Admin',
        email: 'superadmin@gautamsolar.com',
        role: 'superadmin'
      },
      {
        username: 'admin',
        password: await bcrypt.hash('admin123', salt),
        name: 'Admin',
        email: 'admin@gautamsolar.com',
        role: 'admin'
      },
      // Team-A
      {
        username: 'nishant',
        password: await bcrypt.hash('nishant123', salt),
        name: 'Nishant',
        email: 'nishant@gautamsolar.com',
        role: 'auditor',
        team: 'Team-A'
      },
      {
        username: 'nikhil',
        password: await bcrypt.hash('nikhil123', salt),
        name: 'Nikhil',
        email: 'nikhil@gautamsolar.com',
        role: 'auditor',
        team: 'Team-A'
      },
      {
        username: 'himesh',
        password: await bcrypt.hash('himesh123', salt),
        name: 'Himesh',
        email: 'himesh@gautamsolar.com',
        role: 'auditor',
        team: 'Team-A'
      },
      {
        username: 'dikhshant',
        password: await bcrypt.hash('dikhshant123', salt),
        name: 'Dikhshant',
        email: 'dikhshant@gautamsolar.com',
        role: 'auditor',
        team: 'Team-A'
      },
      // Team-B
      {
        username: 'saumya',
        password: await bcrypt.hash('saumya123', salt),
        name: 'Saumya',
        email: 'saumya@gautamsolar.com',
        role: 'auditor',
        team: 'Team-B'
      },
      {
        username: 'sahadat',
        password: await bcrypt.hash('sahadat123', salt),
        name: 'Sahadat',
        email: 'sahadat@gautamsolar.com',
        role: 'auditor',
        team: 'Team-B'
      },
      {
        username: 'abhay',
        password: await bcrypt.hash('abhay123', salt),
        name: 'Abhay',
        email: 'abhay@gautamsolar.com',
        role: 'auditor',
        team: 'Team-B'
      },
      {
        username: 'kanishk',
        password: await bcrypt.hash('kanishk123', salt),
        name: 'Kanishk',
        email: 'kanishk@gautamsolar.com',
        role: 'auditor',
        team: 'Team-B'
      }
    ];

    // Insert directly without triggering hooks
    await sequelize.queryInterface.bulkInsert('users', users.map(user => ({
      ...user,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    })));
    
    console.log('✅ Users seeded successfully');
    console.log(`Created ${users.length} users`);
    console.log('\n📋 Login Credentials:');
    console.log('   SUPERADMIN: super / super123');
    console.log('   ADMIN: admin / admin123');
    console.log('   AUDITOR: nishant / nishant123');
    console.log('   AUDITOR: nikhil / nikhil123');
    console.log('   AUDITOR: himesh / himesh123');
    console.log('   AUDITOR: dikhshant / dikhshant123');
    console.log('   AUDITOR: saumya / saumya123');
    console.log('   AUDITOR: sahadat / sahadat123');
    console.log('   AUDITOR: abhay / abhay123');
    console.log('   AUDITOR: kanishk / kanishk123');

    process.exit(0);
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedUsers();
