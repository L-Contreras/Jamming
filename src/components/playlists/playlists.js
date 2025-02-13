import React, { useState } from 'react';
import Track from "../Track/track";
import "../SearchResults/songscontainer.css";
import SavePlaylistButton from '../SavePlaylistButton/SavePlaylistButton';



function PlayLists({ tracks, onRemoveClick , handleName, playlistName, onClick }) {

    
    return (
        <div className="tracklist-container">
            <div className="headerscontainer">
                <input
                type="text"
                value={playlistName}
                onChange={handleName}
                placeholder='Enter playlist name'
                ></input>
                <SavePlaylistButton onClick={onClick} />
            </div>
            {tracks.length > 0 ? (
                <ul>
                    {tracks.map((track) => {
                        return <Track 
                        key={track.id} 
                        track={track} 
                        onTrackClick={onRemoveClick}
                        isInPlaylist={true} />
                    })}
                </ul>
                ) : (
                    <p>Play list is empty</p>
                )}
        </div>
    );
};

export default PlayLists;