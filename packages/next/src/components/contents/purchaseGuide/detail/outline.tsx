interface IGuideOutlineProps {
  text: {
    __html: string;
  };
}

const PurchaseGuideOutline = (props: IGuideOutlineProps) => {
  return (
    <div className="guide-outline">
      <p className="text" dangerouslySetInnerHTML={props.text}></p>
      <style jsx>{`
        .guide-outline {
          padding-top: 48px;
          padding-bottom: 48px;
        }

        .text {
          font-size: 15px;
          font-weight: 400;
          width: 90%;
          margin-left: auto;
          margin-right: auto;
          line-height: 30px;
        }
      `}</style>
    </div>
  );
};

export default PurchaseGuideOutline;
