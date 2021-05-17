import { Container } from 'next/app';
import Head from 'next/head';
import './styles.less';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Container>
        <Head>
          <title>Mohan's Editor</title>
        </Head>

        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default MyApp
