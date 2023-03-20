import clsx from "clsx";
import React from "react";

export type BoundedProps = {
  size?: string;
  className?: string;
  children: React.ReactNode;
};
export const Bounded = ({
  size = "base",
  className,
  children,
}: BoundedProps) => {
  return (
    <div className={clsx("px-4 py-8 md:py-10 md:px-6 lg:py-12", className)}>
      <div
        className={clsx(
          "mx-auto w-full",
          size === "small" && "max-w-xl",
          size === "base" && "max-w-3xl",
          size === "wide" && "max-w-4xl",
          size === "widest" && "max-w-6xl"
        )}
      >
        {children}
      </div>
    </div>
  );
};
