import { Cart, Heading, MyPageDefault } from "@nosearch/ui";
import Image from "next/image";
import { useMemo } from "react";
import Link from "../Link";

const Header = (props: { route: string }) => {
  const { route } = props;
  const selectedMenu = useMemo(() => {
    if (route.startsWith("/recommendation")) {
      return "category";
    } else if (route.startsWith("/contents")) {
      return "guide";
    } else if (route.startsWith("/store")) {
      return "store";
    } else if (route.startsWith("/community")) {
      return "community";
    } else {
      return null;
    }
  }, [route]);

  const menuList = useMemo(() => {
    return [
      {
        key: "category",
        name: "카테고리",
        href: "/recommendation/item-list",
      },
      {
        key: "guide",
        name: "구매가이드",
        href: "/contents/guide",
      },
      {
        key: "store",
        name: "스토어",
        href: "/store",
      },
      {
        key: "community",
        name: "커뮤니티",
        href: "/community",
      },
    ];
  }, []);

  return (
    <div className="flex h-[5rem] items-center pl-[2rem] pr-[1.4rem]">
      <Link href={"/"} passHref>
        <a className="h-[2rem] w-[6.2rem]">
          <div className="inline-block h-[2rem] w-[6.2rem]  overflow-hidden">
            <Image
              priority
              src="/static/images/logo.png"
              alt="logo"
              layout="responsive"
              width={62}
              height={20}
            ></Image>
          </div>
        </a>
      </Link>
      <div className="flex-1">
        <div className="hidden items-center pc:flex">
          {menuList.map((menu) => {
            return (
              <Link href={menu.href} passHref key={menu.key}>
                <div className="flex h-[4.4rem] w-[11.3rem] cursor-pointer  items-center justify-center ">
                  <Heading
                    level={6}
                    className={
                      selectedMenu === menu.key ? "text-blue-7" : "text-gray-10"
                    }
                  >
                    {menu.name}
                  </Heading>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Link href="#" passHref>
        <a className="mr-[1.4rem]">
          <Cart size={"2.4rem"} />
        </a>
      </Link>
      <Link href="#" passHref>
        <a>
          <MyPageDefault size={"2.4rem"} />
        </a>
      </Link>
    </div>
  );
};

export default Header;
