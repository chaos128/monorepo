export const IS_DEV = process.env.NODE_ENV === "development";
export const BASE_URL = IS_DEV
  ? "https://api-test.nosearch.com"
  : "https://api.nosearch.com";

export const PC_BREAKPOINT = 800;
