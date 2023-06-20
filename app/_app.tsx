import { withUrqlClient } from 'next-urql';
import { cacheExchange, fetchExchange } from 'urql';
import { url } from "./lib/constants";

const App = ({ Component, pageProps }) => <Component {...pageProps} />;

export default withUrqlClient(
  ssrExchange => ({
    url,
    exchanges: [cacheExchange, ssrExchange, fetchExchange],
  }),
  { ssr: false }
)(App);