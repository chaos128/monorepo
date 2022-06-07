import NextLink from "next/link";
import { LinkProps } from "next/link";
import { useIsAppChannel } from "../hooks/useIsAppChannel";
const Link = (props: React.PropsWithChildren<LinkProps>) => {
  const isApp = useIsAppChannel();
  if (isApp)
    return (
      <a
        {...props}
        href="javascript:void(0)"
        onClick={() => {
          if (
            (global as any).flutter_inappwebview &&
            (global as any).flutter_inappwebview.callHandler
          ) {
            (global as any).flutter_inappwebview.callHandler(
              "LoginChannel",
              props.href
            );
          }
        }}
      >
        {props.children}
      </a>
    );
  return <NextLink {...props}>{props.children}</NextLink>;
};

export type { LinkProps };

export default Link;
