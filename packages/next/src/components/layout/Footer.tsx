import { Text } from "@nosearch/ui";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, memo, useEffect, useState } from "react";
import Link from "../../components/Link";
import AppInstall from "../appInstall/AppInstall";
import Spacing from "../ui/spacing";

const Footer = () => {
  const pathnameListHideFooter = ["/store", "/recommendation/self"];

  const [visibleBusinessInformation, setVisibleBusinessInformation] =
    useState<boolean>(false);
  const { pathname } = useRouter();

  useEffect(() => {
    if (visibleBusinessInformation) {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight + 500,
          behavior: "smooth",
        });
      }, 250);
    }
  }, [visibleBusinessInformation]);

  if (
    pathnameListHideFooter.some(
      (eachHidePathname) => pathname.indexOf(eachHidePathname) >= 0
    )
  ) {
    return null;
  }

  const infoList = [
    {
      href: "/policy/terms",
      text: "서비스 이용약관",
    },
    {
      href: "/policy/private",
      text: "개인정보 처리방침",
    },
    {
      text: "입점문의",
      handleClick: () =>
        setVisibleBusinessInformation((prevState) => !prevState),
    },
  ];

  return (
    <div className="z-[1] flex flex-col items-center justify-between pc:h-[61.2rem] pc:gap-[5rem]">
      <Spacing width="100%" height="1rem" bg="#F9F9F9" />
      <FooterButtons />
      <div className="hidden w-full pc:flex">
        <AppInstall />
      </div>

      <div className="flex h-[8.0rem] w-full items-center justify-evenly bg-gray-1 pc:hidden">
        {infoList.map(({ href, text, handleClick }, index: number) => {
          if (href) {
            return (
              <Fragment key={text}>
                {index !== 0 && (
                  <div className="h-[1.5rem] w-[1px] bg-gray-7"></div>
                )}
                <Link href={href} passHref>
                  <div>
                    <Text type="B9" className="cursor-pointer text-gray-7">
                      {text}
                    </Text>
                  </div>
                </Link>
              </Fragment>
            );
          } else {
            return (
              <Fragment key={text}>
                {index !== 0 && (
                  <div
                    key={`${text}-divider`}
                    className="h-[1.5rem] w-[1px] bg-gray-7"
                  ></div>
                )}
                <div key={text} onClick={handleClick}>
                  <Text
                    type="B9"
                    className={`cursor-pointer ${
                      visibleBusinessInformation && "!font-bold"
                    } text-gray-7`}
                  >
                    {text}
                  </Text>
                </div>
              </Fragment>
            );
          }
        })}
      </div>

      {/* For Mobile View */}
      <div
        className={`flex w-full overflow-hidden bg-gray-1 px-[2rem] transition-all duration-300 pc:hidden ${
          visibleBusinessInformation ? "h-[19rem]" : "h-0"
        }`}
      >
        <BusinessInformation />
      </div>

      {/* For PC View */}
      <div className="hidden h-[23.6rem] w-full items-center justify-center bg-gray-1 pc:flex ">
        <BusinessInformation />
      </div>

      <div className="h-[5.8rem] pc:hidden"></div>
    </div>
  );
};

export default memo(Footer);

// eslint-disable-next-line react/display-name
const FooterButtons = memo(() => {
  const imageList = [
    {
      href: "/feedback",
      text: "의견보내기",
      src: "/static/images/nosearch_mail.png",
    },
    {
      href: "/intro",
      text: "노써치 소개",
      src: "/static/images/nosearch_intro.png",
    },
    {
      href: "/" /* TODO : 입점문의 link 필요 */,
      text: "입점문의",
      src: "/static/images/nosearch_phone.png",
    },
  ];

  return (
    <div className="flex w-full items-center justify-evenly px-[2.0rem] pc:w-[56rem] mobile:h-[16.6rem]">
      {imageList.map(({ href, text, src }) => {
        return (
          <Link key={href} href={href} passHref>
            <div className="cursor-pointer text-center">
              <div className="mb-[0.8rem] flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-[20px] bg-blue-2">
                <div className="block h-[3.9rem] w-[3.9rem] items-center">
                  <Image
                    layout="responsive"
                    src={src}
                    width={0}
                    height={0}
                    alt={text}
                  />
                </div>
              </div>
              <Text type="B4" className="text-black">
                {text}
              </Text>
            </div>
          </Link>
        );
      })}
    </div>
  );
});

const BusinessInformation = () => {
  const infoList = [
    { title: "상호명", value: "(주)노써치" },
    { title: "대표자", value: "서영준" },
    { title: "개인정보보호책임자", value: "이한솔" },
    { title: "사업자등록번호", value: "740-81-01936" },
    {
      title: "주소",
      value: "서울특별시 금천구 가산디지털2로 98, 2동 1212호 (IT캐슬)",
    },
    { title: "의견·문의", value: "nosearch@nosearch.com" },
  ];

  return (
    <div className="pc:w-[48.7rem] mobile:h-[19rem]">
      {infoList.map(({ title, value }) => {
        return (
          <div key={title} className="mb-[0.6rem] flex gap-3">
            <Text type="B8" className="flex-[0_0_12.4rem] text-gray-9">
              {title}
            </Text>
            <Text type="B10" className="flex-[2_1_0] text-gray-9">
              {value}
            </Text>
          </div>
        );
      })}
      <div className="hidden items-center justify-between pc:flex pc:w-[21.3rem]">
        <Link href="/policy/terms" passHref>
          <div>
            <Text type="B8" className="cursor-pointer text-gray-9">
              서비스 이용약관
            </Text>
          </div>
        </Link>
        <div className="h-[1.5rem] w-[1px] bg-gray-7"></div>
        <Link href="/policy/private" passHref>
          <div>
            <Text type="B8" className="cursor-pointer  text-gray-9">
              개인정보 처리방침
            </Text>
          </div>
        </Link>
      </div>
    </div>
  );
};
