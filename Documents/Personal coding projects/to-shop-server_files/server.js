const express = require('express');
const cron = require('node-cron');
const { deleteDoneItems } = require('./yourFunctionFile'); // Import your function here

const app = express();
const port = process.env.PORT || 3000;

// Define a route for your function
app.get('/delete-done-items', (req, res) => {
  deleteDoneItems().then(() => res.send('Done items deleted successfully.'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Schedule task to run at midnight every day
cron.schedule('0 0 * * *', async () => {
  try {
    await deleteDoneItems();
    console.log('Done items deleted successfully.');
  } catch (error) {
    console.error('Error deleting done items:', error);
  }
});
