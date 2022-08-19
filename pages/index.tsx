import type { NextPage } from 'next';
import Layout from '../components/layout';
import Container from '../components/container';
import Card from '../components/card';
import Tile from '../components/tile';

const Home: NextPage = () => {
  return (
    <Layout>
      <Container>
        <Card>
          <div className="flex justify-center rounded-xl w-52 shadow-frame">
            <Tile imgPath="/checklist" linkPath="/todos" />
          </div>
        </Card>
      </Container>
    </Layout>
  );
};

export default Home;

//<Tile imgPath="/note" linkPath="/notes" />
