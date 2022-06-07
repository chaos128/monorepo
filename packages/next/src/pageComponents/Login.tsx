import { Button } from "@nosearch/ui";
import { useRouter } from "next/router";
import { ELoginMethod, useLogin } from "../hooks/useLogin";

const Login = () => {
  const { login, isLogin, logout } = useLogin();
  const router = useRouter();
  const { redirectUrl } = router.query;

  return (
    <div className="p-4">
      <h1>로그인</h1>
      {!isLogin && (
        <Button
          type="cta"
          onClick={() => {
            login(ELoginMethod.kakao, redirectUrl as string);
          }}
        >
          카카오 로그인
        </Button>
      )}
      {!isLogin && (
        <Button
          onClick={() => {
            login(ELoginMethod.naver, redirectUrl as string);
          }}
        >
          네이버 로그인
        </Button>
      )}
      {isLogin && (
        <button
          className="btn"
          onClick={() => {
            logout();
          }}
        >
          로그아웃
        </button>
      )}
    </div>
  );
};

export default Login;
