import dynamic from "next/dynamic";

const TermsPage = dynamic(() => import("../../../components/policy/terms"));

export default TermsPage;
