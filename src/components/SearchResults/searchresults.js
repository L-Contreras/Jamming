import React, { useState } from 'react';
import Track from "../Track/track";
import './songscontainer.css';

function SearchResults({ searchResults , onTrackClick }) {
  return (
    <div className="tracklist-container">
      <div className="headerscontainer">
        <h2>Search Results</h2>
      </div>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((track) => (
            <Track key={track.id} track={track} onTrackClick={onTrackClick} p/>
          ))}
        </ul>
      ) : ( 
        <p>Search for your artist</p>
      )}
    </div>
  );
}

export default SearchResults;