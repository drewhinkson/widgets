import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [term, setTerm] = useState('book');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    if (debouncedTerm) {
      const searchArticles = async () => {
        const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
          params: {
            action: 'query',
            list: 'search',
            origin: '*',
            format: 'json',
            srsearch: debouncedTerm,
          },
        });
        setResults(data.query.search);
      };

      searchArticles();
    }
  }, [debouncedTerm]);

  const renderedResults = results.map((result) => {
    const regex = /(<([^>]+)>)/gi; //NEW
    const cleanSnippet = result.snippet.replace(regex, ''); //NEW

    return (
      // {result.snippet} was replaced with {cleanSnippet}
      <div key={result.pageid} className='item'>
        <div className='right floated content'>
          <a
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            className='ui button'>
            Go
          </a>
        </div>
        <div className='content'>
          <div className='header'>{result.title}</div>
          {cleanSnippet}
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className='ui form'>
        <div className='field'>
          <label>Enter Search Term</label>
          <input
            className='input'
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </div>
      <div className='ui celled list'>{renderedResults}</div>
    </div>
  );
};
export default Search;
