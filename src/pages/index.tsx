import type { GetServerSidePropsContext, NextPage } from 'next';
import Container from '../components/container';
import Card from '../components/card';
import Tile from '../components/tile';
import Layout from '@/components/layout';
import { getSession, useSession } from 'next-auth/react';
import { Session } from 'next-auth';

type Props = {
  session: Session;
};

const Home: NextPage<Props> = ({ session }: Props) => {
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
              <Tile imgPath="/notes2" linkPath="/notes" />
            </div>
          </Card>
        )}
      </Container>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}

//<Tile imgPath="/note" linkPath="/notes" />
