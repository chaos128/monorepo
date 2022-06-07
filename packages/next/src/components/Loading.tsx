import { useMobileDetect } from "../hooks/useMobileDetect";

function Loading() {
  const { isMobile } = useMobileDetect();

  return (
    <div className="relative max-h-[250px] overflow-hidden">
      <div
        className="bg-gray-200 flex items-center justify-center"
        style={{
          width: "100%",
          position: "relative",
          aspectRatio: isMobile ? "375/250" : "1200/250",
        }}
      >
        <svg
          className="mr-3 -ml-1 h-5 w-5 animate-spin text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default Loading;
