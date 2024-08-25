import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return <main className="h-screen w-screen"></main>;
}
