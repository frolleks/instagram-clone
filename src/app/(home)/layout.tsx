import { auth } from "@/auth";
import { Sidebar } from "@/components/sidebar";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return <Sidebar session={session}>{children}</Sidebar>;
}
