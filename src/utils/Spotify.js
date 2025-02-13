let accessToken;
const clientId = "b5bd5301ce00479a960c502184f72eed";
const redirectUrl = "http://localhost:3000";

const Spotify = {
    getAccessToken() {
        if(accessToken) return accessToken;  
        const tokenInURl = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenInURl && expiryTime) {
        // setting access token and expiry
            accessToken = tokenInURl[1];
            const expiresIn = Number(expiryTime[1]);

            window.setTimeout(() => (accessToken=""), expiresIn * 1000);

            window.history.pushState("Access token", null, "/");
            return accessToken;
        }

        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
        window.location = redirect;
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris) return;
        const aToken = Spotify.getAccessToken();
        const header = { Authorization: `Bearer ${aToken}`};
        let userId;
        let playlistId;
        return fetch(`https://api.spotify.com/v1/me`, { headers: header })
        .then((response) => response.json())
        .then((jsonResponse) => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: header,
                method: 'POST',
                body: JSON.stringify({name: name}),
            })
                .then((response) => response.json())
                .then((jsonResponse) => {
                    playlistId = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                        headers: header,
                        method: 'POST',
                        body: JSON.stringify({uris: trackUris })
                    });
                })
        })
    }


};
export default Spotify;