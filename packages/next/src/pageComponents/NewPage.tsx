import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "../components/Link";

const LiteYoutube = dynamic(() => import("../components/ui/liteYoutube"), {
  ssr: false,
});

const NewPage = () => {
  return (
    <div className="p-4">
      {/* <Youtube videoid="guJLfqTFfIw"></Youtube> */}
      {/* <LiteYoutube /> */}
      <div className="stats w-full shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current inline-block h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Likes</div>
          <div className="stat-value text-primary">25.6K</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current inline-block h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Page Views</div>
          <div className="stat-value text-info">2.6M</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-info">
            <div className="avatar online">
              <div className="mask mask-squircle bg-base-100 h-16 w-16 p-1">
                <Image
                  src="/vercel.svg"
                  alt="Avatar Tailwind CSS Component"
                  width={64}
                  height={64}
                  className="mask mask-squircle"
                />
              </div>
            </div>
          </div>
          <div className="stat-value">86%</div>
          <div className="stat-title">Tasks done</div>
          <div className="stat-desc text-info">31 tasks remaining</div>
        </div>
      </div>
      <Link href="/" passHref>
        홈
      </Link>
    </div>
  );
};

export default NewPage;
