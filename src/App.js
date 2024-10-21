// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);

//   // const handleSearch = async () => {
//   //   if (query.trim()) {
//   //     try {
//   //       const response = await axios.post('http://localhost:5001/search', { query });
//   //       setResults(response.data.results);
//   //       console.log('connected')
//   //     } catch (error) {
//   //       console.error('Error fetching FAQs:', error);
//   //     }
//   //   }
//   // };
//   const handleSearch = async () => {
//     if (query.trim()) {  // Check if the query is not just whitespace
//       try {
//         // Make the POST request to the backend API
//         const response = await axios.post('http://localhost:5001/search', { query: query.trim() });
  
//         // Check if the response contains results and update the state
//         if (response.data && response.data.results) {
//           setResults(response.data.results);  // Assuming setResults updates the FAQ results in the frontend
//         }
  
//         // Log success message for debugging
//         console.log('Successfully fetched FAQs:', response.data.results);
        
//       } catch (error) {
//         // Catch and log any errors in the request
//         console.error('Error fetching FAQs:', error.message);
//       }
//     } else {
//       console.warn('Query is empty or invalid');
//     }
//   };
  
  
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Smart FAQ Search</h1>
//         <input
//           type="text"
//           placeholder="Enter your question..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </header>
//       <div className="faq-results">
//         {results.length > 0 ? (
//           results.map((faq, index) => (
//             <div key={index} className="faq-item">
//               <h3>{faq.question}</h3>
//               <p>{faq.answer}</p>
//             </div>
//           ))
//         ) : (
//           <p>No results found</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState(''); // State to store the user query
  const [results, setResults] = useState([]); // State to store the search results

  // Function to handle the search when the button is clicked
  const handleSearch = async () => {
    if (query.trim()) {  // Check if the query is not just whitespace
      try {
        // Make the POST request to the backend API
        const response = await axios.post('http://localhost:5001/search', { query: query.trim() });
        
        // Check if the response contains results and update the state
        if (response.data && response.data.results) {
          setResults(response.data.results);  // Update results state
        }
        
        // Log success message for debugging
        console.log('Successfully fetched FAQs:', response.data.results);
        
      } catch (error) {
        // Catch and log any errors in the request
        console.error('Error fetching FAQs:', error.message);
      }
    } else {
      console.warn('Query is empty or invalid');
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
        {results.length > 0 ? (  // If there are results, display them
          results.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>  // Display if no results
        )}
      </div>
    </div>
  );
}

export default App;
