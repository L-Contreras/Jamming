import React, { useState } from 'react';

function SearchBar({ accessToken, onSearchResults }) {
    const [searchSong, setSearchSong] = useState("");

    const handleSearch = async () => {
        if (!searchSong) return;
        if (!accessToken) {
          console.error("Access token not available yet.");
          return;
        }
    
        try {
          const response = await fetch(
            `https://api.spotify.com/v1/search?q=${searchSong}&type=track`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-type": "application/json",
    
                },
              }
            );

            // checking reponse is ok
            if (response.ok) {
              const data = await response.json();
              onSearchResults(data.tracks.items);
            } else {
              console.error("Error fetching data", response.statusText);
            } 
          } catch (error) {
            console.error("Error", error);
          } 
      };


    return (
        <div className="SearchBar">
            <input 
            type="text"
            placeholder="Enter song"
            value={searchSong}
            onChange={(e) => setSearchSong(e.target.value)}
            style={{fontSize: '24px'}}
            />
            <button style={{fontSize: '24px'}}onClick={handleSearch}>Search</button>
        </div>
    )
};

export default SearchBar;