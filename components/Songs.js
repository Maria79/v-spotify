import React from 'react';
import { useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import Song from './Song';

function Songs() {
	const playlist = useRecoilValue(playlistState);
	return (
		<div className='text-white px-8 flex flex-col space-y-1'>
			{playlist?.tracks.items.map((track, i) => (
				<div key={track.track.id} className='space-y-2 p-2'>
					{/* {track.track.name} */}
					<Song key={track.track.id} track={track} order={i} />
				</div>
			))}
		</div>
	);
}

export default Songs;
