import React, { useState } from 'react';

function TrackName() {
    const [tracklistName, setTrackListName] = useState("");

    return (
        <div>
            <input 
            type="text"
            value={tracklistName}
            onChange={(e) => setTrackListName(e.target.value)}
            />
        </div>
    )
};

export default TrackName;
