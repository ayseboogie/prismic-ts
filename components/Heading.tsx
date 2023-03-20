import clsx from "clsx";

export type HeadingProps = {
  size?: string;
  children: React.ReactNode;
  className?: string;
};
export const Heading = ({
  size = "4xl",
  children,
  className,
}: HeadingProps) => {
  return (
    <h1
      className={clsx(
        "font-sans font-semibold tracking-tighter text-slate-800",
        size === "4xl" && "text-3xl md:text-4xl",
        size === "3xl" && "text-3xl",
        size === "2xl" && "text-2xl",
        size === "xl" && "text-xl",
        className
      )}
    >
      {children}
    </h1>
  );
};
