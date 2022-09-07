import Image from 'next/image';

type Props = {
  iconName: string;
  onClick: () => void;
  width?: number;
  height?: number;
  shaded?: boolean;
};

const Icon = ({
  iconName,
  onClick,
  width = 16,
  height = 16,
  shaded = false,
}: Props) => (
  <div
    className={`flex w-8 h-8 items-center justify-center rounded ${
      shaded ? 'shadow-shaded' : 'shadow-frame'
    } active:shadow-pressed`}
    onClick={onClick}
  >
    <Image
      src={`/${iconName}.svg`}
      alt={`${iconName}`}
      width={width}
      height={height}
    />
  </div>
);

export default Icon;
