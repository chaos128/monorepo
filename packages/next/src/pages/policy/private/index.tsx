import dynamic from "next/dynamic";

const PrivacyPage = dynamic(() => import("../../../components/policy/privacy"));

export default PrivacyPage;
