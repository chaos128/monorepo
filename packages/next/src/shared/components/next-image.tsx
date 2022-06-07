const NextImageWrapper = (props: {
  src?: string;
  nextjsRenderer: (props: any) => JSX.Element;
}) => {
  return <>{props.nextjsRenderer({ ...props })}</>;
};

export default NextImageWrapper;
