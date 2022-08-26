import type { NextPage } from 'next';
import Container from '../components/container';
import Card from '../components/card';
import Tile from '../components/tile';
import Layout from '@/components/layout';
import { signOut, useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <Layout>
      <Container>
        {!session ? (
          <Card>
            <div>
              <Tile imgPath="/login" linkPath="/api/auth/signin" />
            </div>
          </Card>
        ) : (
          <Card>
            <div className="flex items-center">
              <Tile
                linkPath="/api/auth/signout"
                imgPath="/logout"
                type="icon"
                height={16}
                width={16}
              />
            </div>
            <div className="flex justify-center rounded-xl w-52 shadow-frame">
              <Tile imgPath="/checklist" linkPath="/todos" />
              <Tile imgPath="/notes2" linkPath="/todos" />
            </div>
          </Card>
        )}
      </Container>
    </Layout>
  );
};

export default Home;

//<Tile imgPath="/note" linkPath="/notes" />
