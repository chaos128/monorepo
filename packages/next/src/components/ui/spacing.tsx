const Spacing = ({
  width,
  height,
  bg,
  shadow,
  className,
}: {
  width?: string;
  height?: string;
  bg?: string;
  shadow?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={className}
      style={{
        height: height,
        width: width,
        backgroundColor: bg,
        boxShadow: shadow ? "inset -1px 1px 2px #DFDFDF" : "",
      }}
    ></div>
  );
};

export default Spacing;
