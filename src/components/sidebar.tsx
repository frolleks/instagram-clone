"use client";

import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";
import { type Session } from "next-auth";
import { SignInButton } from "./sign-in-button";
import { SignOutButton } from "./sign-out-button";
import { CreateButton } from "./create-button";

export function Sidebar({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const items = [
    {
      href: "/",
      isActive: pathname === "/",
      iconActive: "fluent:home-24-filled",
      iconInactive: "fluent:home-24-regular",
      label: "Home",
    },
    {
      href: "/search",
      isActive: pathname === "/search",
      iconActive: "fluent:search-24-filled",
      iconInactive: "fluent:search-24-regular",
      label: "Search",
    },
    {
      href: `/users/${session?.user?.id}`,
      isActive: pathname === `/users/${session?.user?.id}`,
      iconActive: "fluent:person-24-filled",
      iconInactive: "fluent:person-24-regular",
      label: "Profile",
    },
  ];

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-96 h-screen border-r p-3">
        <div className="flex-grow flex flex-col justify-start">
          <p className="mb-3 ml-3 text-xl tracking-tight font-bold">
            Instagram
          </p>
          {items.map((item) => (
            <SidebarItem
              key={item.label}
              href={item.href}
              isActive={item.isActive}
              iconActive={item.iconActive}
              iconInactive={item.iconInactive}
            >
              {item.label}
            </SidebarItem>
          ))}
          <CreateButton />
        </div>
        <div className="flex-shrink-0 mt-auto">
          {session ? <SignOutButton /> : <SignInButton />}
        </div>
      </div>

      {children}
    </div>
  );
}
