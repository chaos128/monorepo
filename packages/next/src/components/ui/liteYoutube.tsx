import "@justinribeiro/lite-youtube";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lite-youtube": any;
    }
  }
}

const LiteYoutube = () => {
  const props = { videoid: "BAfEfd8JYR8" };
  return <lite-youtube autoload {...props}></lite-youtube>;
};
export default LiteYoutube;
