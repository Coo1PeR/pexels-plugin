const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

const PEXELS_API_KEY = 'bYV1GvoDKy6xSxPUOqsDic8YRjC7jjQMuoRIwo98xQu7bNWVICv3qXRE';

app.get('/search', async (req, res) => {
  try {
    const query = req.query.query;
    const per_page = req.query.per_page || 15;
    const page = req.query.page || 1;
    const response = await axios.get('https://api.pexels.com/videos/search', {
      headers: { Authorization: PEXELS_API_KEY },
      params: { query, per_page, page }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
