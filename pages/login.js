import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import logo from '../img/v-spotify.png';

function Login({ providers }) {
	return (
		<div className='flex flex-col items-center min-h-screen w-full justify-center bg-black'>
			<Image className='w-52 mb-5' src={logo} alt='spotify-logo' />
			{Object.values(providers).map((provider) => (
				<div key={provider.name}>
					<button
						onClick={() => signIn(provider.id, { callbackUrl: '/' })}
						className='text-pink-200'
					>
						Sign in with {provider.name}
					</button>
				</div>
			))}
		</div>
	);
}

export default Login;

//Server side provider
export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props: { providers },
	};
}
