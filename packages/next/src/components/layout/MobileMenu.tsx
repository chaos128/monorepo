import {
  CategoryDefault,
  CategoryPressed,
  CommunityDefault,
  CommunityPressed,
  HomeDefault,
  HomePressed,
  SaleDefault,
  SalePressed,
  StoreDefault,
  StorePressed,
  Text,
} from "@nosearch/ui";
import { memo, useMemo } from "react";
import Link from "../Link";

const size = "2.7rem";
const menuClassName =
  "flex flex-col items-center cursor-pointer active:scale-95 transition-transform select-none   min-w-[4.3em]";

const MobileMenu = ({ route }: { route: string }) => {
  const selectedMenu = useMemo(() => {
    if (route.startsWith("/recommendation")) {
      return "category";
    } else if (route.startsWith("/store/nosearchDeal")) {
      return "nosearchDeal";
    } else if (route.startsWith("/contents")) {
      return "guide";
    } else if (route.startsWith("/store")) {
      return "store";
    } else if (route.startsWith("/community")) {
      return "community";
    } else if (route === "/") {
      return "home";
    } else {
      return null;
    }
  }, [route]);

  const menuList = useMemo(() => {
    return [
      {
        key: "home",
        name: "홈",
        icon: {
          pressed: <HomePressed size={size} />,
          default: <HomeDefault size={size} />,
        },
        href: "/",
      },
      {
        key: "category",
        name: "카테고리",
        icon: {
          pressed: <CategoryPressed size={size} />,
          default: <CategoryDefault size={size} />,
        },
        href: "/recommendation/item-list",
      },
      {
        key: "nosearchDeal",
        name: "공동구매",
        icon: {
          pressed: <SalePressed size={size} />,
          default: <SaleDefault size={size} />,
        },
        href: "/store/nosearchDeal",
      },
      {
        key: "store",
        name: "스토어",
        icon: {
          pressed: <StorePressed size={size} />,
          default: <StoreDefault size={size} />,
        },
        href: "/store",
      },
      {
        key: "community",
        name: "커뮤니티",
        icon: {
          pressed: <CommunityPressed size={size} />,
          default: <CommunityDefault size={size} />,
        },
        href: "/community",
      },
    ];
  }, []);

  return (
    <div className="fixed bottom-0 flex h-[5.8rem] w-full max-w-[1200px] content-around items-center justify-around border-t border-gray-3 bg-white pc:hidden">
      {menuList.map(({ href, key, name, icon }) => {
        const isSelectedMenu = selectedMenu === key;

        return (
          <Link href={href} passHref key={key}>
            <a>
              <div className={menuClassName}>
                {isSelectedMenu ? icon.pressed : icon.default}

                <Text
                  type={isSelectedMenu ? "D2" : "D3"}
                  className={`mt-[0.1rem] ${
                    isSelectedMenu ? "text-primary" : ""
                  } select-none`}
                >
                  {name}
                </Text>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default memo(MobileMenu);
