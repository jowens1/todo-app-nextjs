import Head from 'next/head';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="flex min-h-screen flex-col items-center pt-4 bg-blue-100">
    <Head>
      <title>My First Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {children}
  </div>
);

export default Layout;
