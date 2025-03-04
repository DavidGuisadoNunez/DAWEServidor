import app from './app.js';
import connectDB from './src/config/database.js';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}/api-docs`);
});
