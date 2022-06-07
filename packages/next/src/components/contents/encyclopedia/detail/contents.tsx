import { useMemo, useRef } from "react";

interface IEncyclopediaDetailContentsProps {
  intro: {
    __html: string;
  };
  contents: {
    __html: string;
  };
}

const EncyclopediaDetailContents = ({
  intro,
  contents,
}: IEncyclopediaDetailContentsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  const usingIntro = useMemo(() => {
    return '<p class="ns-cast-text">' + intro.__html + "</p>";
  }, [intro]);

  const usingContent = useMemo(() => {
    return "<div>" + contents.__html + "</div>";
  }, [contents]);

  return (
    <section className="p-[2rem] pb-[6rem] pc:mx-auto pc:w-[80rem]">
      {intro && intro.__html.length > 0 && (
        <div
          ref={introRef}
          dangerouslySetInnerHTML={{ __html: usingIntro }}
        ></div>
      )}
      <DividingLine />
      <div
        ref={ref}
        dangerouslySetInnerHTML={{
          __html: usingContent,
        }}
      ></div>
    </section>
  );
};

export default EncyclopediaDetailContents;

const DividingLine = () => {
  return (
    <div className="my-[6rem] flex justify-center space-x-[2.5rem]">
      <div className="h-[0.5rem] w-[0.5rem] rounded-full bg-gray-3"></div>
      <div className="h-[0.5rem] w-[0.5rem] rounded-full bg-gray-3"></div>
      <div className="h-[0.5rem] w-[0.5rem] rounded-full bg-gray-3"></div>
      <div className="h-[0.5rem] w-[0.5rem] rounded-full bg-gray-3"></div>
      <div className="h-[0.5rem] w-[0.5rem] rounded-full bg-gray-3"></div>
    </div>
  );
};
