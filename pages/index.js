import { getSession } from 'next-auth/react';
import Center from '@/components/Center';
import Sidebar from '@/components/Sidebar';
import Player from '@/components/Player';

export default function Home() {
	return (
		<div className='h-screen bg-black overflow-hidden'>
			<main className='flex'>
				{/* Sidebar */}
				<Sidebar />
				{/* Center */}
				<Center />
			</main>
			<div className='sticky bottom-0'>
				{/* Player */}
				<Player />
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);
	return {
		props: {
			session,
		},
	};
}
