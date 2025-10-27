// src/server.ts
import express from 'express';
import cors from 'cors';
import { Storage } from '@google-cloud/storage';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// GCP Storage setup
const storage = new Storage();
const bucketName = 'susie-jetta-photos';

// List photos by album
app.get('/photos', async (req, res) => {
  try {
    const album = req.query.album as string;
    if (!album) {
      return res.status(400).json({ error: 'Missing album query (I, II, or III)' });
    }

    const prefix = `albums/${album}/`;
    const [files] = await storage.bucket(bucketName).getFiles({ prefix });

    const photos = files
      .filter((f) => !f.name.endsWith('/'))
      .map((f) => ({
        name: f.name.replace(prefix, ''),
        url: `https://storage.googleapis.com/${bucketName}/${f.name}`,
      }));

    res.json({ album, photos });
  } catch (err) {
    console.error('Error listing photos:', err);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

// ============================
// ✅ Serve Frontend Build
// ============================

// These two lines make __dirname work in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static frontend
app.use(express.static(path.join(__dirname, '../public')));

// React Router fallback (regex avoids Express 5 bug)
app.get(/.*/, (_, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
