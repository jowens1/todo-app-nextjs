import Link from 'next/link';
import Image from 'next/image';
type Props = {
  imgPath: string;
  linkPath: string;
};

const Tile = ({ imgPath, linkPath }: Props) => {
  return (
    <div className="flex items-center justify-center rounded m-2 shadow-2xl bg-white">
      <Link href={linkPath}>
        <Image src={`${imgPath}.png`} alt={imgPath} height={64} width={64} />
      </Link>
    </div>
  );
};

export default Tile;
