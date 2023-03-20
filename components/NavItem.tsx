export type NavItemProps = {
  children: any;
};

export const NavItem = ({ children }: NavItemProps) => {
  return (
    <li className="font-semibold tracking-tight text-slate-800">{children}</li>
  );
};
