/* eslint-disable @next/next/no-img-element */
import { debounce } from 'lodash';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSongInfo from '../hooks/useSongInfo';
import useSpotify from '../hooks/useSpotify';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import {
	BackwardIcon,
	ForwardIcon,
	PauseCircleIcon,
	PauseIcon,
	PlayIcon,
	SpeakerWaveIcon,
	SpeakerXMarkIcon,
} from '@heroicons/react/20/solid';

//
function Player() {
	const spotifyApi = useSpotify();
	const { data: session, status } = useSession();
	const [currentTrackId, setCurrentTrackId] =
		useRecoilState(currentTrackIdState);
	const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
	const [volume, setVolume] = useState(50);

	const songInfo = useSongInfo(currentTrackId);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fetchCurrentSong = () => {
		if (!songInfo) {
			spotifyApi.getMyCurrentPlayingTrack().then((data) => {
				setCurrentTrackId(data.body?.item?.id);
				spotifyApi.getMyCurrentPlaybackState().then((data) => {
					setIsPlaying(data.body?.is_playing);
				});
			});
		}
	};

	useEffect(() => {
		if (spotifyApi.getAccessToken() && !currentTrackId) {
			fetchCurrentSong();
			setVolume(50);
		}
	}, [currentTrackId, spotifyApi, session, fetchCurrentSong]);

	//
	const handlePlayPause = () => {
		spotifyApi.getMyCurrentPlaybackState().then((data) => {
			if (data.body?.is_playing) {
				spotifyApi.pause();
				setIsPlaying(false);
			} else {
				spotifyApi.play();
				setIsPlaying(true);
			}
		});
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedAdjustVolume = useCallback(
		debounce((volume) => {
			spotifyApi.setVolume(volume).catch((err) => {});
		}, 300),
		[]
	);

	useEffect(() => {
		if (volume > 0 && volume < 100) {
			debouncedAdjustVolume(volume);
		}
	}, [debouncedAdjustVolume, volume]);

	return (
		<div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
			{/* Left */}
			<div className='flex items-center space-x-4 '>
				<img
					className='hidden md:inline h-10 w-10'
					src={songInfo?.album.images?.[0]?.url}
					alt=''
				/>
				<div>
					<h3>{songInfo?.name}</h3>
					<p>{songInfo?.artists?.[0]?.name}</p>
				</div>
			</div>

			{/* Center */}
			<div className='flex items-center justify-evenly'>
				<ArrowsRightLeftIcon className='button' />
				<BackwardIcon
					//onClick={() => spotifyApi.skipToPrevious}
					className='button'
				/>
				{isPlaying ? (
					<PauseIcon onClick={handlePlayPause} className='button' />
				) : (
					<PlayIcon onClick={handlePlayPause} className='button' />
				)}

				<ForwardIcon
					//onClick={() => spotifyApi.skipToPrevious}
					className='button'
				/>
			</div>
			{/* Right */}
			<div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
				<SpeakerXMarkIcon
					onClick={() => volume > 0 && setVolume(volume - 10)}
					className='button'
				/>
				<input
					className='w-14 md:w-28'
					type='range'
					value={volume}
					onChange={(e) => setVolume(Number(e.target.value))}
					min={0}
					max={100}
				/>
				<SpeakerWaveIcon
					onClick={(e) => volume < 100 && setVolume(volume + 10)}
					className='button'
				/>
			</div>
		</div>
	);
}

export default Player;
