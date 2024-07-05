const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
