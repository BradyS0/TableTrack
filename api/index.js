// this code was partially generated with chatGPT
// api/logic/index.js
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for your frontend website
app.use(cors({ origin: process.env.WEBSITE_URL }));
app.use(express.json());

// Connect to Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Example route: get all users
app.get('/api/users', async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json({ data });
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
