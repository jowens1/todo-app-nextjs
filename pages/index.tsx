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
          <div className="flex">
            <Tile imgPath="/checklist" linkPath="/todos" />
            <Tile imgPath="/note" linkPath="/notes" />
          </div>
        </Card>
      </Container>
    </Layout>
  );
};

export default Home;
