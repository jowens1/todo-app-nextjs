import Link from 'next/link';
import Image from 'next/image';
import { classNames } from '../utils/util';

type Props = {
  imgPath: string;
  linkPath: string;
  height?: number;
  width?: number;
  type?: string;
};

const cssOptions = {
  base: 'flex items-center justify-center rounded shadow-tile m-2',
  tile: 'w-20 h-20',
  icon: 'w-8 h-8',
};
const Tile = ({
  imgPath,
  linkPath,
  height = 64,
  width = 64,
  type = 'tile',
}: Props) => {
  return (
    <div
      className={classNames(
        `${cssOptions.base} ${
          type === 'tile' ? cssOptions.tile : cssOptions.icon
        }`
      )}
    >
      <Link href={linkPath}>
        <a className="flex justify-center items-center">
          <Image
            src={`${imgPath}.svg`}
            alt={imgPath}
            height={height}
            width={width}
          />
        </a>
      </Link>
    </div>
  );
};

export default Tile;
