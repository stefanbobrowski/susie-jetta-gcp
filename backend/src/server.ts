// src/server.ts
import express from 'express';
import cors from 'cors';
import { Storage } from '@google-cloud/storage';

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

    // Filter out any folder entries and return just filenames
    const photos = files
      .filter((f) => !f.name.endsWith('/'))
      .map((f) => ({
        name: f.name.replace(prefix, ''), // e.g. "IMG_123.jpg"
        url: `https://storage.googleapis.com/${bucketName}/${f.name}`,
      }));

    res.json({ album, photos });
  } catch (err) {
    console.error('Error listing photos:', err);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
