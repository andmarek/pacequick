import { useSyncColorMode } from '../hooks/useSyncColorMode';

function MyApp({ Component, pageProps }) {
  useSyncColorMode();
  return <Component {...pageProps} />;
}

export default MyApp;