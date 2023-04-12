import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import spotifyApi from '@/lib/spotify';

export default function useSpotify() {
	const { data: session, status } = useSession();

	useEffect(() => {
		if (session) {
			//  I refresh access token attempt fails, redirect user to login...
			if (session.error === 'RefreshAccessTokenError') {
				signIn();
			}

			spotifyApi.setAccessToken(session.user.accessToken);
		}
	}, [session]);

	return spotifyApi;
}
