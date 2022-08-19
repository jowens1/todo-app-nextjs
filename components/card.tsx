type Props = {
  children?: React.ReactNode;
};

const Card = ({ children }: Props) => (
  <div className="flex flex-col w-1/2 p-4 mb-4 bg-weird-gray rounded items-center justify-center shadow-frame">
    {children}
  </div>
);

export default Card;
