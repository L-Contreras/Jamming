import React from 'react';
import './track.css'

function Track({ track , onTrackClick, isInPlaylist }) {
    return (
        <div className="track-container" >
            <div className="track-info">
                <p>{track.name} - {track.artists[0]?.name || "Unknown Artist"}</p>
                <p>{track.album?.name || "Unknown Album"}</p>
            </div>
            <button 
            onClick={() => onTrackClick(track)} 
            className="tracks-button"
            >
                {isInPlaylist ? "Remove" : "Add"}
            </button>
        </div>
    );
};

export default Track;