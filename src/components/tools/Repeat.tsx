interface Props {
  count: number;
  element(i: number): JSX.Element;
}

const Repeat: React.FC<Props> = ({ count, element }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, i) => element(i))}
    </>
  );
};

export default Repeat;
