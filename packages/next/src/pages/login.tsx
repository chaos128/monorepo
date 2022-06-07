import dynamic from "next/dynamic";

const Login = dynamic(() => import("../pageComponents/Login"));

export default Login;
