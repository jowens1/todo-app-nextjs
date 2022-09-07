import Image from 'next/image';

type Props = {
  iconName: string;
  onClick: () => void;
  width?: number;
  height?: number;
};

const Icon = ({ iconName, onClick, width = 16, height = 16 }: Props) => (
  <div
    className={
      'flex w-8 h-8 items-center justify-center rounded shadow-frame active:shadow-pressed'
    }
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
