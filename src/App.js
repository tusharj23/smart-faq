import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState(''); // State to store the user query
  const [result, setResult] = useState(null); // State to store the single search result

  // Function to handle the search when the button is clicked
  const handleSearch = async () => {
    if (query.trim()) {  // Check if the query is not just whitespace
      try {
        // Make the POST request to the backend API
        const response = await axios.post('http://localhost:5001/search', { query: query.trim() });
        
        // Check if the response contains a result and update the state
        if (response.data && response.data.result) {
          setResult(response.data.result);  // Update result state
        } else {
          setResult(null); // Reset result if no data
        }
        
        // Log success message for debugging
        console.log('Successfully fetched FAQ:', response.data.result);
        
      } catch (error) {
        // Catch and log any errors in the request
        console.error('Error fetching FAQ:', error.message);
        setResult(null); // Reset result on error
      }
    } else {
      console.warn('Query is empty or invalid');
      setResult(null); // Reset result on invalid query
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
          onChange={(e) => setQuery(e.target.value)} // Update query state on input change
        />
        <button onClick={handleSearch}>Search</button> {/* Search button */}
      </header>

      <div className="faq-results">
        {result ? (  // If there is a result, display it
          <div className="faq-item">
            <h3>{result.question}</h3>
            <p>{result.answer}</p>
          </div>
        ) : (
          <p>The Input is Insufficient.</p>  // Display if no result
        )}
      </div>
    </div>
  );
}

export default App;
