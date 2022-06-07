import dynamic from "next/dynamic";
const Page = dynamic(() => import("../pageComponents/NewPage"));

export default Page;
