import express from 'express';
import { generateMeta, generateImg } from './controllers/openaiControllers.js';

const app = express();
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});

// Middleware to parse JSON data from POST requests
app.use(express.json());
app.use(express.static('public'))

// Routes
app.post('/openai/meta', generateMeta);
app.post('/openai/image', generateImg);























