import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 5000;

// start the server
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

void startServer();
