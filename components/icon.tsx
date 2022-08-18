import Image from 'next/image';

type Props = {
  iconName: string;
  onClick: () => void;
  width?: number;
  height?: number;
};

const Icon = ({ iconName, onClick, width = 16, height = 16 }: Props) => (
  <div className={'flex items-center justify-center'} onClick={onClick}>
    <Image
      src={`/${iconName}.png`}
      alt={`${iconName}`}
      width={width}
      height={height}
    />
  </div>
);

export default Icon;
