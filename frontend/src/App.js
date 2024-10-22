import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]); // Array to hold multiple results
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    if (query.trim().length < 2) {
      setMessage('Query is required and must be at least 2 characters long.');
      setResults([]);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/search', { query: query.trim() });

      // Handle response based on structure
      if (response.data.error) {
        setMessage(response.data.error);
        setResults([]);
      } else if (response.data.message) {
        setMessage(response.data.message);
        setResults(response.data.result || []);
      } else {
        // Check if the result is nested
        if (Array.isArray(response.data.result) && response.data.result.length > 0) {
          setResults(response.data.result.map(item => item.item)); // Access the 'item' property
        } else if (response.data.result) {
          setResults([response.data.result]); // Handle single result case
        } else {
          setResults([]);
        }
        setMessage('');
      }

    } catch (error) {
      console.error('Error fetching FAQ:', error.message);
      setResults([]);
      setMessage('Error fetching data. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Smart FAQ Search</h1>
        <input
          type="text"
          placeholder="Enter your question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </header>

      <div className="faq-results">
        {message && <p className="message">{message}</p>}
        {results.length > 0 ? (
          results.map((item, index) => (
            <div className="faq-item" key={index}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))
        ) : (
          <p>No results available.</p>
        )}
      </div>
      <footer>
    <div class="footer-content">
        <p>© 2024 FAQ Website | All Rights Reserved</p>
        <nav>
            <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">About Us</a></li>
            </ul>
        </nav>
    </div>
</footer>

    </div>
  );
}

export default App;
