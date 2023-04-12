import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
	'user-read-email',
	'playlist-read-private',
	'playlist-read-collaborative',
	'user-read-private',
	'user-read-email',
	'streaming',
	'user-library-read',
	'user-top-read',
	'user-read-playback-state',
	'user-modify-playback-state',
	'user-read-currently-playing',
	'user-read-recently-played',
	'user-follow-read',
].join(',');

const params = {
	scope: scopes,
};

const queryParamsString = new URLSearchParams(params);

const LOGIN_URL =
	'https://accounts.spotify.com/authorize?' + queryParamsString.toString();
//`https://accounts.spotify.com/authorize?${queryParamsString.toString()}`

// Create Spotify API wrapper
var spotifyApi = new SpotifyWebApi({
	clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
	clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
	// redirectUri: 'http://www.example.com/callback',
});

export default spotifyApi;

export { LOGIN_URL };

// const scopes =[
// 	'ugc-image-upload',
// 	'user-read-playback-state',
// 	'user-modify-playback-state',
// 	'user-read-currently-playing',
// 	'app-remote-control',
// 	'streaming',
// 	'playlist-read-private',
// 	'playlist-read-collaborative',
// 	'playlist-modify-private',
// 	'playlist-modify-public',
// 	'user-follow-modify',
// 'user-follow-read',
// 	'user-read-playback-position',
// 	'user-top-read',
// 	'user-read-recently-played',
// 	'user-library-modify',
// 	'user-library-read',
// 	'user-read-email',
// 	'user-read-private',
// ]
