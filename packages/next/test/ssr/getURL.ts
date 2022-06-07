import { parseFile } from "@fast-csv/parse";
import fs from "fs";
import path from "path";

interface IURLProps {
  productDetail: string[];
  guideDetail: string[];
  encyclopediaDetail: string[];
}

export default function getPopularURL(): Promise<IURLProps> {
  if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (str, newStr: any) {
      if (
        Object.prototype.toString.call(str).toLowerCase() === "[object regexp]"
      ) {
        return this.replace(str, newStr);
      }

      return this.replace(new RegExp(str, "g"), newStr);
    };
  }
  const filePath = path.resolve(__dirname, "page.csv");
  const existanceCSV = fs.existsSync(filePath);
  return new Promise((resolve, reject) => {
    const productDetailURL: string[] = [];
    const encyclopediaDetailURL: string[] = [];
    const guideDetailURL: string[] = [];
    if (existanceCSV) {
      parseFile(filePath)
        .on("data", (row: any) => {
          const url = row[0]
            .replaceAll(" ", "%20")
            .split(",")[0]
            .replace("https://nosearch.com", "");
          console.log("url -> ", url);
          if (
            url.indexOf("product") !== -1 &&
            url.indexOf("detail") !== -1 &&
            productDetailURL.length < 5
          ) {
            productDetailURL.push(url);
          }

          if (url.indexOf("contents") !== -1 && url.split("/").length > 4) {
            if (url.indexOf("encyclopedia") !== -1) {
              encyclopediaDetailURL.push(url);
            }
            if (url.indexOf("guide") !== -1) {
              guideDetailURL.push(url);
            }
          }
        })
        .on("end", () => {
          resolve({
            productDetail: productDetailURL,
            guideDetail: guideDetailURL,
            encyclopediaDetail: encyclopediaDetailURL,
          } as IURLProps);
        });
    }
  });
}
