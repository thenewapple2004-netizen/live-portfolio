require('dotenv').config();
const { connectDB, disconnectDB } = require('../config/database');
const { User } = require('../config/models');

async function run() {
  const args = process.argv.slice(2);
  const usernameArg = args.find(a => a.startsWith('--username='));
  const emailArg = args.find(a => a.startsWith('--email='));
  const passwordArg = args.find(a => a.startsWith('--password='));

  if (!passwordArg || (!usernameArg && !emailArg)) {
    console.error('Usage: node scripts/resetPassword.js --username=<username> | --email=<email> --password=<newPassword>');
    process.exit(1);
  }

  const username = usernameArg ? usernameArg.split('=')[1] : undefined;
  const email = emailArg ? emailArg.split('=')[1] : undefined;
  const newPassword = passwordArg.split('=')[1];

  await connectDB();

  try {
    const query = username ? { username } : { email };
    const user = await User.findOne(query);
    if (!user) {
      console.error('User not found for query:', query);
      process.exit(2);
    }

    user.password = newPassword; // pre-save hook will hash
    await user.save();
    console.log('Password updated successfully for user:', user.username);
  } catch (err) {
    console.error('Error updating password:', err.message);
    process.exit(3);
  } finally {
    await disconnectDB();
    process.exit(0);
  }
}

run();


