const express = require('express');
const { InstagramScraper } = require('@aduptive/instagram-scraper');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Endpoint to handle scraping
app.post('/scrape', async (req, res) => {
  const username = req.body.username;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  console.log(`Starting scraper for username: ${username}`);
  const scraper = new InstagramScraper();

  try {
    console.log("Fetching posts...");
    const results = await scraper.getPosts(username, 2);

    if (results.success && results.posts) {
      console.log(`Successfully collected ${results.posts.length} posts`);
      await scraper.saveToJson(results);
      console.log("Results saved to JSON.");
      res.json(results.posts); // Send the JSON response to the front end
    } else {
      console.error('Error:', results.error);
      res.status(500).json({ error: results.error });
    }
  } catch (error) {
    console.error('Critical error:', error);
    res.status(500).json({ error: 'An error occurred while scraping' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});