import Head from 'next/head';
import { Header, Feed, Modal } from '../components';

export default function Home() {
  return (
	<div>
		<Head>
			<title>Instaclone</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<Header />
		<Feed />
		<Modal />
	</div>
  );
};
