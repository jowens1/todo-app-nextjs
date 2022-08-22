type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => (
  <div className="container flex flex-col items-center justify-center">
    {children}
  </div>
);

export default Container;
