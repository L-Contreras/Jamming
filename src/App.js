import React, { useState, useEffect } from "react";
import SearchBar from "./components/searchBar/searchbar";
import SearchResults from "./components/SearchResults/searchresults";
import PlayLists from "./components/playlists/playlists";
import './index.css';
import './components/SearchResults/songscontainer.css';
import Spotify from './utils/Spotify';



function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [playlistTracks, setPlayListTracks] = useState([]);
  const [playlistName, setPlayListName] = useState("");

  useEffect(() => {
    const token = Spotify.getAccessToken();
    setAccessToken(token)
  }, []);

  const addToPlayList = (track) => {
    if (!playlistTracks.find((t) => t.id === track.id)) {
      setPlayListTracks([...playlistTracks, track]);
    }
  };

  const handlePlaylistName = (e) =>{
    setPlayListName(e.target.value);
  }


  const onRemoveClick = (track) => {
    setPlayListTracks((prevTracks) => prevTracks.filter((t) => t.id !== track.id));
  };

  function savePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlayListName("New Playlist")
      setPlayListTracks([]);
    })
  }

  return (
    <div className="App">
      <section>
        <h1>Jamming App</h1>
      </section>

      <main>
        <section className="search-container">
          <h2>You can make a playlist here</h2>
          <p>Start by searching for your favorite artist</p>
          <SearchBar accessToken={accessToken} onSearchResults={setSearchResults} />
        </section>
        <section className="resultsplaylistcontainer">
          <div className="songscontainer">
            <SearchResults searchResults={searchResults} onTrackClick={addToPlayList} />
          </div>
          <div className="songscontainer">
            <PlayLists tracks={playlistTracks} onRemoveClick={onRemoveClick} handleName={handlePlaylistName} onClick={savePlaylist}/>
          </div>
        </section> 

      </main>
    </div>
  );
};

export default App;
