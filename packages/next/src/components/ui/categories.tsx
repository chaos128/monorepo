import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Link from "../../components/Link";
import { ICategory } from "../../hooks/api/useCategories";
import { rgbDataURL } from "../../shared/utils";

const Categories = ({ data }: { data: ICategory[] }) => {
  const categories = data;
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="mb-4">
      <div className="mb-4 flex flex-row">
        <div className="tabs relative w-full items-center justify-center">
          <div className="tab-bordered absolute h-full w-full "></div>
          {categories.map((parentCategory, i) => {
            return (
              <div
                key={i}
                className={`tab relative px-4 transition-all active:scale-95 lg:px-8 ${
                  selectedIndex === i ? " text-secondary" : ""
                }`}
                onClick={() => {
                  setSelectedIndex(i);
                }}
              >
                {selectedIndex === i && (
                  <motion.div className="border-secondary absolute h-full w-full border-b-2"></motion.div>
                )}

                {parentCategory.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className="overflow-hidden">
        <div className={``} style={{}}>
          {categories.map((parentCategory, i) => {
            return (
              <div
                key={"parentCategory_" + i}
                className={`grid w-full grid-cols-4  lg:grid-cols-12`}
                style={{
                  display: selectedIndex === i ? "grid" : "none",
                }}
              >
                {parentCategory.children
                  .filter(
                    (category) =>
                      category.isUse && category.key.indexOf("_v2") === -1
                  )
                  .map((category, j) => {
                    return (
                      <Link
                        key={j}
                        href={`/recommendation/pick/${parentCategory.key}/${category.key}`}
                        passHref
                      >
                        <a>
                          <Category data={category} />
                        </a>
                      </Link>
                    );
                  })}
              </div>
            );
          })}
          {/* <Spacing height={minHeight} /> */}
        </div>
      </div>
    </div>
  );
};

const Category = ({ data }: { data: ICategory }) => {
  return (
    <div className="group mb-4 flex cursor-pointer flex-col items-center transition-transform active:scale-95">
      <div className="h-[60px] w-[60px] overflow-hidden rounded-lg">
        <Image
          src={`https://nosearch.com/static/webp/images/${data.key}_grey_circle.webp`}
          width={60}
          height={60}
          layout={"fixed"}
          alt={data.name}
          placeholder="blur"
          blurDataURL={rgbDataURL(238, 238, 238)}
        />
      </div>
      <p className="group-hover:text-secondary mt-1 text-center text-xs">
        {data.name}
      </p>
    </div>
  );
};

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#AAA" offset="20%" />
      <stop stop-color="#AAA" offset="50%" />
      <stop stop-color="#AAA" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#AAA" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default Categories;
