import { useAtomValue } from "jotai/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import useFacebookInit, {
  facebookInitStateAtom,
} from "../../hooks/api/useFacebookInit";
import useKakaoInit, { kakaoInitStateAtom } from "../../hooks/api/useKakaoInit";
import useShare from "../../hooks/api/useShare";
import useShareData from "../../hooks/api/useShareData";
import { useIsAppChannel } from "../../hooks/useIsAppChannel";
import { useMobileDetect } from "../../hooks/useMobileDetect";

interface IShareProps {
  type: "guide" | "product" | "encyclopedia" | "charity" | "communityDetail";
  customUrl?: string;
}
interface IShareWrapperProps {
  type: "guide" | "product" | "encyclopedia";
  isShow?: boolean;
}

const ShareWrapper = (props: IShareWrapperProps) => {
  const { type, isShow } = props;
  return (
    <div>
      <Share type={type} />
    </div>
  );
};
export default ShareWrapper;

let resetSuccessState: any;
export const Share = (props: IShareProps) => {
  const router = useRouter();
  const { asPath } = router;
  const { isMobile } = useMobileDetect();
  const isPCDevice = !isMobile;
  const isAppChannel = useIsAppChannel();
  const url = props.customUrl
    ? props.customUrl
    : "https://nosearch.com" + asPath;

  const [isSuccessCopy, setIsSuccessCopy] = useState<boolean>(false);
  useEffect(() => {
    if (isSuccessCopy) {
      resetSuccessState = setInterval(() => {
        setIsSuccessCopy(false);
      }, 3000);
    } else {
      clearInterval(resetSuccessState);
    }

    return () => {
      clearInterval(resetSuccessState);
    };
  }, [isSuccessCopy]);

  const kakaoInit = useAtomValue(kakaoInitStateAtom);
  const facebookInit = useAtomValue(facebookInitStateAtom);
  useKakaoInit();
  useFacebookInit();

  if (!kakaoInit || !facebookInit) {
    return <div></div>;
  }

  return (
    <div>
      {!isAppChannel && <ShareByWeb {...props} />}
      {isAppChannel && <ShareByAPP {...props} />}

      <div>{url}</div>
      <CopyToClipboard
        text={url}
        onCopy={(text, result) => {
          if (result) setIsSuccessCopy(true);
        }}
      >
        <button type="button">링크 복사</button>
      </CopyToClipboard>

      {isSuccessCopy && (
        <p>
          링크 복사가 완료되었습니다.
          <br />
          공유를 원하는 곳에 붙여넣기 해주세요.
        </p>
      )}
    </div>
  );
};

const ShareByWeb = (props: IShareProps) => {
  const { type, customUrl } = props;

  const { shareToKakaoTalk, shareToFB, shareToTwitter, shareToKakaoStory } =
    useShare(customUrl);
  const { getProductKakaoShareData } = useShareData(customUrl);

  return (
    <div className="flex space-x-2">
      <div
        onClick={() => {
          if (type === "product") shareToKakaoTalk(getProductKakaoShareData());
        }}
      >
        <Image
          src="https://nosearch.com/static/images/icon_kakao_talk_min.png"
          width={50}
          height={50}
          alt="share by kakao"
        />
      </div>

      <div onClick={shareToFB}>
        <Image
          src="https://nosearch.com/static/images/icon_facebook.png"
          width={50}
          height={50}
          alt="share by facebook"
        />
      </div>

      <div onClick={shareToTwitter}>
        <Image
          src="https://nosearch.com/static/images/icon_twitter.png"
          width={50}
          height={50}
          alt="share by twitter"
        />
      </div>

      <div onClick={shareToKakaoStory}>
        <Image
          src="https://nosearch.com/static/images/icon_kakao_story.png"
          width={50}
          height={50}
          alt="share by kakaostory"
        />
      </div>
    </div>
  );
};

const ShareByAPP = (props: IShareProps) => {
  const { customUrl } = props;
  const { ogTitle } = useShareData(customUrl);

  return (
    <p
      className="og-title"
      dangerouslySetInnerHTML={{
        __html: ogTitle,
      }}
    />
  );
};
