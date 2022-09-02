import Card from '@/components/card';
import Container from '@/components/container';
import Layout from '@/components/layout';
import Tile from '@/components/tile';

const Notes = () => {
  return (
    <Layout>
      <Container>
        <Card>
          <div className="flex w-full items-center">
            <Tile
              linkPath="/"
              imgPath="/home"
              type="icon"
              height={16}
              width={16}
            />
          </div>
          {'Notes Under Construction'}
        </Card>
      </Container>
    </Layout>
  );
};

export default Notes;
