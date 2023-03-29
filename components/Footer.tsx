import OptIn from "@/components/Contact/OptIn";

export type FooterProps = {};
export const Footer = ({}: FooterProps) => {
  return (
    <div id="footer" className="absolute bottom-0 mt-2.5 left-2/4	">
      <OptIn />
    </div>
  );
};
