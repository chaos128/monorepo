import fetch from "node-fetch";

const BASE_URL =
  process.env.TEST_ENV === "dev"
    ? "http://dev.nosearch.com:3000"
    : "https://nosearch.com";
console.log("BASE_URL => ", BASE_URL);

const read = async (body): Promise<string[]> => {
  let error;
  const documents: string[] = [];
  body.on("error", (err) => {
    error = err;
  });

  const tagRegEx = /<[^>]*>/g;
  for await (const chunk of body) {
    const readableHTML = Buffer.from(chunk).toString();

    if (readableHTML.search(tagRegEx) > -1) {
      documents.push(readableHTML);
    }
  }

  return new Promise((resolve, reject) => {
    if (documents.length > 0) resolve(documents);
    reject("HTML tag 가 존재하지 않습니다.");
  });
};

const customFetch = async (path) => {
  try {
    const result = await fetch(`${BASE_URL + path}`);
    const documents = await read(result.body);

    return documents;
  } catch (error) {
    console.log(error);
  }
};

export default customFetch;
