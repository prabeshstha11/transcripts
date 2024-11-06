import express from 'express';
import { YoutubeTranscript } from 'youtube-transcript';

const app = express();
const port = 3001; 

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
      res.status(500).json({ error: 'Failed to fetch transcript', details: error.message });
    });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
