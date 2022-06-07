import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

function LoadOnViewPort({
  children,
  height,
  threshold = 0,
  triggerOnce = true,
}: {
  children: ReactNode;
  height: string;
  threshold?: number; // Number between 0 and 1 indicating the percentage that should be visible before triggering.
  triggerOnce?: boolean;
}) {
  const { ref, inView } = useInView({
    threshold: threshold,
    triggerOnce: triggerOnce,
  });

  return (
    <div ref={ref} style={{ height: inView ? "auto" : height }}>
      {inView && children}
    </div>
  );
}

export default LoadOnViewPort;
