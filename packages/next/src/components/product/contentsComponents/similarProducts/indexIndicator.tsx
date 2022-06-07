import { Caret } from "@nosearch/ui";
import { IDocumentWithSpec } from "ns-ts-interfaces";

const IndexIndicator = ({
  modelSpecData,
  fixedIndex,
  scrollIndex,
  setScrollIndex,
}: {
  modelSpecData: IDocumentWithSpec[];
  fixedIndex: number;
  scrollIndex: number;
  setScrollIndex: (val: number) => void;
}) => {
  return (
    <div className="mx-auto my-[3rem] flex h-[1rem] w-[24rem] items-center justify-center">
      <button
        className="mr-[1rem] mb-[0.5rem]"
        disabled={scrollIndex === 0}
        onClick={() => {
          setScrollIndex(scrollIndex > 0 ? scrollIndex - 1 : 0);
        }}
      >
        <div className="rotate-180">
          <Caret size={15} />
        </div>
      </button>

      <div className="flex h-[1.5rem] space-x-[2rem]">
        {modelSpecData.map((_, index) => {
          let classNameSelect = "w-[1rem] h-[1rem] rounded-full";

          // fixed
          if (index === 0 && fixedIndex > -1) {
            classNameSelect += " bg-blue-7";
          }
          // viewing
          else if (
            (fixedIndex === -1 &&
              (index === scrollIndex || index === scrollIndex + 1)) ||
            (fixedIndex > -1 && index === scrollIndex + 1)
          ) {
            classNameSelect += " bg-blue-5";
          }
          // normal
          else {
            classNameSelect += " bg-gray-4";
          }

          return <div key={index} className={classNameSelect}></div>;
        })}
      </div>

      <button
        className="ml-[1rem] mb-[0.5rem]"
        disabled={modelSpecData.length - 2 === scrollIndex}
        onClick={() => {
          setScrollIndex(
            scrollIndex < modelSpecData.length - 2
              ? scrollIndex + 1
              : modelSpecData.length - 2
          );
        }}
      >
        <Caret size={15} />
      </button>
    </div>
  );
};

export default IndexIndicator;
