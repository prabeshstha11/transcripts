import express from 'express';
import { YoutubeTranscript } from 'youtube-transcript';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3001;

app.get("/", (req, res) => {
  return res.send("working");
});

app.get('/api/transcript', (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).json({ error: 'URL is required' });
  }

  YoutubeTranscript.fetchTranscript(videoUrl)
    .then((transcript) => {
      const txt = transcript.map(item => item.text).join(' ');
      res.json({ transcript: txt });
    })
    .catch((error) => {
      // If there's an error, send back the error message
      res.status(500).json({ error: 'Failed to fetch transcript', details: error.message });
    });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
