const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Fuse = require('fuse.js');
const faqs = require('./faqs.json'); // Import the FAQs JSON data

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Combine all FAQ sections into a single array for searching
const allFAQs = Object.values(faqs).flat();

// Fuse.js options for fuzzy searching
const options = {
  keys: [
    { name: 'question', weight: 0.7 },
    { name: 'answer', weight: 0.3 },
  ],
  threshold: 0.4, // Adjust threshold for more lenient search
};

// Initialize Fuse.js with the combined FAQ data and options
const fuse = new Fuse(allFAQs, options);

// API route to handle search queries
app.post('/search', (req, res) => {
  const { query } = req.body;

  // Check if query is provided and has a minimum length
  if (!query || typeof query !== 'string' || query.length < 2) {
    return res.status(400).json({ error: 'Query is required, must be a string, and at least 2 characters long.' });
  }

  // Normalize query
  const normalizedQuery = query.trim().toLowerCase();
  console.log(`Searching for: ${normalizedQuery}`); // Log the query

  // Perform the search
  const results = fuse.search(normalizedQuery);
  console.log(`Search results:`, results); // Log all results

  // Check for exact matches
  const exactMatches = results.filter(result => result.score === 0);
  console.log(`Exact matches found:`, exactMatches); // Log exact matches

  // Check for the case where more than 2 questions match
  if (results.length > 1) {
    return res.json({
      query,
      message: `Please specify your question further. What exactly would you like to know about "${query}"`,
    });
  }

  // Handle exact matches
  if (exactMatches.length > 1) {
    return res.status(400).json({ error: 'Insufficient information: multiple exact matches found.' });
  }

  // Return the best match if exists
  if (exactMatches.length === 1) {
    return res.json({
      query,
      result: exactMatches[0].item,
    });
  }

  // Return the best fuzzy match if no exact matches are found
  if (results.length > 0) {
    const bestMatch = results;
    return res.json({
      query,
      result: bestMatch,
    });
  }

  // If no results found
  res.json({
    query,
    result: null,
    message: 'No matches found.',
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
