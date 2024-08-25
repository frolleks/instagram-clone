import { Icon } from "./iconify-icon";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavLinkProps {
  href: string;
  isActive: boolean;
  iconActive: string;
  iconInactive: string;
  children: React.ReactNode;
}

export function SidebarItem({
  href,
  isActive,
  iconActive,
  iconInactive,
  children,
}: NavLinkProps) {
  return (
    <Link href={href}>
      <Button className="justify-start gap-3 w-full" variant="ghost" size="sm">
        <Icon icon={isActive ? iconActive : iconInactive} fontSize={22} />
        {children}
      </Button>
    </Link>
  );
}
