import Head from 'next/head';
import Footer from './footer';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="flex h-screen flex-col items-center pt-4 bg-blue-100">
    <Head>
      <title>My First Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {children}
    <Footer />
  </div>
);

export default Layout;
